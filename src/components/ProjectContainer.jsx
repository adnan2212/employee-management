import { Link } from "react-router-dom";
import Box from "../components/Box";

const ProjectContainer = () => {
  return (
    <div className="  flex shrink-0 flex-col pb-8     md:items-center">
      <Link to="/projects">
        <button className=" ml-11 mt-10 p-2 text-lg font-bold text-black md:text-center">
          Projects
        </button>
      </Link>
      <div className="mt-3 flex flex-row flex-wrap justify-center lg:flex-wrap-reverse">
        <Box className="" title={"Annual"} content={30} />
        <Box title={"Quater"} content={15} />
        <Box
          className="flex justify-between"
          title={"Half Yearly"}
          content={38}
        />
        <Box
          title={"KPI Acheived"}
          content={7.3}
          content2={7.5}
          className="flex justify-end"
        />
      </div>
    </div>
  );
};

export default ProjectContainer;
