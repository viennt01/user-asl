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
                Chào mừng đến với{' '}
                <Text className={style.containerTextSecond} strong>
                  ASL
                </Text>
              </Title>
              <div className={style.separate}></div>
              <Text className={style.description}>
                Được thành lập từ tháng 01/2005,{' '}
                <Text strong className={style.descriptionStrong}>
                  Công Ty Cổ Phần Giao Nhận Vận Tải Mỹ Á (ASL Logistic)
                </Text>{' '}
                là một trong những nhà cung cấp dịch vụ vận tải quốc tế, dịch vụ
                giao nhận, khai thuê hải quan và vận chuyển nội địa hàng đầu tại
                Việt Nam.
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
                  <Flex justify="center" align="center" className={style.icon} vertical>
                    <Image
                      src={'/images/introduce/efficien.png'}
                      preview={false}
                      style={{marginBottom: '32px'}}
                    />
                   Hiệu quả cao
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
                  <Flex justify="center" align="center" className={style.icon} vertical>
                    <Image
                      src={'/images/introduce/efficien1.png'}
                      preview={false}
                      style={{marginBottom: '32px'}}
                    />
                   Chi phí thấp
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
                  <Flex justify="center" align="center" className={style.icon} vertical>
                    <Image
                      src={'/images/introduce/efficien2.png'}
                      preview={false}
                      style={{marginBottom: '32px'}}
                    />
                    Nhanh chóng
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
                  <Flex justify="center" align="center" className={style.icon} vertical>
                    <Image
                      src={'/images/introduce/efficien3.png'}
                      preview={false}
                      style={{marginBottom: '32px'}}
                    />
                    Uy tín
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
