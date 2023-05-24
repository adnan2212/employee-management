import DatePicker from "react-horizontal-datepicker";
// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

/* ICONS */
import { ArrowForwardOutlined } from "@ricons/material";
import { CheckboxIndeterminate16Regular } from "@ricons/fluent";
import { Icon } from "@ricons/utils";

// import Calender from "../assests/img/Calender.svg";
import Calender from "../assets/img/Calender.svg";
import Box from "../components/Box";
import Header from "../Components/header";
import HourSheet from "../Components/HourSheet";

const firstPage = () => {
  const percentage = 90;
  const percentage2 = 66;
  const sum = percentage + percentage2 / 200;

  const selectedDay = (val) => {
    console.log(val);
  };

  return (
    <>
      <Header userName={"Rajesh Mehta"} />
      {/* DATE PICKER */}
      <h1 className="ml-4 pt-4 text-lg font-bold text-[#0D1829]">
        Select date
      </h1>
      <div className="m-5">
        <DatePicker
          getSelectedDay={selectedDay}
          endDate={5}
          selectDate={new Date("2020-04-30")}
          labelFormat={"MMMM"}
          color={"#2051E5"}
        />
      </div>

      <div className="shrink-0">
        <Link to="/projects">
          <h1 className="ml-4 pt-4 text-lg font-bold text-[#0D1829]">
            Projects
          </h1>
        </Link>
        <div className="flex flex-row flex-wrap lg:flex-wrap-reverse">
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

      {/* EFFICIENCY */}
      <div className="">
        <h1 className="ml-4  pt-4 text-lg font-bold text-[#0D1829]">
          Efficiency
        </h1>

        <div className="m-4 mr-7 flex h-44 gap-2 rounded-xl bg-[#EEF2FF]">
          <div className="">
            <div className="m-2 p-2 text-lg font-semibold">
              Candidate Efficiency
            </div>

            {/* <div className="w-34 h-32"> */}
            <div className="">
              <span className="flex items-center gap-3 pb-3 pl-4">
                <Icon color="#2051E5">
                  <CheckboxIndeterminate16Regular />
                </Icon>
                <p className="opacity-60">Production</p>
              </span>
              <span className="flex items-center gap-3 pl-4">
                <Icon color="#F77307">
                  <CheckboxIndeterminate16Regular />
                </Icon>
                <p className="opacity-60">Non-Production</p>
              </span>
            </div>
            <p className="ml-4 pt-4 text-sm font-medium text-[#0D1829]">
              Overall: 88%
            </p>
          </div>
          <div className="mt-11 flex flex-col items-center">
            <p className="text-xs">in Hrs</p>
            <p className="pb-3 opacity-60">7</p>
            <p className="opacity-60">1</p>
          </div>
          <div className="ml-7 mt-8 ">
            <div className="w-16">
              <div className="ml-4">
                <CircularProgressbarWithChildren
                  value={sum}
                  styles={buildStyles({
                    pathColor: "#F77307",
                    trailColor: "#eee",
                    strokeLinecap: "butt"
                  })}
                >
                  {/* Foreground path */}
                  <CircularProgressbar
                    value={percentage2}
                    text={`${sum}%`}
                    styles={buildStyles({
                      trailColor: "transparent",
                      strokeLinecap: "butt"
                    })}
                  />
                </CircularProgressbarWithChildren>
              </div>
              <div className="mt-9 flex flex-col items-center">
                <p className=" mb-1 text-xs opacity-60">Due Date</p>
                <div className="flex gap-2 whitespace-nowrap font-medium">
                  <img src={Calender} />
                  <p className="text-xs font-medium opacity-90">June 6, 2022</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HourSheet />
    </>
  );
};

export default firstPage;
