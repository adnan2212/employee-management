import React, { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import axios from "../api/axios";
import { Icon } from "@ricons/utils";
import { FileUploadSharp } from "@ricons/material";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell
} from "@windmill/react-ui";
import { useToast } from "@chakra-ui/react";
import ExcelJS from "exceljs";

const ALL_USERS_DATA = "/tasks/details";

const AlliedChecker = () => {
  const { auth, getUserTaskData } = useContent();
  const [alliedData, setAlliedData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const token = auth?.accessToken;
  const toast = useToast();
  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await axios.get(ALL_USERS_DATA, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("Allied Checker ->>>", response.data);
        setAlliedData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsersData();
  }, [getUserTaskData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const uniqueIds = [...new Set(alliedData.map((item) => item.userId))];

  const monthlyData = {};

  alliedData.forEach(({ date, userId, hoursSpent }) => {
    const currentDate = new Date(date);
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (currentMonth === selectedMonth && currentYear === selectedYear) {
      if (!monthlyData[userId]) {
        monthlyData[userId] = {};
      }
      const formattedDate = formatDate(date);
      monthlyData[userId][formattedDate] =
        (monthlyData[userId][formattedDate] || 0) + hoursSpent;
    }
  });

  const startDate = new Date(selectedYear, selectedMonth - 1, 1);
  const endDate = new Date(selectedYear, selectedMonth, 0);
  const datesOfMonth = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesOfMonth.push(formatDate(date));
  }

  const handleMonthYearChange = (event) => {
    const { value } = event.target;
    const [year, month] = value.split("-");
    setSelectedMonth(Number(month));
    setSelectedYear(Number(year));
  };

  const options = [];
  for (let year = 2022; year <= 2024; year++) {
    for (let month = 1; month <= 12; month++) {
      options.push(
        <option
          key={`${year}-${month.toString().padStart(2, "0")}`}
          value={`${year}-${month.toString().padStart(2, "0")}`}
        >
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}
        </option>
      );
    }
  }

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
      const excelRow = worksheet.getRow(rowIndex + 1); // Create a new row
      const cells = row.getElementsByTagName("td");
      Array.from(cells).forEach((cell, cellIndex) => {
        if (cellIndex === cells.length) {
          return;
        }

        const value = cell.innerText;
        const excelCell = excelRow.getCell(cellIndex + 1); // Use the new row to create cells
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
        const excelColumnWidth = Math.ceil(columnWidth * 1.1);
        column.width = excelColumnWidth;
      });

      worksheet.getRow(rowIndex + 1).height = 30; // Set row height to 30 (adjust as needed)
      worksheet
        .getRow(rowIndex + 1)
        .eachCell({ includeEmpty: true }, (cell) => {
          cell.alignment = cellStyle.alignment;
        });
    });

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
      description: "The Allied Sheet has been downloaded.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
  }

  return (
    <div className="mb-16 overflow-x-auto">
      <h2 className="m-8 mb-4 text-center text-2xl font-bold">
        Allied Checker Sheet
      </h2>
      <div className="mx-4 my-5 sm:overflow-hidden sm:rounded-lg sm:border-b sm:border-gray-400 sm:shadow lg:mx-32">
        <div className="m-8 flex justify-center">
          <select
            className="rounded-md border border-gray-300 px-4 py-2"
            value={`${selectedYear}-${selectedMonth
              .toString()
              .padStart(2, "0")}`}
            onChange={handleMonthYearChange}
          >
            {options}
          </select>
        </div>
        <div className="table-container">
          <TableContainer className="min-w-full sm:overflow-hidden sm:rounded-lg sm:border-b sm:border-gray-400 sm:shadow">
            <Table className="min-w-full" id="tableId">
              <TableHeader className="bg-gray-500 text-gray-800">
                <TableRow className="text-center font-bold sm:text-base">
                  <TableCell className="sticky left-0 bg-blue-100 sm:px-4">
                    Name
                  </TableCell>
                  {datesOfMonth.map((date) => (
                    <TableCell
                      key={date}
                      className={`sm:px-4  ${
                        isWeekend(date) ? "bg-green-200" : ""
                      }`}
                    >
                      {new Date(date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit"
                      })}{" "}
                      ({getDayOfWeek(date)})
                    </TableCell>
                  ))}
                  <TableCell className="bg-blue-100 sm:px-4">
                    Total Hours
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="text-center">
                {uniqueIds.map((userId, index) => (
                  <TableRow key={userId}>
                    <TableCell
                      className={`sticky left-0 bg-blue-100 sm:px-4 ${
                        index % 2 === 0 ? " bg-gray-100" : ""
                      }`}
                    >
                      {alliedData
                        .find((item) => item.userId === userId)
                        .userName.charAt(0)
                        .toUpperCase() +
                        alliedData
                          .find((item) => item.userId === userId)
                          .userName.slice(1)}
                    </TableCell>
                    {datesOfMonth.map((date) => (
                      <TableCell
                        key={date}
                        className={` ${isWeekend(date) ? "bg-green-100" : ""} ${
                          index % 2 === 0 ? " bg-gray-100" : ""
                        }`}
                      >
                        {monthlyData[userId] && monthlyData[userId][date]
                          ? `${monthlyData[userId][date]} Hr`
                          : "0 Hr"}
                      </TableCell>
                    ))}
                    <TableCell
                      className={`bg-blue-100 font-bold ${
                        index % 2 === 0 ? "bg-gray-100" : ""
                      }`}
                    >
                      {Object.values(monthlyData[userId] || {}).reduce(
                        (total, hours) => total + hours,
                        0
                      )}{" "}
                      Hr
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="border-t bg-gray-500 px-4 py-3 text-center text-gray-800">
          <button
            onClick={exportToExcel}
            className="flex scale-100 items-center justify-center gap-2 transition-all hover:scale-105"
          >
            <Icon color="#1F2937" size="30">
              <FileUploadSharp />
            </Icon>
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlliedChecker;
