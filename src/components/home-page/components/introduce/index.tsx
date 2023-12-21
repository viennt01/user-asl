import { Col, Flex, Row, Image, Typography } from 'antd';
import style from './index.module.scss';

const { Title, Text } = Typography;

const Introduce = () => {
  return (
    <section className={style.wrapper}>
      <Flex justify="center" align="center" className={style.bg}>
        <Flex
          justify="center"
          align="center"
          vertical
          className={style.container}
        >
          <Row gutter={24}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
              className={style.containerImage}
            >
              <Image src={'/images/introduce/ASL19.jpeg'} preview={false} />
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
              xxl={12}
              className={style.containerText}
            >
              <Title className={style.containerTextFirst}>
                Welcome To{' '}
                <Text className={style.containerTextSecond} strong>
                  ASL Logistic
                </Text>
              </Title>
              <div className={style.separate}></div>
              <Text className={style.description}>
                <Text strong className={style.descriptionStrong}>
                  Amerasian Shipping Logistics Corporation (ASL Logistic)
                </Text>{' '}
                is an International Sea-Air Freight Forwarding and Logistics
                Company based in Vietnam. We're first established in 2005 with a
                modest staff of 10 employees. Nowadays, we have expanded to a
                moderate staff of 100 experienced employees working at our four
                offices throughout Vietnam.
              </Text>
            </Col>
            <Col span={24} className={style.menuIcon}>
              <Row gutter={24}>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className={style.containerIcon}
                >
                  <Flex
                    justify="center"
                    align="center"
                    className={style.icon}
                    vertical
                  >
                    <Image
                      src={'/images/introduce/efficien.png'}
                      preview={false}
                      style={{ marginBottom: '32px' }}
                    />
                    Efficiency
                  </Flex>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className={style.containerIcon}
                >
                  <Flex
                    justify="center"
                    align="center"
                    className={style.icon}
                    vertical
                  >
                    <Image
                      src={'/images/introduce/efficien1.png'}
                      preview={false}
                      style={{ marginBottom: '32px' }}
                    />
                    Cost Effectiveness
                  </Flex>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className={style.containerIcon}
                >
                  <Flex
                    justify="center"
                    align="center"
                    className={style.icon}
                    vertical
                  >
                    <Image
                      src={'/images/introduce/efficien2.png'}
                      preview={false}
                      style={{ marginBottom: '32px' }}
                    />
                    Fast Response
                  </Flex>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  xxl={6}
                  className={style.containerIcon}
                >
                  <Flex
                    justify="center"
                    align="center"
                    className={style.icon}
                    vertical
                  >
                    <Image
                      src={'/images/introduce/efficien3.png'}
                      preview={false}
                      style={{ marginBottom: '32px' }}
                    />
                    Confidentiality
                  </Flex>
                </Col>
              </Row>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </section>
  );
};

export default Introduce;
