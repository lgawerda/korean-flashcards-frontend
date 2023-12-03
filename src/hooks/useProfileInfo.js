import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const useProfileInfo = () => {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const getProfile = () => {
      axios
        .get("http://localhost:2500/user/profile")
        .then((res) => {
          console.log(res);
          if (res.data) setProfile(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getProfile();
  });
  return profile;
};

export default useProfileInfo;
