import React from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Row } from 'antd';
import TableContainerView from './components/tableContainerView';
import LocalChargesView from './components/localChargesView';
import CardTotal from './components/cardTotal';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Description({ setDisplayStep }: Props) {
  return (
    <div className={style.description}>
      <Row gutter={16}>
        <Col span={24} lg={16}>
          <Row>
            <Col span={24}>
              <TableContainerView />
            </Col>
            <Col span={24}>
              <LocalChargesView />
            </Col>
          </Row>
        </Col>
        <Col span={24} lg={8}>
          <CardTotal />
        </Col>
        <Col span={24}>
          <Flex justify="space-between">
            <Button
              style={{
                marginRight: '8px',
                color: 'red',
                width: '120px',
                height: '40px',
              }}
              onClick={() => setDisplayStep(1)}
            >
              Close
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(2.2)}
            >
              Booking
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
