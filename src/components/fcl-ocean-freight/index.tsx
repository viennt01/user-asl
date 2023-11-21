import React, { useState } from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Form, Row, Select, Image, DatePicker } from 'antd';
import ROUTERS from '@/constants/router';
import { useRouter } from 'next/router';
import Service from '../home-page/components/service';
import HeaderFclOceanFreight from './components/header';
import InputFclOceanFreight from './components/inputSearch';
import TableReturn, { DataType } from './components/tableReturn';
const dateFormat = 'YYYY/MM/DD';

export default function FclOceanFreight() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [dataTableResearch, setDataTableResearch] = useState<DataType[]>([])

  const onFinish = (formValues: any) => {
    setDataTableResearch([
      {
        key: '1',
        liner: 'John Brown',
        pol: 'Ho Chi Minh, Viet Nam',
        pod: 'Los Angeles, California',
        container: { '20 DC': '12', '20 OT': '12' },
        commodity: { '20 DC': '12', '20 OT': '12' },
      },
      {
        key: '2',
        liner: 'John Brown',
        pol: 'Ho Chi Minh, Viet Nam',
        pod: 'Los Angeles, California',
        container: { '20 DC': '12', '20 OT': '12' },
        commodity: { '20 DC': '12', '20 OT': '12' },
      },
      {
        key: '3',
        liner: 'John Brown',
        pol: 'Ho Chi Minh, Viet Nam',
        pod: 'Los Angeles, California',
        container: { '20 DC': '12', '20 OT': '12' },
        commodity: { '20 DC': '12', '20 OT': '12' },
      },
    ])
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className={style.wrapper}>
      <div className={style.oceanFreight} />
      <Flex className={style.checkPrice} vertical>
        <div className={style.content}>
          <HeaderFclOceanFreight />
          <InputFclOceanFreight form={form} onFinish={onFinish} onReset={onReset} />
        </div>
        <TableReturn data={dataTableResearch}/>
      </Flex>
      <Service />
    </div>
  );
}
