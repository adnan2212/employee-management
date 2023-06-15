import { Link } from "react-router-dom";
import Box from "../components/Box";
import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "axios";

const ProjectContainer = ({ selectedDate, dailyAllKPI }) => {
  const { auth, getUserTaskData } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const TASK_URL = "/tasks";
  const KPI_PRODUCTOIN_VAL = 0.9375;
  const KPI_NON_PRODUCTOIN_VAL = 0.64375;
  console.log("getUserTaskData : ", getUserTaskData);

  const [annualKPI, setAnnualKPI] = useState(null); // State variable for annualKPI
  const [halfYearlyKPI, setHalfYearlyKPI] = useState(null); // State variable for halfYearlyKPI
  const [quarterKPI, setQuarterKPI] = useState(null); // State variable for quarterKPI
  const [productionHalfYearlyKPI, setProductionHalfYearlyKPI] = useState(null); // State variable for productionHalfYearlyKPI
  const [nonproductionHalfYearlyKPI, setNonproductionHalfYearlyKPI] =
    useState(null); // State variable for nonproductionHalfYearlyKPI
  const [productionQuarterKPI, setProductionQuarterKPI] = useState(null); // State variable for productionQuarterKPI
  const [nonProductionQuarterKPI, setNonProductionQuarterKPI] = useState(null); // State variable for nonProductionQuarterKPI

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(TASK_URL);
        console.log(response.data);

        // Calculate Production KPI
        const productionKPI = response.data.reduce((total, task) => {
          if (task.taskType === "Production") {
            return total + task.hoursSpent * KPI_PRODUCTOIN_VAL;
          } else {
            return total;
          }
        }, 0);

        // Calculate Non-Production KPI
        const nonProductionKPI = response.data.reduce((total, task) => {
          if (task.taskType === "Non-Production") {
            return total + task.hoursSpent * KPI_NON_PRODUCTOIN_VAL;
          } else {
            return total;
          }
        }, 0);

        // Calculate Annual KPI
        const calculatedAnnualKPI = productionKPI + nonProductionKPI;
        setAnnualKPI(calculatedAnnualKPI); // Update the state

        // Print the results
        console.log("Production KPI:", productionKPI);
        console.log("Non-Production KPI:", nonProductionKPI);
        console.log("Annual KPI:", calculatedAnnualKPI);

        // Calculate QuarterKPI
        const quarterKPI = response.data.reduce((total, task) => {
          if (task.taskType === "Production" && isWithinQuarter(task.date)) {
            return total + task.hoursSpent * KPI_PRODUCTOIN_VAL;
          }
          return total;
        }, 0);
        setQuarterKPI(quarterKPI); // Update the state
        console.log("QuarterKPI:", quarterKPI);

        // Calculate HalfYearlyKPI
        const productionHalfYearlyKPI = response.data.reduce((total, task) => {
          if (task.taskType === "Production" && isWithinHalfYear(task.date)) {
            return total + task.hoursSpent * KPI_PRODUCTOIN_VAL;
          }
          return total;
        }, 0);
        setProductionHalfYearlyKPI(productionHalfYearlyKPI); // Update the state
        const nonproductionHalfYearlyKPI = response.data.reduce(
          (total, task) => {
            if (
              task.taskType === "Non-Production" &&
              isWithinHalfYear(task.date)
            ) {
              return total + task.hoursSpent * KPI_NON_PRODUCTOIN_VAL;
            }
            return total;
          },
          0
        );
        setNonproductionHalfYearlyKPI(nonproductionHalfYearlyKPI); // Update the state
        const calculatedHalfYearlyKPI =
          productionHalfYearlyKPI + nonproductionHalfYearlyKPI;
        setHalfYearlyKPI(calculatedHalfYearlyKPI); // Update the state
        console.log("Production HalfYearlyKPI:", productionHalfYearlyKPI);
        console.log(
          "Non-Production HalfYearlyKPI:",
          nonproductionHalfYearlyKPI
        );
        console.log("HalfYearlyKPI:", calculatedHalfYearlyKPI);

        // Calculate Production QuarterKPI
        const productionQuarterKPI = response.data.reduce((total, task) => {
          if (task.taskType === "Production" && isWithinQuarter(task.date)) {
            return total + task.hoursSpent * KPI_PRODUCTOIN_VAL;
          }
          return total;
        }, 0);
        setProductionQuarterKPI(productionQuarterKPI); // Update the state

        // Calculate Non-Production QuarterKPI
        const nonProductionQuarterKPI = response.data.reduce((total, task) => {
          if (
            task.taskType === "Non-Production" &&
            isWithinQuarter(task.date)
          ) {
            return total + task.hoursSpent * KPI_NON_PRODUCTOIN_VAL;
          }
          return total;
        }, 0);
        setNonProductionQuarterKPI(nonProductionQuarterKPI); // Update the state

        const calculatedQuarterKPI =
          productionQuarterKPI + nonProductionQuarterKPI;
        setQuarterKPI(calculatedQuarterKPI); // Update the state
        console.log("Production QuarterKPI:", productionQuarterKPI);
        console.log("Non-Production QuarterKPI:", nonProductionQuarterKPI);
        console.log("QuarterKPI:", calculatedQuarterKPI);
      } catch (err) {
        console.error(err);
      }
    };
    if (selectedDate) {
      // If a selectedDate prop is provided, fetch data for the selected date
      fetchData(selectedDate);
    } else {
      // If no selectedDate prop is provided, fetch data for today's date
      fetchData(selectedDate);

      console.log(selectedDate);
    }
  }, [selectedDate, getUserTaskData]);

  const isWithinQuarter = (date) => {
    const currentDate = new Date(); // Get the current date
    const currentQuarter = Math.floor((currentDate.getMonth() + 3) / 3); // Calculate the current quarter

    // Convert the given date string to a Date object
    const givenDate = new Date(date);
    const givenQuarter = Math.floor((givenDate.getMonth() + 3) / 3); // Calculate the quarter for the given date

    // Check if the given date falls within the current quarter
    return (
      givenQuarter === currentQuarter &&
      givenDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const isWithinHalfYear = (date) => {
    const currentDate = new Date(); // Get the current date
    const sixMonthsAgo = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 6,
      currentDate.getDate()
    );

    // Convert the given date string to a Date object
    const givenDate = new Date(date);

    // Check if the given date falls within the last six months
    return givenDate >= sixMonthsAgo && givenDate <= currentDate;
  };

  return (
    <div className="flex shrink-0 flex-col py-5 md:items-center">
      <Link to="/projects ">
        <button className="mb-5 px-10 text-lg font-bold text-[#0D1829] md:text-center">
          Projects
        </button>
      </Link>
      <div className="flex flex-row flex-wrap justify-center lg:flex-wrap-reverse">
        {annualKPI !== null && (
          <Box className="" title={"Annual"} content={Math.floor(annualKPI)} />
        )}

        {halfYearlyKPI !== null && (
          <Box
            className="flex justify-between "
            title={"Half Yearly"}
            content={Math.floor(halfYearlyKPI)} // Display only the integer part of halfYearlyKPI
          />
        )}
        {quarterKPI !== null && (
          <Box
            className=""
            title={"Quarter"}
            content={Math.floor(quarterKPI)}
          />
        )}
        <Box
          title={"KPI Acheived"}
          content={dailyAllKPI}
          content2={7.5}
          className="flex justify-end"
        />
      </div>
    </div>
  );
};

export default ProjectContainer;
