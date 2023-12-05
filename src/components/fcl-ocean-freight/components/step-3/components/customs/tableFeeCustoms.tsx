import React, { useEffect, useRef, useState } from 'react';
import { Flex, Table, InputRef, Input, Space, Button } from 'antd';
import { IDataBookingProps } from '@/components/fcl-ocean-freight';
import { useQuery } from '@tanstack/react-query';
import { API_FEE_GROUP } from '@/fetcherAxios/endpoint';
import { getFeeWithFeeGroup } from '@/components/fcl-ocean-freight/fetcher';
import {
  FeeTable,
} from '@/components/fcl-ocean-freight/interface';
import {
  ColumnType,
  ColumnsType,
  FilterConfirmProps,
} from 'antd/lib/table/interface';
import { formatNumber } from '@/utils/format-number';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { ISubmitFeeCustoms } from './feeOfCustoms';

interface Props {
  idFeeGroup: string;
  setSubmitFeeCustoms: React.Dispatch<
    React.SetStateAction<ISubmitFeeCustoms[]>
  >;
}

type DataIndex = keyof FeeTable;

export default function TableFeeOfCustoms({
  idFeeGroup,
  setSubmitFeeCustoms,
}: Props) {
  const [dataFeeTable, setDataFeeTable] = useState<FeeTable[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    setSubmitFeeCustoms((pre) => {
      const filteredData = pre.filter(function (item) {
        return item.feeGroupID !== idFeeGroup;
      });
      return [...filteredData, { feeGroupID: idFeeGroup, listFee: selectedRowKeys }];
    });
  }, [selectedRowKeys]);
  useQuery({
    queryKey: [API_FEE_GROUP.GET_ALL_FEE_WITH_FEE_GROUP, idFeeGroup],
    queryFn: () => getFeeWithFeeGroup({ id: [idFeeGroup] }),
    enabled: idFeeGroup !== undefined,
    onSuccess(data) {
      setDataFeeTable([]);
      if (data.status) {
        if (data.data) {
          const newData = data.data.map((item) => ({
            key: item.feeGroupDetailID,
            feeGroupDetailID: item.feeGroupDetailID,
            currencyName: item.currencyName,
            unitInternationalCode: item.unitInternationalCode,
            feeNo: item.feeNo,
            feeName: item.feeName,
            typeFeeName: item.typeFeeName,
            feeID: item.feeID,
            priceFeeGroup: item.priceFeeGroup,
            vatFeeGroup: item.vatFeeGroup,
            unitID: item.unitID,
            currencyID: item.currencyID,
          }));
          setDataFeeTable(newData);
        }
      }
    },
  });
  const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

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

  const columnsFee: ColumnsType<FeeTable> = [
    {
      title: (
        <Flex align="center" justify="center">
          Name
        </Flex>
      ),
      dataIndex: 'feeName',
      key: 'feeName',
      fixed: 'left',
      ...getColumnSearchProps('feeName'),
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
          VAT
        </Flex>
      ),
      dataIndex: 'vatFeeGroup',
      key: 'vatFeeGroup',
      fixed: 'right',
      align: 'right',
      ...getColumnSearchProps('vatFeeGroup'),
      render: (value) => {
        return value ? formatNumber(value) : '-';
      },
    },
    {
      title: (
        <Flex align="center" justify="center">
          Type fee
        </Flex>
      ),
      dataIndex: 'typeFeeName',
      key: 'typeFeeName',
      fixed: 'left',
      ...getColumnSearchProps('typeFeeName'),
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
          Unit
        </Flex>
      ),
      dataIndex: 'unitInternationalCode',
      key: 'unitInternationalCode',
      fixed: 'left',
      ...getColumnSearchProps('unitInternationalCode'),
    },
  ];

  return (
    <Table
      columns={columnsFee}
      dataSource={dataFeeTable}
      bordered
      rowSelection={{
        type: 'checkbox',
        selectedRowKeys: selectedRowKeys,
        onChange: handleSelectionChange,
      }}
      pagination={false}
    />
  );
}
