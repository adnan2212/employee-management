import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import jwtDecode from "jwt-decode";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/* ICONS */
import { CheckboxIndeterminate16Regular } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { CalendarMonthOutlined } from "@ricons/material";

const HourSheet = ({ selectedDate }) => {
  const productionHours = 8;
  const nonProductionHours = 1;
  // KPI
  const productionKPI = 8 * 0.9375;
  const nonProductioKPI = 1 * 0.64375;
  // const productionKPI = ProductionHour * 0.9375;
  // const nonProductioKPI = nonProductionHour * 0.9375;

  // For Efficiency
  const productionPercentage = (productionKPI / 7.5) * 100;
  const nonProducrionPercentage = (nonProductioKPI / 5.5) * 100;
  const sum = productionPercentage + nonProducrionPercentage;
  const sumText = parseFloat(sum.toFixed(2));

  const { auth } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const TASK_URL = "/tasks";
  const [userInfo, setUserInfo] = useState([]);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

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

        // Sort the filtered data by taskType (Production first, then Non-Production)
        filteredData.sort((a, b) => {
          if (a.taskType === "Production" && b.taskType === "Non-Production") {
            return -1; // "Production" should come before "Non-Production"
          } else if (
            a.taskType === "Non-Production" &&
            b.taskType === "Production"
          ) {
            return 1; // "Non-Production" should come after "Production"
          } else {
            return 0; // Preserve the original order
          }
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
        console.log(taskTypes);
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedDate) {
      // If a selectedDate prop is provided, fetch data for the selected date
      fetchTaskData(selectedDate);
    } else {
      // If no selectedDate prop is provided, fetch data for today's date
      const today = new Date().toLocaleDateString().split("T")[0];
      fetchTaskData(today);
      console.log(today);
    }

    // Cleanup function to cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, [selectedDate, axiosPrivate, auth]);

  console.log("Selected Date in HourSheet:", selectedDate);
  console.log("Task Data:", taskData);

  return (
    <div className="mb-10 mt-2 shrink-0 md:flex md:justify-evenly md:pt-2">
      {/* EFFICIENCY */}
      <div className=" ">
        <h1 className="ml-6 text-lg font-bold text-[#0D1829] md:text-center">
          Efficiency
        </h1>

        <div className="  flex justify-center  px-12 ">
          <div className=" m-4 flex h-auto min-w-[374px] scale-100 justify-around gap-2 rounded-xl bg-[#EEF2FF] py-2   ">
            <div className=" ">
              <div className="ml-1 py-2  text-sm font-medium">
                Candidate Efficiency
              </div>
              <p className="ml-40 pb-2 text-xs font-normal">in hrs</p>
              {/* Map taskType and hours in efficiency */}
              {Object.entries(taskData)
                .sort(([taskTypeA], [taskTypeB]) => {
                  if (
                    taskTypeA === "Production" &&
                    taskTypeB === "Non-Production"
                  ) {
                    return -1; // "Production" should come before "Non-Production"
                  } else if (
                    taskTypeA === "Non-Production" &&
                    taskTypeB === "Production"
                  ) {
                    return 1; // "Non-Production" should come after "Production"
                  } else {
                    return 0; // Preserve the original order
                  }
                })
                .map(([taskType, hours]) => (
                  <div
                    key={taskType}
                    className="flex items-center justify-between gap-2  "
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        color={
                          taskType === "Non-Production" ? "#F77307" : "#2051E5"
                        }
                      >
                        <CheckboxIndeterminate16Regular />
                      </Icon>
                      <p className="opacity-60">{taskType}</p>
                    </span>

                    <div className=" flex flex-col items-center  ">
                      <p className=" ml-[-30px] opacity-60">{hours}</p>
                    </div>
                  </div>
                ))}
              <p className="ml-4 pb-2 pt-6 text-sm font-medium text-[#0D1829]">
                Overall: {`${sumText}%`}
              </p>
            </div>
            <div className="mr-7 mt-6 ">
              <div className="w-16">
                <div className="ml-4 text-2xl">
                  <CircularProgressbarWithChildren
                    value={productionPercentage}
                    styles={buildStyles({
                      pathColor: "#2051E5",
                      trailColor: "#eee",
                      strokeLinecap: "butt"
                    })}
                  >
                    {/* Foreground path */}
                    <CircularProgressbar
                      value={nonProducrionPercentage}
                      text={`${sumText}%`} // render `${sum}%`
                      styles={buildStyles({
                        pathColor: "#F77307",
                        trailColor: "transparent",
                        strokeLinecap: "butt"
                      })}
                    />
                  </CircularProgressbarWithChildren>
                </div>
                <div className="mr-3 mt-7 flex flex-col items-center  ">
                  <p className="  whitespace-nowrap text-xs font-normal opacity-60">
                    Due Date
                  </p>
                  <div className="flex items-center gap-2 whitespace-nowrap font-medium">
                    <Icon color="#333" size="30">
                      <CalendarMonthOutlined />
                    </Icon>
                    <p className="text-xs font-medium opacity-90">
                      June 6, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 shrink-0 rounded-3xl md:mb-[-3rem] md:mt-0">
        <p className="ml-6 text-lg font-bold text-[#0D1829] md:text-center">
          Hour-Sheet
        </p>
        {Object.entries(taskData)
          .sort(([taskTypeA], [taskTypeB]) => {
            if (taskTypeA === "Production" && taskTypeB === "Non-Production") {
              return -1; // "Production" should come before "Non-Production"
            } else if (
              taskTypeA === "Non-Production" &&
              taskTypeB === "Production"
            ) {
              return 1; // "Non-Production" should come after "Production"
            } else {
              return 0; // Preserve the original order
            }
          })
          .map(([taskType, hours]) => (
            <div key={taskType} className="m-5 flex justify-center md:mt-6">
              <div
                className={`flex h-16 w-80 scale-100 items-center justify-between rounded-xl ${
                  taskType === "Non-Production"
                    ? "bg-[#F77307]"
                    : "bg-[#2051E5]"
                } px-8 text-lg font-semibold text-white`}
              >
                <p className="leading-[3rem]">{taskType}</p>
                <p>{hours} hrs</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HourSheet;
