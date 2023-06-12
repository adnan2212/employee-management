import { useState, useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";

const HourSheet = ({ selectedDate }) => {
  const { auth } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const TASK_URL = "/tasks";
  const [userInfo, setUserInfo] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const userId = decoded?.UserInfo?.id || "";

    const fetchTaskData = async (date) => {
      try {
        console.log("Fetching data for date:", date);

        const response = await axiosPrivate.get(TASK_URL);
        const filteredData = response.data.filter((task) => {
          // Compare the task's date with the selected date (ignoring the time)
          const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
          const selectedDateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
          return taskDate === selectedDateWithoutTime;
        });

        setUserInfo(filteredData);

        // Sum the hours spent on each task type for the selected date
        const taskTypes = {};
        filteredData.forEach((task) => {
          if (taskTypes.hasOwnProperty(task.taskType)) {
            taskTypes[task.taskType] += task.hoursSpent;
          } else {
            taskTypes[task.taskType] = task.hoursSpent;
          }
        });
        setTaskData(taskTypes);
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedDate) {
      // If a selectedDate prop is provided, fetch data for the selected date
      fetchTaskData(selectedDate);
    } else {
      // If no selectedDate prop is provided, fetch data for today's date
      const today = new Date().toISOString().split("T")[0];
      fetchTaskData(today);
    }

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [selectedDate, axiosPrivate, auth]);

  console.log("Selected Date in HourSheet:", selectedDate);
  console.log("Task Data:", taskData);

  return (
    <div className="mt-2 shrink-0 rounded-3xl md:mb-[-3rem] md:mt-0">
      <p className="ml-6 text-lg font-bold text-[#0D1829] md:text-center">
        Hour-Sheet
      </p>
      {Object.entries(taskData).map(([taskType, hours]) => (
        <div key={taskType} className="m-5 flex justify-center md:mt-6">
          <div className="flex h-16 w-80 scale-100 items-center justify-between rounded-xl bg-[#2051E5] px-8 text-lg font-semibold text-white">
            <p className="leading-[3rem]">{taskType}</p>
            <p>{hours} hrs</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourSheet;
