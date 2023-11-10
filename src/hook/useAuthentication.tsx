import { appLocalStorage } from '@/utils/localstorage';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiClient } from '@/fetcherAxios';
import ROUTERS from '@/constants/router';
import { LOCAL_STORAGE_KEYS } from '@/constants/localstorage';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from './fetcher';
import { API_USER } from '@/fetcherAxios/endpoint';

export default function withAuthentication(ChildComponent: () => JSX.Element) {
  const Container = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useQuery({
      queryKey: [API_USER.CHECK_USER],
      queryFn: () => getUserInfo(),
      onSuccess: (data) => {
        if (!data.status) {
          // remove token and redirect to home
          appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
          router.replace(ROUTERS.LOGIN);
        }
        // setInformationUser(data.data);
      },
      onError: () => {
        // remove token and redirect to home
        appLocalStorage.remove(LOCAL_STORAGE_KEYS.TOKEN);
        router.replace(ROUTERS.LOGIN);
      },
      retry: 0,
    });

    useEffect(() => {
      const token = appLocalStorage.get(LOCAL_STORAGE_KEYS.TOKEN);
      if (!token) {
        if (router.pathname !== ROUTERS.LOGIN) {
          router.push(ROUTERS.LOGIN);
        }
      } else {
        // Đặt token vào apiClient
        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        });

        if (router.pathname === ROUTERS.LOGIN) {
          router.push(ROUTERS.HOME);
        }
      }
      setLoading(false);
    }, [router.pathname]);
    if (loading) return <></>;
    return <ChildComponent />;
  };

  return Container;
}
