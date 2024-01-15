import {
  Button,
  Col,
  Input,
  List,
  Row,
  Space,
  Image,
  Form,
  PaginationProps,
} from 'antd';
import style from '../index.module.scss';
import Box from './box';
import { useState } from 'react';
import {
  IDetailBooking,
  IFormSearch,
  TYPE_STATUS,
  TYPE_TABS,
} from '../interface';
import { useQuery } from '@tanstack/react-query';
import { getHistoryBooking } from '../fetcher';
import {
  DEFAULT_PAGINATION,
  IPaginationOfAntd,
} from '@/components/fcl-ocean-freight/interface';

const initalValue = {
  searchAll: '',
};

export default function Completed() {
  const [form] = Form.useForm();
  const [dataHistory, setDataHistory] = useState<IDetailBooking[]>([]);
  const [dataSearchALl, setDataSearchALl] = useState<string>('');
  const [pagination, setPagination] =
    useState<IPaginationOfAntd>(DEFAULT_PAGINATION);
  const historyQuerySearch = useQuery({
    queryKey: [TYPE_TABS.ALL, dataSearchALl],
    queryFn: () =>
      getHistoryBooking({
        searchAll: dataSearchALl,
        paginateRequest: {
          currentPage: pagination.current,
          pageSize: pagination.pageSize,
        },
        statusBooking: [TYPE_STATUS.COMPLETED],
      }),
    onSuccess(data) {
      if (data.status) {
        if (data.data) {
          const { currentPage, pageSize, totalPages } = data.data;
          setDataHistory(data.data.data || []);
          setPagination({
            current: currentPage,
            pageSize: pageSize,
            total: totalPages,
          });
        }
      }
    },
  });
  const onFinish = (value: IFormSearch) => {
    setDataSearchALl(value.searchAll);
  };
  const handlePaginationChange: PaginationProps['onChange'] = (page, size) => {
    pagination.current = page;
    pagination.pageSize = size;
    historyQuerySearch.refetch();
  };

  return (
    <div className={style.all}>
      <div className={style.search}>
        <Form form={form} onFinish={onFinish} initialValues={initalValue}>
          <Row>
            <Col span={24}>
              <Space.Compact style={{ width: '100%' }}>
                <Form.Item name="searchAll">
                  <Input
                    size="large"
                    placeholder="Please enter name to search"
                  />
                </Form.Item>
                <Button size="large" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space.Compact>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={style.result}>
        <List
          dataSource={dataHistory}
          renderItem={(item: any) => <Box data={item} />}
          pagination={{
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            showSizeChanger: true,
            ...pagination,
            onChange: handlePaginationChange,
          }}
        />
      </div>
    </div>
  );
}
