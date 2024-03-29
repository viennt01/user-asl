import React, { useRef, useState } from 'react';
import { FeeTable } from '@/components/fcl-ocean-freight/interface';
import { useQuery } from '@tanstack/react-query';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { getFeeWithFeeGroup } from '@/components/fcl-ocean-freight/fetcher';
import { Button, Flex, Input, InputRef, Space, Table } from 'antd';
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { formatNumber } from '@/utils/format-number';

interface Props {
  listFeeGroupID: string[];
}

type DataIndex = keyof FeeTable;

export default function DetailTruckingOtherCharge({ listFeeGroupID }: Props) {
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useQuery({
    queryKey: [listFeeGroupID],
    queryFn: () =>
      getFeeWithFeeGroup({
        id: listFeeGroupID,
      }),
    enabled: listFeeGroupID !== undefined,
    onSuccess(data) {
      setDataFeeTable([]);
      if (data.status) {
        if (data.data) {
          setDataFeeTable(data.data);
        }
      }
    },
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<FeeTable> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex ?? ''] || '')
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<FeeTable> = [
    {
      title: (
        <Flex align="center" justify="center">
          Other Charges
        </Flex>
      ),
      dataIndex: 'feeName',
      key: 'feeName',
      fixed: 'left',
      // width: 200,
      ...getColumnSearchProps('feeName'),
    },
    {
      title: (
        <Flex align="center" justify="center">
          Unit
        </Flex>
      ),
      dataIndex: 'unitInternationalCode',
      key: 'unitInternationalCode',
      fixed: 'left',
      ...getColumnSearchProps('unitInternationalCode'),
    },
    {
      title: (
        <Flex align="center" justify="center">
          Price
        </Flex>
      ),
      dataIndex: 'priceFeeGroup',
      key: 'priceFeeGroup',
      fixed: 'right',
      align: 'right',
      ...getColumnSearchProps('priceFeeGroup'),
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          Currency
        </Flex>
      ),
      dataIndex: 'currencyName',
      key: 'currencyName',
      fixed: 'left',
      ...getColumnSearchProps('currencyName'),
    },
    {
      title: (
        <Flex align="center" justify="center">
          VAT
        </Flex>
      ),
      dataIndex: 'vatFeeGroup',
      key: 'vatFeeGroup',
      fixed: 'right',
      align: 'right',
      width: 100,
      ...getColumnSearchProps('vatFeeGroup'),
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
  ];

  return (
    <Table
      scroll={{
        x: 'max-content',
      }}
      columns={columns}
      dataSource={dataFeeTable}
      bordered
      style={{ marginBottom: '24px' }}
      pagination={{ pageSize: 5 }}
    />
  );
}
