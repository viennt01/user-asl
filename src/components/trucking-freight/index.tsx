import React from 'react';
import style from './index.module.scss';
import { Button, Card, Col, Flex, Row } from 'antd';
import ROUTERS from '@/constants/router';
import { useRouter } from 'next/router';
import Service from '../home-page/components/service';

export default function TruckingFreight() {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Inland Trucking</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Watch how your cargo travels with ASL and learn how we can
                  help with each step!
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <Flex className={style.option} justify={'center'} align={'center'}>
        <Row style={{ maxWidth: '1200px' }}>
          <Col className={style.header} span={24}>
            TYPES OF SERVICES OF
          </Col>
          <Col lg={12} span={24} style={{ padding: '0 56px' }}>
            <Card
              className={style.card}
              cover={<img alt="example" src="/images/oceanFreight/fcl.png" />}
            >
              <div className={style.description}>
                <div className={style.description_1}>
                  For larger volumes, Full-Container Load (FTL) shipping is the
                  right call.
                  <Flex
                    className={style.box}
                    justify={'center'}
                    align={'center'}
                  >
                    FTL Shipping
                  </Flex>
                </div>
                <div>
                  With FTL shipping, you enjoy safe and cost-efficient
                  door-to-door, port-to-port transportation for your goods.
                </div>
              </div>
              <Flex
                style={{ marginTop: '16px' }}
                justify={'center'}
                align={'center'}
              >
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.FTL_TRUCK_FREIGHT)}
                >
                  Request Quote
                </Button>
              </Flex>
            </Card>
          </Col>
          <Col lg={12} span={24} style={{ padding: '0 56px' }}>
            <Card
              className={style.card}
              cover={<img alt="example" src="/images/oceanFreight/lcl.png" />}
            >
              <div className={style.description}>
                <div className={style.description_1}>
                  If you need to move small loads, Less-than-Container (LTL)
                  shipping is the right choice for you.
                  <Flex
                    className={style.box}
                    justify={'center'}
                    align={'center'}
                  >
                    LTL Shipping
                  </Flex>
                </div>
                <div>
                  With LTL shipping, you only pay for the space you use while we
                  guarantee allocation for your exact needs.
                </div>
              </div>
              <Flex
                style={{ marginTop: '16px' }}
                justify={'center'}
                align={'center'}
              >
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.LTL_TRUCK_FREIGHT)}
                >
                  Request Quote
                </Button>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Flex>
      <Service />
    </div>
  );
}
