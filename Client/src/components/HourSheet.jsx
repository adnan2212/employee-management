import { useState, useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";

const HourSheet = () => {
  const { auth } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const TASK_URL = "/tasks";
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const userId = decoded?.UserInfo?.id || "";
    console.log(userId);
    const handleClick = async () => {
      try {
        const response = await axiosPrivate.get(`${TASK_URL}`);
        setUserInfo(response.data);
        console.log(auth?.accessToken);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    handleClick();
  }, []);
  return (
    <div className="mt-2 shrink-0 rounded-3xl md:mb-[-3rem] md:mt-0">
      <p className="ml-6 text-lg font-bold text-[#0D1829] md:text-center ">
        Hour-Sheet
      </p>
      <div className="mx-5 mt-4 flex justify-center md:mt-5">
        <div className="flex h-16 w-80 scale-100 items-center justify-around rounded-xl bg-[#2051E5] text-lg font-semibold text-white">
          <p
            className="leading-[3rem] 
"
          >
            Production
          </p>
          {/* <p>{userInfo.hoursSpent}</p> */}
        </div>
      </div>
      <div className="m-5 flex justify-center md:mt-6">
        <div className=" flex h-16 w-80 scale-100 items-center justify-around rounded-xl bg-[#F77307] text-lg font-semibold text-white    md:mb-12">
          <p
            className="leading-[3rem]  
"
          >
            Non-production
          </p>
          <p>3 hrs</p>
        </div>
      </div>
    </div>
  );
};

export default HourSheet;
