import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { CheckboxIndeterminate16Regular } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import { CalendarMonthOutlined } from "@ricons/material";
import { CalendarMonthOutlined } from "@ricons/material";

import Header from "../Components/header";
import HourSheet from "../Components/HourSheet";
import Footer from "../components/Footer";

import ReactHorizontalDatePicker from "react-horizontal-strip-datepicker";
import "react-horizontal-strip-datepicker/dist/ReactHorizontalDatePicker.css";
import ProjectContainer from "../components/ProjectContainer";

const FirstPage = () => {
  const percentage = 90;
  const percentage2 = 66;
  const sum = percentage + percentage2 / 200;

  return (
    <>
      <Logo />
      <Header userName={"Rajesh Mehta"} />

      {/* DATE PICKER */}
      <Calendars />

      <ProjectContainer />

      <div className="mb-[-8rem]  shrink-0   px-10 pb-32 md:flex md:justify-evenly md:pt-2">
        {/* EFFICIENCY */}
        <div className=" ">
          <h1 className="     text-lg font-bold text-[#0D1829] md:text-center">
            Efficiency
          </h1>

          <div className="  flex justify-center  px-12 ">
            <div className=" m-4 flex h-[160px] min-w-[374px] scale-100 justify-around gap-2 rounded-xl bg-[#EEF2FF]   ">
              <div className=" ">
                <div className="ml-1 mt-[5px]  p-2 text-sm font-medium ">
                  Candidate Efficiency
                </div>

                {/* <div className="w-34 h-32"> */}
                <div className=" pt-[9px]">
                  <span className="flex items-center gap-5 pb-2 pl-6">
                    <Icon color="#2051E5">
                      <CheckboxIndeterminate16Regular />
                    </Icon>
                    <p className="opacity-60">Production</p>
                  </span>
                  <span className="flex items-center gap-5 pl-6">
                    <Icon color="#F77307">
                      <CheckboxIndeterminate16Regular />
                    </Icon>
                    <p className="opacity-60">Non-Production</p>
                  </span>
                </div>
                <p className="ml-4 pt-6 text-sm font-medium text-[#0D1829]">
                  Overall: 88%
                </p>
              </div>
              <div className="mt-[34px] flex flex-col items-center">
                <p className="text-xs">in Hrs</p>
                <p className="pb-2 opacity-60">5</p>
                <p className="opacity-60">3</p>
              </div>
              <div className="mr-7 mt-6 ">
                <div className="w-16">
                  <div className="ml-4">
                    <CircularProgressbarWithChildren
                      value={sum}
                      styles={buildStyles({
                        pathColor: "#F77307",
                        trailColor: "#eee",
                        strokeLinecap: "butt",
                      })}
                    >
                      {/* Foreground path */}
                      <CircularProgressbar
                        value={percentage2}
                        text={`${88}%`} // render `${sum}%`
                        styles={buildStyles({
                          trailColor: "transparent",
                          strokeLinecap: "butt",
                        })}
                      />
                    </CircularProgressbarWithChildren>
                  </div>
                  <div className="mr-3 mt-7 flex flex-col items-center  ">
                    <p className="  whitespace-nowrap text-xs font-normal opacity-60">
                      Due Date
                    </p>
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

        <HourSheet />
      </div>
      <Footer />
    </>
  );
};

export default FirstPage;
export default FirstPage;
