import { Link } from "react-router-dom";
import { ArrowForwardOutlined } from "@ricons/material";
import Box from "../components/Box";

const ProjectContainer = () => {
  return (
    <div className=" project-container flex shrink-0 flex-col items-center justify-center  pb-[68px]">
      <Link to="/projects">
        <button className="txt-btn ml-4 mt-10 p-2 text-lg font-bold text-white md:text-center">
          Projects
        </button>
      </Link>
      <div className="mt-3 flex flex-row flex-wrap justify-center lg:flex-wrap-reverse">
        <Box title={"Annual"} content={30} />
        <Box
          title={"Quater"}
          content={"In process"}
          iconName={<ArrowForwardOutlined />}
          iconSize={22}
        />
        <Box
          className="flex justify-between"
          title={"Half Yearly"}
          content={"Go to task"}
          iconName={<ArrowForwardOutlined />}
          iconSize={22}
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
