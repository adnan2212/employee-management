import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import { Delete28Regular, Edit24Filled } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { FileUploadSharp } from "@ricons/material";
import ExcelJS from "exceljs";
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalFooter,
  useToast
} from "@chakra-ui/react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Pagination
} from "@windmill/react-ui";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const TASK_URL = "/tasks";

const UserTaskData = () => {
  const { auth, getUserTaskData, setGetUserTaskData } = useContent();
  const token = auth?.accessToken;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(TASK_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("UserTaskData ->>>", response.data);
        const sortedTaskData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        setGetUserTaskData(sortedTaskData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const [sortColumn, setSortColumn] = useState(""); // Column to sort
  const [sortDirection, setSortDirection] = useState("asc"); // Sort direction: "asc" or "desc"
  const handleSort = (column) => {
    if (column === "date" || column === "taskType") {
      if (column === sortColumn) {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
        setSortColumn(column);
        setSortDirection("asc");
      }
    }
  };

  // Modify the chartData structure
  const chartData = [];
  getUserTaskData.forEach(({ date, taskType, hoursSpent }) => {
    const existingData = chartData.find(
      (data) => data.date === formatDate(date)
    );

    if (existingData) {
      existingData[
        taskType === "Production" ? "productionHours" : "nonProductionHours"
      ] += hoursSpent;
    } else {
      const newData = {
        date: formatDate(date),
        productionHours: taskType === "Production" ? hoursSpent : 0,
        nonProductionHours: taskType !== "Production" ? hoursSpent : 0
      };
      chartData.push(newData);
    }
  });

  return (
    <>
      <div className="overflow-x-auto">
        <h2 className="m-8 mb-4 text-center text-2xl font-bold">
          User Task Data
        </h2>
        <div className="mx-4 my-10 sm:overflow-hidden sm:rounded-lg sm:border-b sm:border-gray-400 sm:shadow lg:mx-40">
          <TableContainer className="min-w-full sm:rounded-lg">
            <Table className="min-w-full" id="tableId">
              <TableHeader className="bg-gray-500 text-gray-800">
                <TableRow className="text-center font-bold sm:text-base">
                  <TableCell
                    className="cursor-pointer py-5 sm:px-4"
                    onClick={() => handleSort("date")}
                  >
                    Date{""}
                    {sortColumn === "date" && (
                      <Icon
                        size={14}
                        className="ml-1"
                        name={
                          sortDirection === "asc" ? "arrow-up" : "arrow-down"
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell
                    className="cursor-pointer  sm:px-4"
                    onClick={() => handleSort("taskType")}
                  >
                    Task Type{" "}
                    {sortColumn === "taskType" && (
                      <Icon
                        size={14}
                        className="ml-1"
                        name={
                          sortDirection === "asc" ? "arrow-up" : "arrow-down"
                        }
                      />
                    )}
                  </TableCell>
                  <TableCell className="sm:px-4">Sub Task Type</TableCell>
                  <TableCell className="sm:px-4">Hours</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className=" text-center">
                {getUserTaskData
                  .sort((a, b) => {
                    if (sortColumn === "date") {
                      const dateA = new Date(a.date);
                      const dateB = new Date(b.date);
                      return sortDirection === "asc"
                        ? dateA - dateB
                        : dateB - dateA;
                    } else if (sortColumn === "taskType") {
                      const taskTypeA = a.taskType.toLowerCase();
                      const taskTypeB = b.taskType.toLowerCase();
                      return sortDirection === "asc"
                        ? taskTypeA.localeCompare(taskTypeB)
                        : taskTypeB.localeCompare(taskTypeA);
                    }
                    return 0;
                  })
                  .map(
                    (
                      { date, _id, taskType, subTaskType, hoursSpent },
                      index
                    ) => (
                      <TableRow key={_id}>
                        <TableCell
                          className={`sm:px-4 ${
                            index % 2 === 0 ? " bg-gray-100" : ""
                          }`}
                        >
                          {formatDate(date)}
                        </TableCell>
                        <TableCell
                          className={`sm:px-4 ${
                            index % 2 === 0 ? "bg-gray-100" : ""
                          }`}
                        >
                          {taskType}
                        </TableCell>
                        <TableCell
                          className={`sm:px-4 ${
                            index % 2 === 0 ? "bg-gray-100" : ""
                          }`}
                        >
                          {subTaskType}
                        </TableCell>
                        <TableCell
                          className={`sm:px-4 ${
                            index % 2 === 0 ? "bg-gray-100" : ""
                          }`}
                        >
                          {hoursSpent} Hr
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Add the combined line chart */}
          <div className="my-8 w-full max-w-full ">
            <h3 className="mb-2 text-center text-lg font-bold">
              Task Data Overview
            </h3>
            <ResponsiveContainer width="100%" aspect={6 / 2}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="productionHours"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="nonProductionHours"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTaskData;
