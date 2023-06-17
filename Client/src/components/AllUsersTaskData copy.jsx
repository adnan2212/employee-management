import React, { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import axios from "../api/axios";
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
import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const ALL_USERS_DATA = "/tasks/details";
const task_type = ["Production", "Non-Production"];
const sub_task_type = {
  Production: ["Audit", "Junking", "Coding"],
  "Non-Production": ["Meeting", "Client Handling", "Networking"]
};

const validationSchema = Yup.object({
  taskType: Yup.string().required("Task Type is required"),
  subTaskType: Yup.string().when("taskType", (taskType, schema) =>
    taskType ? schema.required("Sub Task Type is required") : schema.nullable()
  ),
  hoursSpent: Yup.number()
    .positive("Hours Spent must be a positive number")
    .required("Hours Spent is required")
});
const AllUsersTaskData = () => {
  const [data, setData] = useState([]);
  const { allUsersData, setAllUsersData, auth } = useContent();
  const token = auth?.accessToken;
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

  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await axios.get(ALL_USERS_DATA, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("ADMINallUserData ->>>", response.data);
        const sortedTaskData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setData(sortedTaskData);
        setAllUsersData(sortedTaskData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsersData();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (taskId) => {
    const task = allUsersData.find((task) => task._id === taskId);
    setSelectedTask(task);
    setIsPopupOpen(true);
    setInitialFormValues({
      taskType: task.taskType,
      subTaskType: task.subTaskType,
      hoursSpent: task.hoursSpent
    });

    onOpen();

    console.log("Edit Task ID:", taskId);
  };
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

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
      await axios.delete(`${ALL_USERS_DATA}/${deleteTaskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      setIsConfirmationOpen(false);
      setSuccessMessage("Task deleted successfully");
      toast({
        title: "Task Deleted",
        description: "The task has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true
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
      const response = await axios.put(
        `${ALL_USERS_DATA}/${selectedTask._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("Updated Task:", response.data);

      formikBag.resetForm();
      setSuccessMessage("Form Updated successfully!");
      const updatedTaskData = allUsersData.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            taskType: values.taskType,
            subTaskType: values.subTaskType,
            hoursSpent: values.hoursSpent
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
          isClosable: true
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
    hoursSpent: ""
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
        name: "Calibri"
      },
      border: {
        top: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "medium", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } }
      },
      alignment: { vertical: "middle", horizontal: "center" }
    };

    const cellStyle = {
      font: { color: { argb: "000000" }, size: 11 },
      fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFF" } },
      border: {
        top: { style: "thin", color: { argb: "D3D3D3" } },
        bottom: { style: "thin", color: { argb: "D3D3D3" } },
        left: { style: "thin", color: { argb: "D3D3D3" } },
        right: { style: "thin", color: { argb: "D3D3D3" } }
      },
      alignment: { vertical: "middle", horizontal: "center", wrapText: true }
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
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
      isClosable: true
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>User ID</th>
          <th>User Name</th>
          <th>Task Type</th>
          <th>Subtask Type</th>
          <th>Hours Spent</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.hoursSpent}</td>
            <td>{item.subTaskType}</td>
            <td>{item.taskType}</td>
            <td>{item.userId}</td>
            <td>{item.userName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AllUsersTaskData;
