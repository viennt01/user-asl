import React from 'react';
import style from './index.module.scss';
import { Col, Flex, Row, Image, Button } from 'antd';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';

export default function Service() {
  const router = useRouter();
  return (
    <div className={style.wrapper}>
      <div className={style.wrapperContainer}>
        <div className={style.container}>
          <Row>
            <Col span={24}>
              <Flex justify="center" align="center">
                <div className={style.title}>OUR TYPES OF SERVICES</div>
              </Flex>
            </Col>
            <Col span={24} style={{ width: '100%' }}>
              <Flex justify="center">
                <Row gutter={24} className={style.listService}>
                  <Col xs={24} sm={12} md={12} lg={6}>
                    <Flex justify="center">
                      <Flex vertical justify="center" className={style.card}>
                        <Flex justify="center" className={style.titleCard}>
                          Ocean Freight
                        </Flex>
                        <Flex justify="center">
                          <Image
                            className={style.image}
                            src={'/images/service/ocean.jpg'}
                            preview={false}
                          />
                        </Flex>
                        <Flex justify="center">
                          <Button
                            className={style.btnCard}
                            type="primary"
                            onClick={() => router.push(ROUTERS.OCEAN_FREIGHT)}
                          >
                            Request Quote
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6}>
                    <Flex justify="center">
                      <Flex vertical justify="center" className={style.card}>
                        <Flex justify="center" className={style.titleCard}>
                          Air Freight
                        </Flex>
                        <Flex justify="center">
                          <Image
                            className={style.image}
                            src={'/images/service/air.jpg'}
                            preview={false}
                          />
                        </Flex>
                        <Flex justify="center">
                          <Button
                            className={style.btnCard}
                            type="primary"
                            onClick={() => router.push(ROUTERS.AIR_FREIGHT)}
                          >
                            Request Quote
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6}>
                    <Flex justify="center">
                      <Flex vertical justify="center" className={style.card}>
                        <Flex justify="center" className={style.titleCard}>
                          Inland Trucking
                        </Flex>
                        <Flex justify="center">
                          <Image
                            className={style.image}
                            src={'/images/service/truck.jpg'}
                            preview={false}
                          />
                        </Flex>
                        <Flex justify="center">
                          <Button
                            className={style.btnCard}
                            type="primary"
                            onClick={() => router.push(ROUTERS.TRUCK_FREIGHT)}
                          >
                            Request Quote
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={6}>
                    <Flex justify="center">
                      <Flex vertical justify="center" className={style.card}>
                        <Flex justify="center" className={style.titleCard}>
                          Customs Broker
                        </Flex>
                        <Flex justify="center">
                          <Image
                            className={style.image}
                            src={'/images/service/service.jpg'}
                            preview={false}
                          />
                        </Flex>
                        <Flex justify="center">
                          <Button
                            className={style.btnCard}
                            type="primary"
                            onClick={() => router.push(ROUTERS.CUSTOMS_SERVICE)}
                          >
                            Request Quote
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
