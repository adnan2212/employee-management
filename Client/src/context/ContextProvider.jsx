import { createContext, useState } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [userInfo, setUserInfo] = useState({});

  const value = { auth, setAuth, userInfo, setUserInfo };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateContext;
