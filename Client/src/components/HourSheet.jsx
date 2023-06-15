import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { CheckboxIndeterminate16Regular } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { CalendarMonthOutlined } from "@ricons/material";
import { PieChart, Pie, Cell } from "recharts";
import Rectangle from "./Rectangle";

const HourSheet = ({ selectedDate, setDailyAllKPI }) => {
  const [userInfo, setUserInfo] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const { auth, getUserTaskData } = useContent();
  const axiosPrivate = useAxiosPrivate();
  const TASK_URL = "/tasks";

  useEffect(() => {
    const controller = new AbortController();

    const fetchTaskData = async (date) => {
      try {
        console.log("Fetching data for date:", date);

        const response = await axiosPrivate.get(TASK_URL);
        const filteredData = response.data.filter((task) => {
          const taskDate = new Date(task.date).setHours(0, 0, 0, 0);
          const selectedDateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
          return taskDate === selectedDateWithoutTime;
        });

        filteredData.sort((a, b) => {
          if (a.taskType === "Production" && b.taskType === "Non-Production") {
            return -1;
          } else if (
            a.taskType === "Non-Production" &&
            b.taskType === "Production"
          ) {
            return 1;
          } else {
            return 0;
          }
        });

        setUserInfo(filteredData);

        const taskTypes = {};
        filteredData.forEach((task) => {
          if (taskTypes.hasOwnProperty(task.taskType)) {
            taskTypes[task.taskType] += task.hoursSpent;
          } else {
            taskTypes[task.taskType] = task.hoursSpent;
          }
        });
        setTaskData(taskTypes);

        const productionKPI = taskTypes.Production * 0.9375 || 0;
        const nonProductionKPI = taskTypes["Non-Production"] * 0.64375 || 0;
        const sumKPI = productionKPI + nonProductionKPI;
        const dailyAllKPI = parseFloat(sumKPI.toFixed(1));
        setDailyAllKPI(dailyAllKPI);
      } catch (err) {
        console.error(err);
      }
    };

    if (selectedDate) {
      fetchTaskData(selectedDate);
    } else {
      const today = new Date().toLocaleDateString().split("T")[0];
      fetchTaskData(today);
    }

    return () => {
      controller.abort();
    };
  }, [selectedDate, axiosPrivate, auth, setDailyAllKPI, getUserTaskData]);

  const productionPercentage =
    ((taskData.Production * 0.9375) / 7.5) * 100 || 0;
  const nonProductionPercentage =
    ((taskData["Non-Production"] * 0.64375) / 5.5) * 100 || 0;
  const sum = productionPercentage + nonProductionPercentage;
  const sumText = parseFloat(sum.toFixed(2));

  return (
    <div className="mb-5  shrink-0 px-10 pt-5 md:flex md:justify-evenly ">
      {Object.keys(taskData).length > 0 && (
        <div className=" ">
          <h1 className=" text-lg font-bold text-[#0D1829] md:text-center">
            Efficiency
          </h1>

          <div className="  flex justify-center px-12  py-5 ">
            <div className=" m-4 flex h-auto w-[374px]  min-w-[320px] scale-100 justify-around gap-2 rounded-xl bg-gradient-to-r from-[#FFFAF3] to-[#ECEFFF]  py-2   ">
              <div className=" ">
                <div className="ml-1 py-2  text-sm font-medium">
                  Candidate Efficiency
                </div>
                <p className="ml-40 pb-2 text-xs font-normal">in hrs</p>
                {Object.entries(taskData)
                  .sort(([taskTypeA], [taskTypeB]) => {
                    if (
                      taskTypeA === "Production" &&
                      taskTypeB === "Non-Production"
                    ) {
                      return -1;
                    } else if (
                      taskTypeA === "Non-Production" &&
                      taskTypeB === "Production"
                    ) {
                      return 1;
                    } else {
                      return 0;
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
                            taskType === "Non-Production"
                              ? "#F77307"
                              : "#2051E5"
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
              <div className="mr-7 mt-2 ">
                <div className="w-16">
                  <div className="mr-2  flex flex-col items-center">
                    <PieChart width={100} height={100}>
                      <Pie
                        data={[
                          { name: "Production", value: productionPercentage },
                          {
                            name: "Non-Production",
                            value: nonProductionPercentage
                          }
                        ]}
                        dataKey="value"
                        startAngle={0}
                        endAngle={360}
                        outerRadius={36}
                        innerRadius={30}
                        paddingAngle={1}
                      >
                        <Cell fill="#2051E5" />
                        <Cell fill="#F77307" />
                      </Pie>
                      <text
                        x={50}
                        y={50}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{ fontSize: "12px", fontWeight: "bold" }}
                      >
                        {`${sumText}%`}
                      </text>
                    </PieChart>
                    <p className="whitespace-nowrap text-xs font-normal opacity-60">
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
      )}
      <div className="mt-2 shrink-0  rounded-3xl md:mb-[-3rem] md:mt-0">
        <p className="mx-auto  pb-5 text-lg font-bold text-[#0D1829] md:text-center">
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
            <div key={taskType} className="m-5  flex justify-center md:mt-6">
              <div
                className={`flex h-16 w-80 scale-100 items-center justify-between rounded-xl ${
                  taskType === "Non-Production"
                    ? "bg-gradient-to-r from-red-500 to-orange-500"
                    : "bg-gradient-to-r from-blue-800 to-indigo-900"
                } px-8 text-lg font-semibold text-white `}
              >
                <p className="leading-[3rem]">{taskType}</p>
                <p>{hours} hrs</p>
              </div>
            </div>
          ))}

        {Object.keys(taskData).length === 0 && <Rectangle />}
      </div>
    </div>
  );
};

export default HourSheet;
