import React from 'react';
import style from '../index.module.scss';
import { Col, Flex, Row, Image } from 'antd';
import { IRequireTrackTrade } from '../interface';
import { formatDate } from '@/utils/format-number';

interface Props {
  data?: IRequireTrackTrade;
}

export default function Description({ data }: Props) {
  return (
    <div className={style.information}>
      <Flex className={style.header} align="center">
        <div className={style.boxHeader} />
        <div className={style.title}>
          {data?.pol} - {data?.pod}
        </div>
      </Flex>
      <div className={style.box}>
        <Row gutter={24} style={{ padding: '24px 16px' }}>
          <Col span={24} lg={16} style={{ paddingBottom: '24px' }}>
            <Row>
              <Col sm={12} span={24} style={{ paddingBottom: '16px' }}>
                <div>From</div>
                <div className={style.nameFrom}>{data?.pol}</div>
                <div>{formatDate(Number(data?.etd))}</div>
              </Col>
              <Col sm={12} span={24}>
                <div>To</div>
                <div className={style.nameFrom}>{data?.pod}</div>
                <div>{formatDate(Number(data?.eta))}</div>
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
                    <div>{data?.finalDestination}</div>
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
                    <div>{data?.placeOfDelivery}</div>
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
