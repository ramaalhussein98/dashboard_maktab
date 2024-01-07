import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { myAxios } from "../api/myAxios";
import { object } from "yup";
const UserContext = createContext();
const getData = async () => {
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  if (user_type_bussines) {
    const res = await myAxios.get(`api/v1/user/profile`);
    if (res) {
      console.log(res);
      return res;
    }
  } else {
    const res = await myAxios.get(`api/v1/ordinaries/profile`);
    if (res) {
      // console.log(res);
      return res;
    }
  }
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState();

  // const [isUserUpdated, setIsUserUpdated] = useState(0);
  // const [userId, setUserId] = useState();
  // const isAuth = !!localStorage.getItem("user_token");
  // const token = localStorage.getItem("user_token");
  // const isUserInLocal = !!localStorage.getItem("userData");

  // useEffect(() => {
  //   if (isUserInLocal) {
  //     const userData = JSON.parse(localStorage.getItem("userData"));
  //     setUserData(userData);
  //     const id = localStorage.getItem("userId");
  //     id && setUserId(id);
  //   } else {
  //     if (isAuth) {
  //       const getDataFun = async () => {
  //         const res = await getData();
  //         if (res.status === 1) {
  //           localStorage.setItem("userMembership", res?.user?.membership_id);
  //           localStorage.setItem("userName", res?.user.username);
  //           localStorage.setItem("userData", JSON.stringify(res?.user));

  //           setUserData(res?.user);
  //         }
  //       };

  //       getDataFun();
  //     }
  //   }
  // }, []);
  // useEffect(() => {
  //   // if (isUserUpdated > 0) {
  //   if (isAuth) {
  //     const getDataFun = async () => {
  //       const res = await getData(myAxios);
  //       if (res.status === 1) {
  //         localStorage.setItem("userMembership", res?.user?.membership_id);
  //         localStorage.setItem("userName", res?.user.username);
  //         localStorage.setItem("userData", JSON.stringify(res?.user));

  //         setUserData(res?.user);
  //       }
  //     };
  //     getDataFun();
  //   }
  //   // }
  // }, [isUserUpdated, isAuth]);
  const [user, setUser] = useState();
  const [isUserUpdated, setIsUserUpdated] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("user_token"));
  const setTokenFun = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("user_token", newToken);
      const getUserData = async () => {
        const res = await getData();
        setUser(res?.data?.data);
        localStorage.setItem("userData", JSON.stringify(res?.data?.data));
      };
      getUserData();
    } else {
      localStorage.removeItem("user_token");
    }
  };
  const updateUserInformation = async () => {
    const res = await getData();
    setUser(res?.data?.data);
    localStorage.setItem("userData", JSON.stringify(res?.data?.data));
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("user_token");
    if (storedToken) {
      setToken(storedToken);
      // getData();
      const getUserData = async () => {
        const res = await getData();
        setUser(res?.data?.data);
        localStorage.setItem("userData", JSON.stringify(res?.data?.data));
      };
      if (typeof JSON.parse(localStorage.getItem("userData")) != "object") {
        getUserData();
      } else {
        setUser(JSON.parse(localStorage.getItem("userData")));
      }
    }
  }, []);
  // useEffect(() => {
  //   if (isUserUpdated > 0) {
  //     const getUserData = async () => {
  //       const res = await getData();
  //       setUser(res?.data?.data);
  //       localStorage.setItem("userData", JSON.stringify(res?.data?.data));
  //     };
  //     if (typeof JSON.parse(localStorage.getItem("userData")) != "object") {
  //       getUserData();
  //     } else {
  //       setUser(JSON.parse(localStorage.getItem("userData")));
  //     }
  //   }
  // }, [isUserUpdated]);
  console.log("user", user);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        setTokenFun,
        setIsUserUpdated,
        updateUserInformation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useStateContext = () => useContext(UserContext);
export default UserContext;
