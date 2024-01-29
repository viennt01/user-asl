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
                  Full truckload (FTL) refers to the mode of transportation where a container truck carries only one dedicated shipment from one point to another, allowing to control over the handling of your cargo, as well as the costs and delivery dates associated with it.
                  <Flex
                    className={style.box}
                    justify={'center'}
                    align={'center'}
                  >
                    FTL
                  </Flex>
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
                  Less than truckload (LTL) means your total shipment does not take up an entire truck. The main benefit of the LTL shipment method is you only pay for the space on the truck that you need. LTL is commonly used when you have several pallets/pakages of cargo, LTL service can be a great option.
                  <Flex
                    className={style.box}
                    justify={'center'}
                    align={'center'}
                  >
                    LTL
                  </Flex>
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
