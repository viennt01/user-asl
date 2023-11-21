import React, { useState } from 'react';
import style from '../index.module.scss';
import {
  Button,
  Col,
  Collapse,
  ConfigProvider,
  Flex,
  Form,
  Row,
  Typography,
  Image,
  Select,
  DatePicker,
  InputNumber,
  Input,
  Tag,
} from 'antd';
import COLORS from '@/constants/color';
const { Panel } = Collapse;
const { Title } = Typography;
const dateFormat = 'YYYY/MM/DD';

export default function Customs() {
  const [form] = Form.useForm();
  const onFinish = (formValues: any) => {
    console.log(formValues);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Collapse: {
            headerBg: COLORS.WHITE,
            colorBorder: 'rgba(0, 0, 0, 0.5)',
            fontSizeIcon: 16,
          },
        },
      }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Collapse
          defaultActiveKey={['1']}
          style={{ width: '100%', marginBottom: '24px' }}
        >
          <Panel
            className={style.panel}
            forceRender
            header={
              <Title className="vioer" level={4} style={{ margin: '4px 0' }}>
                Customs
              </Title>
            }
            extra={
              <Button
                type="primary"
                htmlType="submit"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Add
              </Button>
            }
            key="1"
          >
            <Row>
              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Export | Import</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="import"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Export | Import',
                        },
                      ]}
                    >
                      <Select
                        style={{ margin: '0px' }}
                        showSearch
                        placeholder={'Please select Export | Import'}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? '').includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        size="large"
                        options={[
                          {
                            value: 'Export',
                            label: 'Export',
                          },
                          {
                            value: 'Import',
                            label: 'Import',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>C/O</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="co"
                      rules={[
                        {
                          required: true,
                          message: 'Please select C/O',
                        },
                      ]}
                    >
                      <Input
                        style={{ margin: '0px' }}
                        placeholder={'Please select C/O'}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Phyto</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="Phyto"
                      rules={[
                        {
                          required: true,
                          message: 'Please select Phyto',
                        },
                      ]}
                    >
                      <Input
                        style={{ margin: '0px' }}
                        placeholder={'Please select Phyto'}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
            </Row>
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '1px',
                margin: '12px 0',
              }}
            />
            <Flex align={'center'} style={{ padding: '0 8px' }}>
              <Flex align={'center'}>
                <Image
                  src={'/images/oceanFreight/money.svg'}
                  alt="logo"
                  preview={false}
                  width={25}
                />
                <div
                  className={style.titleInput}
                  style={{
                    marginRight: '12px',
                    marginLeft: '12px',
                    width: '170px',
                    fontWeight: '700',
                    fontSize: '18px',
                  }}
                >
                  Price:
                </div>
              </Flex>
              <Tag
                color="green"
                style={{
                  height: '30px',
                  fontWeight: '700',
                  fontSize: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                VND 100,000,000
              </Tag>
              <Tag
                color="yellow"
                style={{
                  height: '30px',
                  fontWeight: '700',
                  fontSize: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                VND 100,000,000
              </Tag>
              <Tag
                color="red"
                style={{
                  height: '30px',
                  fontWeight: '700',
                  fontSize: '18px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                VND 100,000,000
              </Tag>
            </Flex>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
