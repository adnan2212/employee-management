import { Link } from "react-router-dom";
import Box from "../components/Box";
import { useState, useEffect } from "react";
import useContent from "../hooks/useContent";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ProjectContainer = () => {
  const { auth } = useContent();
  const axiosPrivate = useAxiosPrivate();

  const TASK_URL = "/tasks";
  useEffect(() => {
    const fetchData = async (date) => {
      try {
        

        const response = await axiosPrivate.get(TASK_URL);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  const productionKPI = ProductionHours * 0.9375 || 0;
  const nonProductionKPI = Non-Production Hours * 0.64375 || 0;

  calculate AnnualKPI , QuaterKPI, HalfYearlyKPI from data
  and console log it


  return (
    <div className="mt-1 flex shrink-0 flex-col px-10 py-5 md:items-center">
      <Link to="/projects">
        <button className="ml-6 mt-4 text-lg font-bold text-black md:text-center">
          Projects
        </button>
      </Link>
      <div className="flex flex-row flex-wrap justify-center lg:flex-wrap-reverse">
        <Box className="" title={"Annual"} content={30} />
        <Box title={"Quater"} content={15} />
        <Box
          className="flex justify-between"
          title={"Half Yearly"}
          content={38}
        />
      </div>
    </div>
  );
};

export default ProjectContainer;
