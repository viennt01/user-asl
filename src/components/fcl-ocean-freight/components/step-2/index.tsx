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
import Description from './description';
import EditDescription from './editDescription';

const dateFormat = 'YYYY/MM/DD';

interface Props {
  displayStep: number;
  setDisplayStep: React.Dispatch<React.SetStateAction<number>>;
}

export default function Step2({ displayStep, setDisplayStep }: Props) {
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
      className={style.step2}
      style={{
        display: displayStep === 2.1 || displayStep === 2.2 ? '' : 'none',
      }}
    >
      <Information />
      <div
        style={{
          display: displayStep === 2.1 ? '' : 'none',
        }}
      >
        <Description setDisplayStep={setDisplayStep} />
      </div>
      <div
        style={{
          display: displayStep === 2.2 ? '' : 'none',
        }}
      >
        <EditDescription setDisplayStep={setDisplayStep} />
      </div>
    </div>
  );
}
