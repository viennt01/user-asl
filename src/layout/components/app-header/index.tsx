import ROUTERS from '@/constants/router';
import {
  Layout,
  Image,
  Menu,
  Drawer,
  Row,
  Col,
  Button,
  Dropdown,
  ConfigProvider,
  Avatar,
} from 'antd';
import type { MenuProps } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import style from './index.module.scss';
import { SvgLogout, SvgMenu, SvgUserProfile } from '@/assets/images/svg';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constants/localstorage';
import SvgClose from './assets/close.svg';
import CustomButton from '@/components/common/custom-button';
import COLORS from '@/constants/color';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LogoutData, logout } from './fetcher';
import { AppContext, INITIAL_VALUE_USER_INFO } from '@/app-context';
import { API_USER } from '@/fetcherAxios/endpoint';
import { getUserInfo } from '@/hook/fetcher';
const { Header } = Layout;

const menuItems = [
  {
    key: ROUTERS.HOME,
    label: 'Home',
  },
  {
    key: ROUTERS.BOOKING,
    label: 'Booking',
  },
  {
    key: ROUTERS.TRACK_TRACE,
    label: 'Track & Trace',
  },
  {
    key: ROUTERS.BOOKINGS_HISTORY,
    label: 'History Booking',
  },
];

const userMenuItems = [
  {
    key: ROUTERS.PROFILE,
    label: (
      <div className={style.userMenuItem}>
        My profile
        <SvgUserProfile />
      </div>
    ),
  },
  {
    key: ROUTERS.LOGOUT,
    label: (
      <div className={style.userMenuItem}>
        Log out
        <SvgLogout />
      </div>
    ),
  },
];

const AppHeader = () => {
  const router = useRouter();
  const routerPath = router.pathname as ROUTERS;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeItemMenu, setActiveItemMenu] = useState(ROUTERS.HOME);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [tokenHeader, setTokenHeader] = useState<string>('');
  const { userInfo, setUserInfo } = useContext(AppContext);
  const isUserLogged = !!userInfo?.fullName;
  console.log(userInfo);

  const logoutUser = useMutation({
    mutationFn: (body: LogoutData) => {
      return logout(body);
    },
    onSuccess: async () => {
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      if (setUserInfo) setUserInfo(INITIAL_VALUE_USER_INFO);
      await router.push(ROUTERS.HOME);
    },
  });

  const handleLogout = () => {
    const data = {
      accessToken: appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN),
      ipAddress: ipAddress,
      deviceName: deviceName,
    };
    logoutUser.mutate(data);
  };

  const handleClickMenu: MenuProps['onClick'] = (e) => {
    setShowMobileMenu(false);
    router.push(e.key);
  };

  const handleClickUserMenu: MenuProps['onClick'] = (e) => {
    if (e.key === ROUTERS.LOGOUT) {
      handleLogout();
    } else {
      router.push(e.key);
    }
  };

  const handleClickLogin = () => {
    setShowMobileMenu(false);
    router.push(ROUTERS.LOGIN);
  };

  const handleClickRegister = () => {
    setShowMobileMenu(false);
    router.push(ROUTERS.REGISTER);
  };

  const handleClickProfile = () => {
    setShowMobileMenu(false);
    router.push(ROUTERS.PROFILE);
  };

  const checkUser = useQuery({
    queryKey: [API_USER.CHECK_USER],
    queryFn: () => getUserInfo(),
    enabled: tokenHeader !== '',
    onSuccess: (data) => {
      if (!data.status) {
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      } else {
        if (setUserInfo) setUserInfo(data.data);
      }
    },
    onError: () => {
      appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
      router.replace(ROUTERS.LOGIN);
    },
    retry: 0,
  });
  useEffect(() => {
    setTokenHeader(appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN));
    if (tokenHeader) {
      checkUser.isFetched;
    }
  }, [router.pathname]);
  useEffect(() => {
    setActiveItemMenu(routerPath);
  }, [router.pathname]);
  useEffect(() => {
    setIpAddress(appLocalStorage.get(LOCAL_STORAGE_KEYS.IP_ADDRESS));
    setDeviceName(appLocalStorage.get(LOCAL_STORAGE_KEYS.DEVICE_NAME));
  }, []);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 12,
          },
          components: {
            Menu: {
              colorItemTextHover: COLORS.GREY_COLOR_HOVER,
            },
          },
        }}
      >
        <Header className={style.appHeader}>
          <Image
            className={style.logo}
            src={'/images/asl-logo.png'}
            alt="logo"
            preview={false}
            onClick={() => router.push(ROUTERS.HOME)}
          />
          <Menu
            className={style.menu}
            mode="horizontal"
            selectedKeys={[activeItemMenu]}
            items={menuItems}
            onClick={handleClickMenu}
          />
          <div className={style.user}>
            {!isUserLogged ? (
              <>
                <Button
                  type="text"
                  className={style.loginButton}
                  size="large"
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Dropdown
                  overlayClassName={style.userMenu}
                  placement="bottomRight"
                  menu={{ items: userMenuItems, onClick: handleClickUserMenu }}
                  trigger={['click']}
                >
                  <div className={style.user}>
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: userInfo?.colorAvatar || '#c6c6c6',
                        verticalAlign: 'middle',
                      }}
                      src={userInfo?.avatar}
                    >
                      {isUserLogged ? userInfo.defaultAvatar : ''}
                    </Avatar>
                  </div>
                </Dropdown>
              </>
            )}
          </div>
          <SvgMenu
            className={style.menuButton}
            onClick={() => setShowMobileMenu(true)}
          />
          <Drawer
            className={style.mobileMenuWrapper}
            title={
              <div className={style.mobileMenuTitle}>
                <div
                  className={style.title}
                  onClick={
                    !isUserLogged ? handleClickLogin : handleClickProfile
                  }
                >
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: userInfo?.colorAvatar || '#c6c6c6',
                      verticalAlign: 'middle',
                      display: isUserLogged ? '' : 'none',
                    }}
                    src={userInfo?.avatar}
                  >
                    {isUserLogged ? userInfo.defaultAvatar : ''}
                  </Avatar>
                  <span className={style.userEmail}>
                    {isUserLogged ? userInfo.email : 'SIGN IN'}
                  </span>
                </div>
                <Button
                  type="text"
                  className={style.closeDrawer}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <SvgClose />
                </Button>
              </div>
            }
            closeIcon={null}
            placement="right"
            zIndex={99999}
            onClose={() => setShowMobileMenu(false)}
            open={showMobileMenu}
          >
            <Row
              style={{
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Col flex={1}>
                <Menu
                  className={style.mobileMenu}
                  mode="vertical"
                  selectedKeys={[activeItemMenu]}
                  items={
                    isUserLogged
                      ? [
                          ...menuItems,
                          // {
                          //   key: ROUTERS.DASHBOARD,
                          //   label: 'Bot dashboard',
                          // },
                        ]
                      : menuItems
                  }
                  onClick={handleClickMenu}
                />
              </Col>
              <Col>
                {isUserLogged ? (
                  <CustomButton
                    className={style.logoutButton}
                    onClick={handleLogout}
                  >
                    SIGN OUT
                  </CustomButton>
                ) : (
                  <>
                    <Button
                      block
                      type="primary"
                      className={style.loginButton}
                      size="large"
                      onClick={handleClickLogin}
                    >
                      SIGN IN
                    </Button>
                    <Button
                      block
                      type="text"
                      className={style.registerButton}
                      size="large"
                      onClick={handleClickRegister}
                    >
                      SIGN UP
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Drawer>
        </Header>
      </ConfigProvider>
    </>
  );
};

export default AppHeader;
