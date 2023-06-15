import { createContext, useState } from "react";

const StateContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [getUserTaskData, setGetUserTaskData] = useState([]);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  const value = {
    auth,
    setAuth,
    userInfo,
    setUserInfo,
    getUserTaskData,
    setGetUserTaskData,
    persist,
    setPersist,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

export default StateContext;
