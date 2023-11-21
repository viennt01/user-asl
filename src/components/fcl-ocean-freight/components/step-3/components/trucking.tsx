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
} from 'antd';
import COLORS from '@/constants/color';
const { Panel } = Collapse;
const { Title } = Typography;
const dateFormat = 'YYYY/MM/DD';

export default function Trucking() {
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
                Trucking
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
                    <div className={style.titleInput}>Pick up address</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="pol"
                      rules={[
                        {
                          required: true,
                          message: 'Please select pick up address',
                        },
                      ]}
                    >
                      <Select
                        style={{ margin: '0px' }}
                        showSearch
                        placeholder={'Please select pick up address'}
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
                            value: 'item.locationID',
                            label: 'item.locationName',
                          },
                        ]}
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
              <Col className={style.input} lg={12} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/weight.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Weight</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="pod"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter weight',
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ margin: '0px', width: '100%' }}
                        placeholder={'Please enter weight'}
                        size="large"
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
              <Col className={style.input} lg={12} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/date.png'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Date</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item
                      name="effectDated"
                      rules={[
                        {
                          required: true,
                          message: 'Please select a effect date',
                        },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        format={dateFormat}
                        style={{ width: '100%' }}
                      />
                    </Form.Item>
                  </div>
                </Flex>
              </Col>
              <Col className={style.input} span={24}>
                <Flex align={'center'}>
                  <Flex align={'center'} className={style.headerInput}>
                    <Image
                      src={'/images/oceanFreight/note.svg'}
                      alt="logo"
                      preview={false}
                      width={25}
                    />
                    <div className={style.titleInput}>Note</div>
                  </Flex>
                  <div className={style.contentInput}>
                    <Form.Item name="note">
                      <Input.TextArea
                        style={{ margin: '0px' }}
                        placeholder={'Please enter note'}
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
              <div
                style={{
                  width: '170px',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              >
                VND 100,000,000
              </div>
            </Flex>
          </Panel>
        </Collapse>
      </Form>
    </ConfigProvider>
  );
}
