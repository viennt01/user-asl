import style from './index.module.scss';
import Service from '../home-page/components/service';
import { ConfigProvider, Flex, Tabs, TabsProps } from 'antd';
import COLORS from '@/constants/color';
import All from './components/all';
import Processing from './components/processing';
import Pending from './components/pending';
import Completed from './components/completed';
import Cancelled from './components/cancelled';
import { TYPE_TABS } from './interface';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const onChange = (key: TYPE_TABS) => {
    queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  const items: TabsProps['items'] = [
    {
      key: TYPE_TABS.ALL,
      label: 'All',
      children: <All />,
    },
    {
      key: TYPE_TABS.PENDING_CONFIRMATION,
      label: 'Pending Confirmation',
      children: <Pending />,
    },
    {
      key: TYPE_TABS.PROCESSING,
      label: 'Processing',
      children: <Processing />,
    },
    {
      key: TYPE_TABS.COMPLETED,
      label: 'Completed',
      children: <Completed />,
    },
    {
      key: TYPE_TABS.CANCELLED,
      label: 'Cancelled',
      children: <Cancelled />,
    },
  ];
  return (
    <div className={style.wrapper}>
      <div className={style.bg}>
        <Flex justify="center" className={style.welcome}>
          <Flex align="center" justify="center" className={style.container}>
            <Flex vertical align="flex-start" className={style.textCol}>
              <Flex>
                <h1>Manage Shipments</h1>
              </Flex>
              <Flex>
                <div className={style.desc}>
                  Watch how your cargo travels with ASL and learn how we can
                  help with each step!
                </div>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
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
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={(key: string) => onChange(key as TYPE_TABS)}
            />
          </ConfigProvider>
        </div>
      </Flex>

      <Service />
    </div>
  );
}
