import { Col, Layout, Row, Image } from 'antd';
import React from 'react';
import style from './index.module.scss';
import ROUTERS from '@/constants/router';
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  RightOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <div className={style.cover}>
      <Footer className={style.appFooterWrapper}>
        <div className={style.top}>
          <Row>
            <Col span={24} md={24} lg={6} xl={6}>
              <div className={`${style.dFlex} ${style.over}`}>
                <Image
                  src="/images/logo_ASL.png"
                  alt="logo"
                  width={200}
                  preview={false}
                  className={style.dFlex}
                />
              </div>
            </Col>

            <Col span={24} md={24} lg={5} xl={5}>
              <div className={style.over}>
                <div className={style.headerItem}>Our links</div>

                <div className={style.BodyItem}>
                  <div className={style.item}>
                    <a className={style.dFlex} href={ROUTERS.HOME}>
                      <RightOutlined className={style.iconFooter} />
                      <p>Home</p>
                    </a>
                  </div>

                  <div className={style.item}>
                    <a className={style.dFlex} href={ROUTERS.BOOKING}>
                      <RightOutlined className={style.iconFooter} />
                      <p>Booking</p>
                    </a>
                  </div>

                  <div className={style.item}>
                    <a className={style.dFlex} href={ROUTERS.TRACK_TRACE}>
                      <RightOutlined className={style.iconFooter} />
                      <p>Track &amp; Trace</p>
                    </a>
                  </div>

                  <div className={style.item}>
                    <a className={style.dFlex} href={ROUTERS.BOOKINGS_HISTORY}>
                      <RightOutlined className={style.iconFooter} />
                      <p>Manage Shipments</p>
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col span={24} md={24} lg={5} xl={5}>
              <div className={style.over}>
                <div className={style.headerItem}>Contact us</div>

                <div className={style.BodyItem}>
                  <div className={style.item}>
                    <a
                      className={style.dFlex}
                      onClick={() =>
                        window.open(
                          'https://www.google.com/maps?ll=10.809815,106.714914&z=17&t=m&hl=vi&gl=US&mapclient=embed&cid=17471276848864003079'
                        )
                      }
                    >
                      <EnvironmentOutlined className={style.iconFooter} />
                      <p>Address</p>
                    </a>
                  </div>

                  <div className={style.item}>
                    <a className={style.dFlex} href={`tel:+842835129759`}>
                      <PhoneOutlined className={style.iconFooter} />
                      <p>Phone number</p>
                    </a>
                  </div>

                  <div className={style.item}>
                    <a
                      className={style.dFlex}
                      href={`mailto:pricing@asl-corp.com.vn`}
                    >
                      <MailOutlined className={style.iconFooter} />
                      <p>Email address</p>
                    </a>
                  </div>
                </div>
              </div>
            </Col>

            <Col span={24} md={24} lg={8} xl={8}>
              <div className={style.map}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0195440048096!2d106.7149138!3d10.809814799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528a27c890ee3%3A0xf27671ba2d0b8407!2sAmerasian%20Shipping%20Logistics%20(ASL)!5e0!3m2!1sen!2s!4v1704518215506!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  loading="lazy"
                ></iframe>
              </div>
            </Col>
          </Row>
        </div>
      </Footer>

      <div className={style.bottom}>
        <p>
          ©2023 Existing ASL website. All Rights Reserved | Design by Softek
          Solution
        </p>
      </div>
    </div>
  );
};

export default AppFooter;
