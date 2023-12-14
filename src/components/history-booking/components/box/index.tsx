import { Button, Col, Flex, Row, Image, Typography } from 'antd';
import style from './index.module.scss';
import { formatDate } from '@/utils/format-number';
import { STATUS_COLORS, STATUS_LABELS } from '../..';
import { IDetailBookingLCL } from '../../interface';
import { useRouter } from 'next/router';
import { ROUTERS_DYNAMIC } from '@/constants/router';

const { Text } = Typography;

interface Props {
  data: IDetailBookingLCL;
}

export default function Box({ data }: Props) {
  const router = useRouter();

  return (
    <div className={style.box}>
      <div className={style.idBox}>Booking No: ABC12345</div>
      <Row gutter={24} style={{ padding: '24px 16px' }}>
        <Col span={24} lg={16} style={{ paddingBottom: '24px' }}>
          <Row>
            <Col span={24}>
              <div className={style.statusBox}>
                <Text
                  className={style.titleStatus}
                  style={{
                    backgroundColor:
                      STATUS_COLORS[
                        data.statusBooking as keyof typeof STATUS_COLORS
                      ],
                  }}
                >
                  {
                    STATUS_LABELS[
                      data.statusBooking as keyof typeof STATUS_LABELS
                    ]
                  }
                </Text>
              </div>
            </Col>
            <Col sm={12} span={24} style={{ paddingBottom: '16px' }}>
              <div>From</div>
              <div className={style.nameFrom}>{data?.polName}</div>
              <div>{formatDate(Number(data?.cargoReadyDated))}</div>
            </Col>
            <Col sm={12} span={24}>
              <div>To</div>
              <div className={style.nameFrom}>{data?.podName}</div>
              <div>{formatDate(Number(data?.cargoCutOffDated))}</div>
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
                  <div>{data?.placeOfRecipt}</div>
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
                  <div>
                    {data?.typeOfPOLName} - {data?.typeOfPODName}
                  </div>
                </div>
              </Flex>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className={style.bottomBox}>
        <Flex justify="flex-end">
          <Button
            type="primary"
            onClick={() =>
              data.typeOfSeaService === 'FCL'
                ? router.push(ROUTERS_DYNAMIC.FCL_DETAIL(data.bookingID))
                : router.push(ROUTERS_DYNAMIC.LCL_DETAIL(data.bookingID))
            }
          >
            View detail
          </Button>
        </Flex>
      </div>
    </div>
  );
}
