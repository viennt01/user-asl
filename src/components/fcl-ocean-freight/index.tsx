import React from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Form, Row, Select, Image, DatePicker } from 'antd';
import ROUTERS from '@/constants/router';
import { useRouter } from 'next/router';
import Service from '../home-page/components/service';
const dateFormat = 'YYYY/MM/DD';

export default function FclOceanFreight() {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (formValues: any) => {
    console.log(formValues);
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <div className={style.wrapper}>
      <div className={style.oceanFreight} />
      <Flex className={style.checkPrice}>
        <div className={style.content}>
          
          <div className={style.header}>
            <Flex
              className={style.contentHeader}
              justify={'space-between'}
              align={'center'}
            >
              <Flex
                className={style.stepActive}
                justify={'center'}
                align={'center'}
              >
                <Flex className={style.no} justify={'center'} align={'center'}>
                  1
                </Flex>
                <Flex
                  className={style.contentStep}
                  justify={'center'}
                  align={'center'}
                >
                  Check price
                </Flex>
              </Flex>
              <Flex className={style.step} justify={'center'} align={'center'}>
                <Flex className={style.no} justify={'center'} align={'center'}>
                  2
                </Flex>
                <Flex
                  className={style.contentStep}
                  justify={'center'}
                  align={'center'}
                >
                  Booking
                </Flex>
              </Flex>
              <Flex className={style.step} justify={'center'} align={'center'}>
                <Flex className={style.no} justify={'center'} align={'center'}>
                  3
                </Flex>
                <Flex
                  className={style.contentStep}
                  justify={'center'}
                  align={'center'}
                  style={{ width: '145px' }}
                >
                  Recommend Service
                </Flex>
              </Flex>
              <Flex className={style.step} justify={'center'} align={'center'}>
                <Flex className={style.no} justify={'center'} align={'center'}>
                  4
                </Flex>
                <Flex
                  className={style.contentStep}
                  justify={'center'}
                  align={'center'}
                  style={{ width: '120px' }}
                >
                  Review Booking
                </Flex>
              </Flex>
              <Flex className={style.step} justify={'center'} align={'center'}>
                <Flex className={style.no} justify={'center'} align={'center'}>
                  5
                </Flex>
                <Flex
                  className={style.contentStep}
                  justify={'center'}
                  align={'center'}
                >
                  Finish
                </Flex>
              </Flex>
            </Flex>
          </div>
          <div className={style.inputSearch}>
            <Form
              form={form}
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Row>
                <Col className={style.input} lg={12} span={24}>
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/anchor.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        POL
                      </div>
                    </Flex>
                    <div className={style.contentInput}>
                      <Form.Item
                        name="pol"
                        rules={[
                          {
                            required: true,
                            message: 'Please Select Port of Loading',
                          },
                        ]}
                      >
                        <Select
                          style={{ margin: '0px' }}
                          showSearch
                          placeholder={'Please Select Port of Loading'}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? '').toLowerCase()
                              )
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
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/anchor.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        POD
                      </div>
                    </Flex>
                    <div className={style.contentInput}>
                      <Form.Item
                        name="pod"
                        rules={[
                          {
                            required: true,
                            message: 'Please Select Port of Discharge',
                          },
                        ]}
                      >
                        <Select
                          style={{ margin: '0px' }}
                          showSearch
                          placeholder={'Please Select Port of Discharge'}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? '').toLowerCase()
                              )
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
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/date.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        Date
                      </div>
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
                          size='large'
                          format={dateFormat}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </div>
                  </Flex>
                </Col>
                <Col className={style.input} lg={12} span={24}>
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/date.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        To
                      </div>
                    </Flex>
                    <div className={style.contentInput}>
                      <Form.Item
                        name="validityDate"
                        rules={[
                          {
                            required: true,
                            message: 'Please select a validity date',
                          },
                        ]}
                      >
                        <DatePicker
                          size='large'
                          format={dateFormat}
                          style={{ width: '100%' }}
                        />
                      </Form.Item>
                    </div>
                  </Flex>
                </Col>
                <Col className={style.input} span={24}>
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/container.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        Type of container
                      </div>
                    </Flex>
                    <div className={style.contentInput}>
                      <Form.Item
                        name="container"
                        rules={[
                          {
                            required: true,
                            message: 'Please select type of container',
                          },
                        ]}
                      >
                        <Select
                          style={{ margin: '0px' }}
                          showSearch
                          placeholder={'Please select type of container'}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? '').toLowerCase()
                              )
                          }
                          size="large"
                          mode="multiple"
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
                <Col className={style.input} span={24}>
                  <Flex
                    align={'center'}
                  >
                    <Flex
                      align={'center'}
                      className={style.headerInput}
                    >
                      <Image
                        src={'/images/oceanFreight/commodity.png'}
                        alt="logo"
                        preview={false}
                        className={style.iconInput}
                        width={25}
                      />
                      <div className={style.titleInput} >
                        Commodity
                      </div>
                    </Flex>
                    <div className={style.contentInput}>
                      <Form.Item
                        name="commodity"
                        rules={[
                          {
                            required: true,
                            message: 'Please select commodity',
                          },
                        ]}
                      >
                        <Select
                          style={{ margin: '0px' }}
                          showSearch
                          placeholder={'Please select commodity'}
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? '').includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? '').toLowerCase()
                              )
                          }
                          size="large"
                          mode="multiple"
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
                <Col span={24} style={{ margin: '24px 0' }}>
                  <Flex justify={'center'} align={'center'}>
                    <Button style={{ marginRight: '8px', color: 'red', width: '100px' }} onClick={onReset}>Clear</Button>
                    <Button style={{ width: '100px' }} type="primary" htmlType="submit">Search</Button>
                  </Flex>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Flex>
      <Service />
    </div>
  );
}