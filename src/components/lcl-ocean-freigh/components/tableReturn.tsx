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
} from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { IPaginationOfAntd, IQuotationTable } from '../interface';
import { IDataBookingProps } from '..';
import { formatCurrencyHasCurrency } from '@/utils/format-number';

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
}

export default function TableReturn({
  displayStep,
  setDisplayStep,
  data,
  setDataPropsBooking,
  pagination,
  handlePaginationChange,
}: Props) {
  const containerReturn = useMemo(() => {
    const result = [];
    if (data) {
      for (const key in data[0]?.seaQuotationDetailDTOs) {
        if (data[0].seaQuotationDetailDTOs.hasOwnProperty(key)) {
          const obj = {
            title: <div className={style.title}>{key}</div>,
            // width: 200,
            dataIndex: 'seaQuotationDetailDTOs',
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
      title: <div className={style.title}>POL</div>,
      dataIndex: 'polName',
      key: 'polName',
    },
    {
      title: <div className={style.title}>POD</div>,
      dataIndex: 'podName',
      key: 'podName',
    },
    {
      title: <div className={style.title}>Action</div>,
      key: 'action',
      align: 'center',
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button
            style={{ width: '120px' }}
            onClick={() => (
              setDisplayStep(2.1),
              setDataPropsBooking((pre) => ({
                ...pre,
                idQuotation: record.key,
                dataColTableStep1: record,
              }))
            )}
          >
            View Details
          </Button>
          <Button
            type="primary"
            style={{ width: '120px' }}
            onClick={() => (
              setDisplayStep(2.2),
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
      style={{ display: data?.length !== 0 && displayStep === 1 ? '' : 'none' }}
    >
      <Row>
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
    </div>
  );
}
