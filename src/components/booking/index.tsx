import { Button } from 'antd/lib';
import style from './index.module.scss';
import { Flex } from 'antd';
import { useRouter } from 'next/router';
import ROUTERS from '@/constants/router';

export default function Booking() {
  const router = useRouter();

  return (
    <div className={style.wrapper}>
      <div
        className={style.bg}
        style={{
          backgroundImage: `url('/images/oceanFreight/bgOcean.jpg')`,
        }}
      >
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Ocean Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Watch how your cargo travels with ASL and learn how we can
                  help with each step!
                </div>
              </Flex>
              <Flex>
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.OCEAN_FREIGHT)}
                >
                  Request Quote Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <div
        className={style.bg}
        style={{
          backgroundImage: `url('/images/common/bgAir.jpg')`,
        }}
      >
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-end" className={style.textCol}>
              <Flex>
                <h1>Air Freight</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Find faster routes for your goods with air freight.
                </div>
              </Flex>
              <Flex>
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.AIR_FREIGHT)}
                >
                  Request Quote Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <div
        className={style.bg}
        style={{
          backgroundImage: `url('/images/common/bgTruck.jpg')`,
        }}
      >
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Inland Trucking</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Our Customs Broker service ensures high accuracy, fast batch
                  processing time with experienced team.
                </div>
              </Flex>
              <Flex>
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.TRUCK_FREIGHT)}
                >
                  Request Quote Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
      <div
        className={style.bg}
        style={{
          backgroundImage: `url('/images/common/bgService.jpg')`,
        }}
      >
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-end" className={style.textCol}>
              <Flex>
                <h1>Customs Broker</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Our Customs Broker service ensures high accuracy, fast batch
                  processing time with experienced team.
                </div>
              </Flex>
              <Flex>
                <Button
                  className={style.btn}
                  onClick={() => router.push(ROUTERS.CUSTOMS_SERVICE)}
                >
                  Request Quote Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
