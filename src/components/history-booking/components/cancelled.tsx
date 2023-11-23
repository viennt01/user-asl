import { Button, Col, Input, List, Row, Space, Image } from 'antd';
import style from '../index.module.scss';
import Box from './box';

const data = [
  {
    key: 5,
    pol: 'Ho Chi Minh, Vietnam',
    etd: 1698512400000,
    eta: 1700586000000,
    pod: 'LOS ANGELES, CA  USA',
    finalDestination: 'LOS ANGELES, CA  USA',
    placeOfDelivery: 'LOS ANGELES, CA  USA',
    status: 'CANCELLED',
  },
];

export default function Cancelled() {
  return (
    <div className={style.all}>
      <div className={style.search}>
        <Row>
          <Col span={24} md={12}>
            <Space.Compact style={{ width: '100%' }}>
              <Input size="large" placeholder="Please enter name to search" />
              <Button size="large" type="primary">
                Submit
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      </div>
      <div className={style.result}>
        <List
          dataSource={data}
          renderItem={(item: any) => <Box data={item} />}
        />
      </div>
    </div>
  );
}
