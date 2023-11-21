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

export interface DataType {
  key: string;
  liner: string;
  pol: string;
  pod: string;
  container: { [key: string]: string };
  commodity: { [key: string]: string };
}

export interface ITypeDTOs {
  [key: string]: string;
}

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
  data: DataType[];
}

export default function TableReturn({
  displayStep,
  setDisplayStep,
  data,
}: Props) {
  const containerReturn = useMemo(() => {
    const result = [{}];
    if (data) {
      for (const key in data[0]?.container) {
        if (data[0].container.hasOwnProperty(key)) {
          const obj = {
            title: <div className={style.title}>{key}</div>,
            // width: 200,
            dataIndex: 'container',
            render: (value: ITypeDTOs) => {
              return (
                <Tag
                  color="#F2F48E"
                  style={{ color: '#000', fontWeight: '450' }}
                >{`${value[key]}`}</Tag>
              );
            },
          };
          result.push(obj);
        }
      }
    }
    return result;
  }, [data]);

  const commodityReturn = useMemo(() => {
    const result = [{}];
    if (data) {
      for (const key in data[0]?.commodity) {
        if (data[0].commodity.hasOwnProperty(key)) {
          const obj = {
            title: <div className={style.title}>{key}</div>,
            // width: 200,
            dataIndex: 'commodity',
            render: (value: ITypeDTOs) => {
              return (
                <Tag
                  color="#F2F48E"
                  style={{ color: '#000', fontWeight: '450' }}
                >{`${value[key]}`}</Tag>
              );
            },
          };
          result.push(obj);
        }
      }
    }
    return result;
  }, [data]);

  const columns: ColumnsType<DataType> = [
    {
      title: <div className={style.title}>Liner</div>,
      dataIndex: 'liner',
      key: 'liner',
    },
    ...containerReturn,
    ...commodityReturn,
    {
      title: <div className={style.title}>POL</div>,
      dataIndex: 'pol',
      key: 'pol',
    },
    {
      title: <div className={style.title}>POD</div>,
      dataIndex: 'pod',
      key: 'pod',
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
            onClick={() => setDisplayStep(2.1)}
          >
            View Details
          </Button>
          <Button
            type="primary"
            style={{ width: '120px' }}
            onClick={() => setDisplayStep(2.2)}
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
                pagination={false}
              />
            </Card>
          </ConfigProvider>
        </Col>
      </Row>
    </div>
  );
}
