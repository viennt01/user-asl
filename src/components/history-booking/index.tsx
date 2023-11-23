import style from './index.module.scss';
import Service from '../home-page/components/service';
import { ConfigProvider, Flex, Tabs, TabsProps } from 'antd';
import COLORS from '@/constants/color';
import All from './components/all';
import Processing from './components/processing';
import Pending from './components/pending';
import Completed from './components/completed';
import Cancelled from './components/cancelled';
export const STATUS_COLORS = {
  PENDING: COLORS.STATUS_CODE.PENDING,
  PROCESSING: COLORS.STATUS_CODE.PROCESSING,
  COMPLETED: COLORS.STATUS_CODE.COMPLETED,
  CANCELLED: COLORS.STATUS_CODE.CANCELLED,
};

export const STATUS_LABELS = {
  PENDING: 'Pending Confirmation',
  PROCESSING: 'Processing',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export default function HistoryBooking() {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All',
      children: <All />,
    },
    {
      key: '2',
      label: 'Pending Confirmation',
      children: <Pending />,
    },
    {
      key: '3',
      label: 'Processing',
      children: <Processing />,
    },
    {
      key: '4',
      label: 'Completed',
      children: <Completed />,
    },
    {
      key: '5',
      label: 'Cancelled',
      children: <Cancelled />,
    },
  ];
  return (
    <div className={style.wrapper}>
      <div className={style.welcome}>
        <div className={style.container}>
          <div className={style.textCol}>
            <h1>History & Booking</h1>
            <div className={style.desc}>
              Find the right route for your goods with guaranteed container
              allocation by ocean freight.
            </div>
          </div>
        </div>
      </div>
      <Flex justify="center">
        <div className={style.historyBooking}>
          <ConfigProvider
            theme={{
              components: {
                Tabs: {
                  colorPrimary: COLORS.GREY_COLOR_HOVER,
                  itemColor: '#B4B4B4',
                },
              },
            }}
          >
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </ConfigProvider>
        </div>
      </Flex>

      <Service />
    </div>
  );
}
