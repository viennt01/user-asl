import { Col, Flex, Layout, Row, Image } from 'antd';
import React from 'react';
import style from './index.module.scss';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';

const { Footer } = Layout;

const AppFooter = () => {
  const router = useRouter();
  return (
    <Footer className={style.appFooterWrapper}>
      <Flex justify="center" style={{ width: '100%' }}>
        <div className={style.wrapper}>
          <Flex vertical justify="center">
            <div className={style.appFooter}>
              <Row>
                <Col lg={6} xl={6} xxl={6} md={0} sm={0} xs={0}>
                  <Flex justify="center" align="center">
                    <Image
                      src="/images/logo_ASL.png"
                      alt="logo"
                      width={180}
                      preview={false}
                    />
                  </Flex>
                </Col>
                <Col lg={5} xl={5} xxl={5} md={12} sm={12} xs={12}>
                  <Flex vertical justify="center" align="center">
                    <div className={style.headerItem}>Our links</div>
                    <div>
                      <Flex>
                        <Image
                          src="/images/common/vector.svg"
                          alt="logo"
                          width={7}
                          preview={false}
                        />
                        <div
                          onClick={() => router.push(ROUTERS.HOME)}
                          className={style.item}
                        >
                          Home
                        </div>
                      </Flex>
                      <Flex>
                        <Image
                          src="/images/common/vector.svg"
                          alt="logo"
                          width={7}
                          preview={false}
                        />
                        <div
                          className={style.item}
                          onClick={() => router.push(ROUTERS.BOOKING)}
                        >
                          Booking
                        </div>
                      </Flex>
                      <Flex>
                        <Image
                          src="/images/common/vector.svg"
                          alt="logo"
                          width={7}
                          preview={false}
                        />
                        <div
                          className={style.item}
                          onClick={() => router.push(ROUTERS.TRACK_TRACE)}
                        >
                          Track & Trace
                        </div>
                      </Flex>
                      <Flex>
                        <Image
                          src="/images/common/vector.svg"
                          alt="logo"
                          width={7}
                          preview={false}
                        />
                        <div
                          className={style.item}
                          onClick={() => router.push(ROUTERS.BOOKINGS_HISTORY)}
                        >
                          History Booking
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                </Col>

                <Col lg={5} xl={5} xxl={5} md={12} sm={12} xs={12}>
                  <Flex vertical justify="center" align="center">
                    <div className={style.headerItem}>Contact us</div>
                    <div>
                      <Flex>
                        <Image
                          src="/images/common/address.svg"
                          alt="logo"
                          width={10}
                          preview={false}
                        />
                        <div
                          onClick={() =>
                            window.open(
                              'https://www.google.com/maps?ll=10.809815,106.714914&z=17&t=m&hl=vi&gl=US&mapclient=embed&cid=17471276848864003079'
                            )
                          }
                          className={style.item}
                        >
                          Address
                        </div>
                      </Flex>
                      <Flex>
                        <Image
                          src="/images/common/phone.svg"
                          alt="logo"
                          width={10}
                          preview={false}
                        />
                        <a className={style.item} href={`tel:+842835129759`}>
                          Phone number
                        </a>
                      </Flex>
                      <Flex>
                        <Image
                          src="/images/common/email.svg"
                          alt="logo"
                          width={10}
                          preview={false}
                        />
                        <a
                          className={style.item}
                          href={`mailto:pricing@asl-corp.com.vn`}
                        >
                          Email address
                        </a>
                      </Flex>
                    </div>
                  </Flex>
                </Col>
                <Col md={0} sm={0} xs={0} lg={8} xl={8} xxl={8}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7548860012024!2d106.7149138!3d10.809814799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a27c890ee3%3A0xf27671ba2d0b8407!2sAmerasian%20Shipping%20Logistics%20(ASL)!5e0!3m2!1svi!2s!4v1700766075968!5m2!1svi!2s"
                    style={{ minHeight: '100%', width: '100%' }}
                    loading="lazy"
                  />
                </Col>
              </Row>
            </div>
          </Flex>
        </div>
      </Flex>
      <div className={style.copyRight}>
        ©2023 Existing ASL website. All Rights Reserved | Design by Softek
        Solution
      </div>
    </Footer>
  );
};

export default AppFooter;
