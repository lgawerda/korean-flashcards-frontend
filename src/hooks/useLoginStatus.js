import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useLoginStatus = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const getLoginStatus = () => {
      if (Cookies.get("user")) setIsLogin(true);
      else setIsLogin(false);
    };
    getLoginStatus();
  });
  return isLogin;
};

export default useLoginStatus;
