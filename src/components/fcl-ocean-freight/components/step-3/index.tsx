import React, { useState } from 'react';
import style from './index.module.scss';
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Row,
  Select,
  Image,
  DatePicker,
} from 'antd';
import { useRouter } from 'next/router';
import Information from './information';
import Service from './description';

const dateFormat = 'YYYY/MM/DD';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step3({ displayStep, setDisplayStep }: Props) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (formValues: any) => {
    console.log(formValues);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div
      className={style.step3}
      style={{
        display: displayStep === 3 ? '' : 'none',
      }}
    >
      <Information />
      <div>
        <Service setDisplayStep={setDisplayStep} />
      </div>
    </div>
  );
}
