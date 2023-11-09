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
import { useEffect, useState } from 'react';
import style from './index.module.scss';
import { SvgLogout, SvgMenu, SvgUserProfile } from '@/assets/images/svg';
import { appLocalStorage } from '@/utils/localstorage';
import { LOCAL_STORAGE_KEYS } from '@/constants/localstorage';
import SvgClose from './assets/close.svg';
import CustomButton from '@/components/common/custom-button';
import COLORS from '@/constants/color';

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

  const isUserLogged = 'V';

  const handleLogout = () => {
    appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
    router.push(ROUTERS.LOGIN);
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
  useEffect(() => {
    setActiveItemMenu(routerPath);
  }, [router.pathname]);

  return (
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
                onClick={handleClickRegister}
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
                    style={{
                      verticalAlign: 'middle',
                    }}
                  >
                    V
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
                onClick={!isUserLogged ? handleClickLogin : handleClickProfile}
              >
                <Avatar
                  size={40}
                  style={{
                    backgroundColor: '#c6c6c6',
                    verticalAlign: 'middle',
                  }}
                >
                  V
                </Avatar>
                <span className={style.userEmail}>
                  {isUserLogged ? 'userInfo.email' : 'SIGN IN'}
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
  );
};

export default AppHeader;
