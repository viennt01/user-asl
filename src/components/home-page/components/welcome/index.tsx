import { Flex } from 'antd';
import style from './index.module.scss';

const Welcome = () => {
  return (
    <section className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex vertical>
                <h1>EFFICIENCY</h1>
                <h1>COST EFFECTIVENESS</h1>
                <h1>FAST RESPONSE</h1>
                <h1>CONFIDENTIALITY</h1>
              </Flex>
              <Flex>
                <Flex justify="center" align="center" className={style.desc}>
                  Efficiency - Cost Effectiveness - Fast Response -
                  Confidentiality
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </section>
  );
};

export default Welcome;
