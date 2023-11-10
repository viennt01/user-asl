import { UserInfo } from '@/hook/fetcher';
import React, { useEffect, useState } from 'react';

interface AppContext {
  userInfo?: UserInfo;
  setUserInfo?: (userInfo: UserInfo) => void;
}

export const INITIAL_VALUE_USER_INFO = {
  idUser: '',
  idLanguage: '',
  idGender: '',
  employeeCode: '',
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  hasVerifiedEmail: false,
  birthday: '',
  address: '',
  citizenIdentification: '',
  visa: '',
  nationality: '',
  workingBranch: '',
  phoneNumber: '',
  hasVerifiedPhone: false,
  avatar: '',
  colorAvatar: '',
  defaultAvatar: '',
  userName: '',
  createdDate: '',
  updatedDate: '',
  newUser: false,
};

const INITIAL_VALUE_CONTEXT = {
  userInfo: INITIAL_VALUE_USER_INFO,
};

export const AppContext = React.createContext<AppContext>(
  INITIAL_VALUE_CONTEXT
);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [valueContext, setValueContext] = useState(INITIAL_VALUE_CONTEXT);

  const setUserInfo = (userInfo: UserInfo) => {
    setValueContext((prev) => ({ ...prev, userInfo }));
  };
  useEffect(() => {
    setValueContext((prev) => ({
      ...prev,
      setUserInfo,
    }));
  }, []);
  return (
    <AppContext.Provider value={valueContext}>{children}</AppContext.Provider>
  );
}
