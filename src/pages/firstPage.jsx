import Logo from "../components/Logo";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

/* ICONS */
import { CheckboxIndeterminate16Regular } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { CalendarMonthOutlined } from "@ricons/material";

import Calender from "../assets/img/Calender.svg";
import Header from "../Components/header";
import HourSheet from "../Components/HourSheet";
import Footer from "../components/Footer";
import Calendars from "../components/Calenders";

import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import ProjectContainer from "../components/ProjectContainer";

const firstPage = () => {
  const percentage = 90;
  const percentage2 = 66;
  const sum = percentage + percentage2 / 200;

  const onSelectedDay = (d) => {
    console.log(d);
  };

  return (
    <>
      <Logo />
      <Header userName={"Rajesh Mehta"} />

      {/* DATE PICKER */}
      <Calendars />

      <ProjectContainer />
      {/* ------- */}

      <div className="mb-[-6rem]  shrink-0   p-10 pb-32 md:flex md:justify-evenly md:pt-12">
        {/* EFFICIENCY */}
        <div className=" ">
          <h1 className="  ml-4 pt-4 text-lg font-bold text-[#0D1829] md:text-center">
            Efficiency
          </h1>

          <div className=" flex justify-center px-10  ">
            <div className=" m-4  flex h-44 min-w-[350px] scale-100 gap-2 rounded-xl bg-[#EEF2FF] shadow-lg  hover:scale-110 hover:shadow-2xl ">
              <div className=" ">
                <div className="m-2 flex items-center justify-center p-2 text-lg font-semibold ">
                  Candidate Efficiency
                </div>

                {/* <div className="w-34 h-32"> */}
                <div className="">
                  <span className="flex items-center gap-3 pb-1 pl-4">
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
                <p className="pb-3 opacity-60">5</p>
                <p className="opacity-60">3</p>
              </div>
              <div className="mr-5 mt-8 ">
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
                        text={`${88}%`} // render `${sum}%`
                        styles={buildStyles({
                          trailColor: "transparent",
                          strokeLinecap: "butt"
                        })}
                      />
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="mr-3 mt-10 flex flex-col items-center ">
                    <p className=" mb-1 text-xs opacity-60">Due Date</p>
                    <div className="flex items-center gap-2 whitespace-nowrap font-medium">
                      <Icon color="#333" size="30">
                        <CalendarMonthOutlined />
                      </Icon>
                      <p className="text-xs font-medium opacity-90">
                        June 6, 2022
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ------ */}
        <HourSheet />
      </div>
      <Footer />
    </>
  );
};

export default firstPage;
