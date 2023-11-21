import React from 'react';
import style from './index.module.scss';
import { Button, Col, Flex, Row } from 'antd';
import COLORS from '@/constants/color';
import LocalChargesEdit from './components/edit/localChargesEdit';
import TableContainerEdit from './components/edit/tableContainerEdit';
import CardTotal from './components/edit/cardTotal';

interface Props {
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function EditDescription({ setDisplayStep }: Props) {
  return (
    <div className={style.description}>
      <Row gutter={16}>
        <Col span={24} lg={16}>
          <Row>
            <Col span={24}>
              <TableContainerEdit />
            </Col>
            <Col span={24}>
              <LocalChargesEdit />
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
                color: COLORS.GREY_COLOR_HOVER,
                width: '120px',
                height: '40px',
              }}
              onClick={() => setDisplayStep(2.2)}
            >
              Previous
            </Button>
            <Button
              style={{ width: '120px', height: '40px' }}
              type="primary"
              onClick={() => setDisplayStep(3)}
            >
              Next
            </Button>
          </Flex>
        </Col>
      </Row>
    </div>
  );
}
