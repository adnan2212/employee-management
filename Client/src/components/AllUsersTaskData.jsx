import React, { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import {
  FaRegCalendarAlt
} from "react-icons/fa";
import { Icon } from "@ricons/utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Delete28Regular, Edit24Filled } from "@ricons/fluent";
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
  useToast,
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
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";

import { Formik, Field, Form } from "formik";
import * as Yup from "yup"; 
const ALL_USERS_DATA = "/tasks/details";

const ADMIN = "/tasks/admin";

const task_type = ["Production", "Non-Production"];
const sub_task_type = {
  Production: ["Audit", "Junking", "Coding"],
  "Non-Production": ["Meeting", "Client Handling", "Networking"],
};

const validationSchema = Yup.object({
  taskType: Yup.string().required("Task Type is required"),
  subTaskType: Yup.string().when("taskType", (taskType, schema) =>
    taskType ? schema.required("Sub Task Type is required") : schema.nullable()
  ),
  hoursSpent: Yup.number()
    .positive("Hours Spent must be a positive number")
    .required("Hours Spent is required"),
});

const AllUsersTaskData = () => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [data, setData] = useState([]);
  const { allUsersData, setAllUsersData, auth } = useContent();
  const token = auth?.accessToken;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const cancelRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const onCloseModal = () => {
    setIsPopupOpen(false);
    onClose();
  };
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await axios.get(ALL_USERS_DATA, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        console.log("ADMINallUserData ->>>", response.data);
        const sortedTaskData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(response.data);
        setAllUsersData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsersData();
  }, []);
  
  const handleToggleCalendar = () => {
    setShowFullCalendar(!showFullCalendar);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = async (taskId) => {
    const task = allUsersData.find((task) => task._id === taskId);
    setSelectedTask(task);
    setIsPopupOpen(true);
    setInitialFormValues({
      taskType: task.taskType,
      subTaskType: task.subTaskType,
      hoursSpent: task.hoursSpent,
    });

    onOpen();

    console.log("Edit Task ID:", taskId);
  };

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setIsConfirmationOpen(true);
  };
  const handleConfirmationOpen = () => {
    setIsConfirmationOpen(true);
  };
  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };
  const handleConfirmationDelete = async () => {
    try {
      await axios.delete(`${ADMIN}/${deleteTaskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setIsConfirmationOpen(false);
      setSuccessMessage("Task updated successfully");
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Remove the task from getUserTaskData
      const updatedTaskData = allUsersData.filter(
        (task) => task._id !== deleteTaskId
      );
      setAllUsersData(updatedTaskData);
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleSubmit = async (values, formikBag) => {
    try {
      const response = await axios.put(`${ADMIN}/${selectedTask._id}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("Updated Task:", response.data);

      formikBag.resetForm();
      setSuccessMessage("Form Updated successfully!");
      const updatedTaskData = allUsersData.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            taskType: values.taskType,
            subTaskType: values.subTaskType,
            hoursSpent: values.hoursSpent,
          };
        }
        return task;
      });
      setAllUsersData(updatedTaskData);
      setTimeout(() => {
        onCloseModal(); // Close the modal after 1 second
        setSuccessMessage("");
        toast({
          position: "top",
          title: "Task updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }, 400);
    } catch (err) {
      console.log(err);
      // Handle error here
    }
    console.log("Line 38:", values);
  };
  const [initialFormValues, setInitialFormValues] = useState({
    taskType: "",
    subTaskType: "",
    hoursSpent: "",
  });

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

  const filteredData = React.useMemo(() => {
    if (startDate && endDate) {
      return data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      });
    } else {
      return data;
    }
  }, [data, startDate, endDate]);

  const sortedData = React.useMemo(() => {
    if (sortColumn === "date") {
      return filteredData.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      });
    } else if (sortColumn === "taskType") {
      return filteredData.slice().sort((a, b) => {
        const taskTypeA = a.taskType.toLowerCase();
        const taskTypeB = b.taskType.toLowerCase();
        return sortDirection === "asc"
          ? taskTypeA.localeCompare(taskTypeB)
          : taskTypeB.localeCompare(taskTypeA);
      });
    } else {
      return filteredData;
    }
  }, [filteredData, sortColumn, sortDirection]);

  function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Table Data");

    const table = document.getElementById("tableId");

    if (!table) {
      return;
    }

    const headerStyle = {
      font: { bold: true, color: { argb: "FFFFFF" }, name: "Arial", size: 12 },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "007BFF" },
        name: "Calibri",
      },
      border: {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "medium", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      },
      alignment: { vertical: "middle", horizontal: "center" },
    };

    const cellStyle = {
      font: { color: { argb: "000000" }, size: 11 },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } },
      border: {
        top: { style: "thin", color: { argb: "D3D3D3" } },
        bottom: { style: "thin", color: { argb: "D3D3D3" } },
        left: { style: "thin", color: { argb: "D3D3D3" } },
        right: { style: "thin", color: { argb: "D3D3D3" } },
      },
      alignment: { vertical: "middle", horizontal: "center", wrapText: true },
    };

    const tableRows = table.getElementsByTagName("tr");
    Array.from(tableRows).forEach((row, rowIndex) => {
      const cells = row.getElementsByTagName("td");
      Array.from(cells).forEach((cell, cellIndex) => {
        if (cellIndex === cells.length) {
          return;
        }

        const value = cell.innerText;
        const excelCell = worksheet.getCell(
          `${String.fromCharCode(65 + cellIndex)}${rowIndex + 1}`
        );
        excelCell.value = value;

        if (rowIndex === 0) {
          excelCell.fill = headerStyle.fill;
          excelCell.border = headerStyle.border;
          excelCell.font = headerStyle.font;
          excelCell.alignment = headerStyle.alignment;
        } else {
          excelCell.fill = cellStyle.fill;
          excelCell.border = cellStyle.border;
          excelCell.font = cellStyle.font;
          excelCell.alignment = cellStyle.alignment;
        }

        // Calculate cell width based on content length
        const cellWidth = value ? value.length : 0;
        const column = worksheet.getColumn(cellIndex + 1);
        const headerWidth = column.header ? column.header.length : 0;
        const columnWidth = Math.max(cellWidth, headerWidth, 12) + 2;

        // Convert column width to Excel's character width units (approximate conversion)
        const excelColumnWidth = Math.ceil(columnWidth * 1.2);
        column.width = excelColumnWidth;
      });

      worksheet.getRow(rowIndex + 1).height = 30; // Set row height to 30 (adjust as needed)
      worksheet
        .getRow(rowIndex + 1)
        .eachCell({ includeEmpty: true }, (cell) => {
          cell.alignment = cellStyle.alignment;
        });
    });

    // Remove the last column from the worksheet
    const lastColumnIndex = worksheet.columns.length;
    worksheet.spliceColumns(lastColumnIndex, 1);

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "table_data.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    toast({
      title: "Download Successful",
      description: "The task data has been downloaded.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      <div className="overflow-x-auto flex flex-col ">
        <h2 className="m-8 mb-4 text-center text-2xl font-bold">
          Daily Tracker Sheet
        </h2>
        {/* Date Range Picker */}
        <div className="inline-flex justify-center">
          <button
            className="my-5 text-lg font-bold flex justify-center text-black text-center"
            onClick={handleToggleCalendar}
          >
            <Link className="flex items-center justify-center gap-3">
              <p>Pick Date</p>
              <FaRegCalendarAlt />
            </Link>
          </button>
        </div>
        {showFullCalendar ? <>
          <div className="mb-4 flex justify-center">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            className="rounded-lg shadow-md p-4 bg-white" 
          />
        </div>
        </> : ""}
        <div className="mb-4 flex justify-center">
          {startDate && endDate && (
            <p className="text-gray-600">
              Selected Date Range: {startDate.toLocaleDateString()} -{" "}
              {endDate.toLocaleDateString()}
            </p>
          )}
        </div>
        
        <div className="mx-4 my-10 sm:overflow-hidden sm:rounded-lg sm:border-b sm:border-gray-400 sm:shadow lg:mx-32">
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
                  <TableCell className="sm:px-4">User ID</TableCell>
                  <TableCell className="sm:px-4">Name</TableCell>
                  <TableCell
                    className="cursor-pointer  sm:px-4"
                    onClick={() => handleSort("taskType")}
                  >
                    Task{" "}
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
                  <TableCell className="sm:px-4">Sub Task</TableCell>
                  <TableCell className="sm:px-4">Hours</TableCell><TableCell className="sm:px-4">Actions</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className=" text-center">
                {sortedData.map(
                  (
                    {
                      date,
                      _id,
                      userId,
                      userName,
                      taskType,
                      subTaskType,
                      hoursSpent
                    },
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
                        {userId}
                      </TableCell>
                      <TableCell
                        className={`sm:px-4 ${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        }`}
                      >
                        {userName.charAt(0).toUpperCase() + userName.slice(1)}
                      </TableCell>
                      <TableCell
                        className={`sm:px-4 ${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        }`}
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {taskType}
                      </TableCell>
                      <TableCell
                        className={`sm:px-4 ${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        }`}
                        style={{ whiteSpace: "nowrap" }}
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
                      <TableCell
                        className={` flex-col items-center justify-center sm:flex sm:flex-row ${
                          index % 2 === 0 ? "bg-gray-100" : ""
                        }  sm:px-4`}
                      >
                        <button
                          className="mr-2 scale-100 text-indigo-600 transition-all hover:scale-105 hover:text-indigo-900 focus:outline-none md:mr-3"
                          onClick={() => handleEdit(_id)}
                        >
                          <Icon color="grey" size="20">
                            <Edit24Filled />
                          </Icon>
                        </button>
                        <button
                          className="scale-100 text-red-600 transition-all hover:scale-105 hover:text-red-900 focus:outline-none"
                          onClick={() => handleDelete(_id)}
                        >
                          <Icon color="grey" size="20">
                            <Delete28Regular />
                          </Icon>
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
            <div className="  border-t bg-gray-500 px-4 py-3 text-center text-gray-800  ">
              <button
                onClick={exportToExcel}
                className="flex  scale-100 items-center justify-center gap-2 transition-all hover:scale-105 "
              >
                <Icon color="#1F2937" size="30">
                  <FileUploadSharp />
                </Icon>
                Export to Excel
              </button>
            </div>
          </TableContainer>
        </div>
        <Modal isOpen={isOpen} onClose={onCloseModal} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex  items-center justify-center sm:my-4 ">
                <Formik
                  className="sm:w-full"
                  initialValues={initialFormValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, handleBlur, errors, touched }) => (
                    <Form className="mb-2 w-full rounded bg-white px-8 pb-8 pt-6 shadow-md sm:max-w-md">
                      {successMessage && (
                        <div className="mb-2 mt-2 rounded border border-green-500 bg-green-100 px-4 py-2 text-sm text-green-900">
                          {successMessage}
                        </div>
                      )}
                      <div className="mb-4">
                        <label
                          htmlFor="taskType"
                          className="mb-2 block text-sm font-bold text-gray-700"
                        >
                          Task Type:
                        </label>
                        <Field
                          as="select"
                          name="taskType"
                          id="taskType"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.taskType}
                          className={`w-full border p-2 ${
                            errors.taskType && touched.taskType
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        >
                          <option className="" value="" disabled>
                            Select a task type
                          </option>
                          {task_type.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Field>
                        {touched.taskType && errors.taskType && (
                          <div className="mt-1 text-xs text-red-500">
                            <FaTimesCircle className="mb-1 mr-1 inline" />
                            {errors.taskType}
                          </div>
                        )}
                        {touched.taskType && !errors.taskType}
                      </div>

                      {values.taskType && (
                        <div className="mb-4">
                          <label
                            htmlFor="subTaskType"
                            className="mb-2 block text-sm font-bold text-gray-700"
                          >
                            Sub Task Type:
                          </label>
                          <Field
                            as="select"
                            name="subTaskType"
                            id="subTaskType"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.subTaskType}
                            className={`w-full border p-2 ${
                              errors.subTaskType && touched.subTaskType
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded focus:outline-none`}
                          >
                            <option value="" disabled>
                              Select a sub task type
                            </option>
                            {sub_task_type[values.taskType] &&
                              sub_task_type[values.taskType].map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                          </Field>
                          {touched.subTaskType && errors.subTaskType && (
                            <div className="mt-1 text-xs text-red-500">
                              <FaTimesCircle className="mb-1 mr-1 inline" />
                              {errors.subTaskType}
                            </div>
                          )}
                          {touched.subTaskType && !errors.subTaskType}
                        </div>
                      )}

                      <div className="mb-4">
                        <label
                          htmlFor="hoursSpent"
                          className="mb-2 block text-sm font-bold text-gray-700"
                        >
                          Hours Spent:
                        </label>
                        <Field
                          type="number"
                          id="hoursSpent"
                          name="hoursSpent"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.hoursSpent}
                          className={`w-full border p-2 ${
                            errors.hoursSpent && touched.hoursSpent
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded focus:outline-none`}
                        />
                        {touched.hoursSpent && errors.hoursSpent && (
                          <div className="mt-1 text-xs text-red-500">
                            <FaTimesCircle className="mb-1 mr-1 inline" />
                            {errors.hoursSpent}
                          </div>
                        )}
                        {touched.hoursSpent && !errors.hoursSpent}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button
                          type="submit"
                          colorScheme="teal"
                          className={`w-full rounded bg-red-500 px-4 py-2 text-white ${
                            Object.keys(errors).length > 0 || !values.taskType
                              ? "cursor-not-allowed opacity-50"
                              : ""
                          } hover:bg-red-600`}
                          disabled={
                            Object.keys(errors).length > 0 ||
                            !values.taskType ||
                            (values.taskType && !values.subTaskType) ||
                            !values.hoursSpent
                          }
                        >
                          Update
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Add the combined line chart */}
      </div>
      <AlertDialog
        motionPreset="slideInRight"
        isOpen={isConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleConfirmationClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleConfirmationClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                onClick={handleConfirmationDelete}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AllUsersTaskData;
