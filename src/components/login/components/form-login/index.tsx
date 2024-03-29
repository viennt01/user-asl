import { Button, Form, FormInstance, Input } from 'antd';
import Link from 'next/link';
import style from '../../login.module.scss';
import { activeAccount, login } from '../../fetcher';
import { appLocalStorage } from '@/utils/localstorage';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginData } from '../../interface';
import { errorToast, successToast } from '@/hook/toast';
import { API_MESSAGE } from '@/constants/message';
import ROUTERS from '@/constants/router';
import { LOCAL_STORAGE_KEYS } from '@/constants/localstorage';

interface LoginProps {
  formLogin: FormInstance;
}

const initialValues: LoginData = {
  email: '',
  password: '',
};

const FormLogin = ({ formLogin }: LoginProps) => {
  const router = useRouter();
  const { email } = router.query;
  const [ip, setIp] = useState();
  const deviceName =
    typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown';
  const emailForgotPassword = Form.useWatch('email', formLogin);

  const getIp = async () => {
    const response = await fetch('https://api.ipify.org/?format=json');
    const data = await response.json();
    setIp(data.ip);
  };
  const dataHeader = {
    ipAddress: ip || '',
    deviceName: deviceName,
  };

  const onFinish = (values: LoginData) => {
    if (!ip) {
      return;
    }
    const data = {
      email: values.email,
      password: values.password,
    };
    appLocalStorage.set(LOCAL_STORAGE_KEYS.IP_ADDRESS, ip);
    appLocalStorage.set(LOCAL_STORAGE_KEYS.DEVICE_NAME, deviceName);

    if (email) {
      const dataActiveAccount = {
        email: email as string,
      };
      activeAccount(dataActiveAccount)
        .then((payload) => {
          if (!payload.status) {
            errorToast(API_MESSAGE.ERROR);
            return;
          }
        })
        .catch(() => errorToast(API_MESSAGE.ERROR));
    }

    loginUser.mutate(data, {
      onSuccess(data) {
        if (data.status) {
          if (data.message === 'Send OTP successfully!') {
            const props = {
              email: formLogin.getFieldValue('email'),
              ...dataHeader,
            };
            router.push({
              pathname: ROUTERS.CONFIRM_OTP,
              query: props,
            });
            successToast(data.message);
          } else {
            appLocalStorage.set(
              LOCAL_STORAGE_KEYS.TOKEN,
              data.data.accessToken
            );
            appLocalStorage.set(
              LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
              data.data.refreshToken
            );
            router.push(ROUTERS.HOME);
          }
        } else {
          errorToast(data.message);
        }
      },
      onError() {
        errorToast(API_MESSAGE.ERROR);
      },
    });
  };

  const loginUser = useMutation({
    mutationFn: (data: LoginData) => {
      return login(data, dataHeader);
    },
  });

  useEffect(() => {
    getIp();
  }, []);

  return (
    <>
      <div
        className={style.signinForm}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href={ROUTERS.HOME}>
          <img src="/images/logo_ASL.png" alt="" className={style.signinLogo} />
        </Link>

        <Form
          form={formLogin}
          name="formLogin"
          initialValues={initialValues}
          onFinish={onFinish}
          style={{ width: '100%' }}
        >
          <div className={style.titleSignIn}>
            <h2>Sign in</h2>
            <h2>Sign in</h2>
          </div>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: (
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    Please input your email!
                  </div>
                ),
              },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: (
                  <div
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                    }}
                  >
                    Please input your password!
                  </div>
                ),
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          <div className={style.loginOptions}>
            <div
              onClick={() => {
                const props = {
                  email: emailForgotPassword,
                };
                router.push({
                  pathname: ROUTERS.FORGOT_PASSWORD,
                  query: props,
                });
              }}
              className={style.forgotFieldLink}
            >
              Forgot password ?
            </div>
          </div>
          <Button
            loading={loginUser.isLoading}
            className={style.btnLogin}
            htmlType="submit"
            style={{ width: '100%', marginTop: '15px' }}
          >
            Login
          </Button>
          <p className={style.LoginDoNotHaveAcc}>
            Already have an account ?
            <Link href={ROUTERS.REGISTER} className={style.signUpButton}>
              Sign up
            </Link>
          </p>
        </Form>
      </div>
    </>
  );
};

export default FormLogin;
