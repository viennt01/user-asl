import React from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import Trucking from './components/trucking';
import COLORS from '@/constants/color';
import Customs from './components/customs';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Service({ setDisplayStep }: Props) {
  return (
    <div className={style.service}>
      <Row gutter={16}>
        <Col span={24}>
          <Card style={{background: '#E7EEFF', marginBottom:'16px'}}>
            <Row gutter={16}>
              <Col span={24}>
                <div className={style.header}>Recommend Service</div>
              </Col>
              <Col span={24}>
                <Trucking />
              </Col>
              <Col span={24}>
                <Customs />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Button
              style={{
                marginRight: '8px',
                color: COLORS.GREY_COLOR_HOVER,
                width: '120px',
                height: '40px',
              }}
              onClick={() => setDisplayStep(2.2)}
            >
              Pervious
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(4)}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
