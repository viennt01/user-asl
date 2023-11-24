import React, { useState } from 'react';
import style from './index.module.scss';
import { Flex, Form } from 'antd';
import { useRouter } from 'next/router';
import HeaderFclOceanFreight from './components/header';
import InputFclOceanFreight from './components/inputSearch';
import TableReturn, { DataType } from './components/tableReturn';
import Step2 from './components/step-2';
import Step3 from './components/step-3';
import Step4 from './components/step-4';
import Step5 from './components/step-5';
import Service from '../home-page/components/service';

export default function FclOceanFreight() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [dataTableResearch, setDataTableResearch] = useState<DataType[]>([]);
  const [displayStep, setDisplayStep] = useState<number>(1);

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
    ]);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Ocean Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Find the right route for your goods with guaranteed container
                  allocation by ocean freight.
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex  className={style.checkPrice} vertical>
        <div className={style.content}>
          <HeaderFclOceanFreight displayStep={displayStep} />
          <InputFclOceanFreight
            displayStep={displayStep}
            form={form}
            onFinish={onFinish}
            onReset={onReset}
          />
          <TableReturn
            displayStep={displayStep}
            setDisplayStep={setDisplayStep}
            data={dataTableResearch}
          />
          <Step2 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step3 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step4 displayStep={displayStep} setDisplayStep={setDisplayStep} />
          <Step5 displayStep={displayStep} setDisplayStep={setDisplayStep} />
        </div>
      </Flex>
      <Service />
    </div>
  );
}
