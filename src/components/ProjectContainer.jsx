import { Link } from "react-router-dom";
import { ArrowForwardOutlined } from "@ricons/material";
import Box from "../components/Box";

const ProjectContainer = () => {
  return (
    <div className=" shrink-0  rounded-3xl bg-[#65FBD2]  pb-20">
      <Link to="/projects">
        <h1 className="ml-4 p-10 text-lg font-bold text-[#0D1829] md:text-center">
          Projects
        </h1>
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
          content={"7.3/7.50"}
          className="flex justify-end"
        />
      </div>
    </div>
  );
};

export default ProjectContainer;
