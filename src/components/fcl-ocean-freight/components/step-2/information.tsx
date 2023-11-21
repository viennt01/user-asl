import React from 'react';
import style from './index.module.scss';
import { Col, Flex, Row, Image } from 'antd';

export default function Information() {
  return (
    <div className={style.information}>
      <Flex className={style.header} align="center">
        <div className={style.boxHeader} />
        <div className={style.title}>
          Ho Chi Minh, Vietnam - Los Angeless, California, United States
        </div>
      </Flex>
      <div className={style.box}>
        <Row gutter={24} style={{ padding: '24px 16px' }}>
          <Col span={24} lg={16} style={{ paddingBottom: '24px' }}>
            <Row>
              <Col sm={12} span={24} style={{ paddingBottom: '16px' }}>
                <div>From</div>
                <div className={style.nameFrom}>Ho Chi Minh, Vietnam</div>
                <div>11/05/2003</div>
              </Col>
              <Col sm={12} span={24}>
                <div>To</div>
                <div className={style.nameFrom}>Ho Chi Minh, Vietnam</div>
                <div>11/05/2003</div>
              </Col>
              <Col span={0} sm={24} style={{ marginTop: '8px' }}>
                <Flex align="center">
                  <Image
                    src={'/images/oceanFreight/from.svg'}
                    preview={false}
                    width={40}
                  />
                  <div className={style.lineFromTo}></div>
                  <Image
                    src={'/images/oceanFreight/to.svg'}
                    preview={false}
                    width={40}
                  />
                </Flex>
              </Col>
            </Row>
          </Col>
          <Col span={24} lg={8} style={{ borderLeft: '1px solid  #838383' }}>
            <Row>
              <Col span={24} style={{ marginBottom: '12px' }}>
                <Flex align="center">
                  <div style={{ marginRight: '12px' }}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      preview={false}
                      width={20}
                    />
                  </div>
                  <div>
                    <div className={style.nameFrom}>Place of Receipt</div>
                    <div>PENGKALAN KUBOR</div>
                  </div>
                </Flex>
              </Col>
              <Col span={24} style={{ marginBottom: '12px' }}>
                <Flex align="center">
                  <div style={{ marginRight: '12px' }}>
                    <Image
                      src={'/images/oceanFreight/location.svg'}
                      preview={false}
                      width={20}
                    />
                  </div>
                  <div>
                    <div className={style.nameFrom}>Place of Delivery</div>
                    <div>AKYAB (SITTWE)</div>
                  </div>
                </Flex>
              </Col>
              <Col span={24}>
                <Flex align="center">
                  <div style={{ marginRight: '12px' }}>
                    <Image
                      src={'/images/oceanFreight/traffic.svg'}
                      preview={false}
                      width={20}
                    />
                  </div>
                  <div>
                    <div className={style.nameFrom}>Traffic Mode</div>
                    <div>Door - Door</div>
                  </div>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}