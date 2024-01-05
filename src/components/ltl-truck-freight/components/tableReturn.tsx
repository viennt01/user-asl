import React, { useMemo } from 'react';
import style from '../index.module.scss';
import {
  Col,
  Row,
  Button,
  Card,
  Table,
  Space,
  ConfigProvider,
  Tag,
  Flex,
  Result,
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { IQuotationTable } from '../interface';
import { IDataBookingProps } from '..';
import { formatCurrencyHasCurrency } from '@/utils/format-number';
import { useRouter } from 'next/router';
import { IPaginationOfAntd } from '@/components/fcl-ocean-freight/interface';

export interface ITypeDTOs {
  [key: string]: string;
}

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  data: IQuotationTable[];
  setDataPropsBooking: React.Dispatch<React.SetStateAction<IDataBookingProps>>;
  pagination: IPaginationOfAntd;
  handlePaginationChange: (page: number, pageSize: number) => void;
  showError: boolean;
}

export default function TableReturn({
  displayStep,
  setDisplayStep,
  data,
  setDataPropsBooking,
  pagination,
  handlePaginationChange,
  showError,
}: Props) {
  const router = useRouter();
  const containerReturn = useMemo(() => {
    const result = [];
    if (data) {
      for (const key in data[0]?.truckingQuotationDetailDTOs) {
        if (data[0].truckingQuotationDetailDTOs.hasOwnProperty(key)) {
          const obj = {
            title: <div className={style.title}>{key}</div>,
            // width: 200,
            // align: 'right',
            dataIndex: 'truckingQuotationDetailDTOs',
            render: (value: ITypeDTOs) => {
              return (
                <Tag
                  color="#F2F48E"
                  style={{ color: '#000', fontWeight: '450' }}
                >
                  {formatCurrencyHasCurrency(value[key])}
                </Tag>
              );
            },
          };
          result.push(obj);
        }
      }
    }
    return result;
  }, [data]);

  const columns: ColumnsType<IQuotationTable> = [
    {
      title: <div className={style.title}>NO.</div>,
      dataIndex: 'index',
      width: 50,
      align: 'right',
      fixed: 'left',
      render: (_, record, index) => {
        const { pageSize = 0, current = 0 } = pagination ?? {};
        return index + pageSize * (current - 1) + 1;
      },
    },
    ...containerReturn,
    {
      title: <div className={style.title}>Commodity</div>,
      dataIndex: 'commodityName',
      key: 'commodityName',
    },
    {
      title: <div className={style.title}>Place of pick up</div>,
      dataIndex: 'pickupName',
      key: 'pickupName',
    },
    {
      title: <div className={style.title}>Place of delivery</div>,
      dataIndex: 'deliveryName',
      key: 'deliveryName',
    },
    {
      title: <div className={style.title}>Action</div>,
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ width: '120px' }}
            onClick={() => (
              setDisplayStep(2.2),
              router.push('/ltl-truck-freight/#headerStep'),
              setDataPropsBooking((pre) => ({
                ...pre,
                idQuotation: record.key,
                dataColTableStep1: record,
              }))
            )}
          >
            Booking
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      className={style.tableReturn}
      style={{ display: displayStep === 1 ? '' : 'none' }}
    >
      <Row
        style={{
          display: data?.length === 0 ? 'none' : '',
        }}
      >
        <Col span={24}>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: 'rgb(202, 215, 238)',
                  headerColor: 'rgb(29, 68, 134)',
                },
              },
            }}
          >
            <Card>
              <Table
                className={style.table}
                scroll={{
                  x: 'max-content',
                }}
                columns={columns}
                dataSource={data}
                pagination={{
                  position: ['bottomCenter'],
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} of ${total} items`,
                  showSizeChanger: true,
                  ...pagination,
                  onChange: handlePaginationChange,
                }}
              />
            </Card>
          </ConfigProvider>
        </Col>
      </Row>
      <Flex
        style={{
          padding: '0 8px',
          backgroundColor: '#FFF',
          borderRadius: '12px',
        }}
      >
        <div
          style={{
            width: '100%',
            display: showError ? '' : 'none',
          }}
        >
          <Result title="Please contact ASL's staff to receive a quotation" />
        </div>
      </Flex>
    </div>
  );
}
