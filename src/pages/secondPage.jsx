import Vector from "../assets/img/Vector.png";
// import Search from "../assets/img/Search.svg";

import IMG from "../assets/img/p2.jpeg";
import IMG2 from "../assets/img/p4.jpeg";
import IMG3 from "../assets/img/p5.jpeg";
// import IMG4 from "../assets/img/p6.jpeg";
import IMG5 from "../assets/img/p7.jpeg";

import { Link } from "react-router-dom";

import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// import Calender from "../assests/img/Calender.svg";
import Calender from "../assets/img/calender.svg";
import SearchBar from "../components/SearchBar";

const secondPage = () => {
  const percentage = 80;
  const percentage2 = 60;
  const sum = percentage + percentage2 / 200;
  return (
    <>
      <div className="flex h-32 items-center justify-between rounded-b-2xl bg-[#2051E5] p-2 pb-0">
        <div></div>
        <img className="absolute left-0 top-0" src={Vector} />
        <div className="fixed inset-x-0 flex items-center justify-center text-white">
          <p className="font-sans text-2xl font-semibold">Projects</p>
        </div>
        <div className="flex pt-5">
          <span className="mr-3">
            <SearchBar />
          </span>
        </div>
      </div>

      {/* 1 */}
      <div className="m-4   flex h-48 gap-2 rounded-xl bg-[#EEF2FF] ">
        <div className=" flex items-center justify-center">
          <div className="">
            <div className="left m-2 p-2">
              <p className="text-lg font-semibold">Intercom</p>
              <p className="text-sm font-normal">Digital Product Design</p>
            </div>
            <div className="ml-5 flex items-center justify-between gap-20">
              <div className=" relative flex flex-col content-start items-start text-sm font-normal">
                <p className="">Team</p>
                <div className="absolute left-1 top-2 p-5">
                  <img
                    className="absolute left-0 z-0 inline-block h-7 w-7 rounded-full"
                    src={IMG}
                  />
                  <img
                    className="absolute left-5 z-10 inline-block h-7 w-7 rounded-full"
                    src={IMG2}
                  />
                  <img
                    className="absolute left-10 z-20 inline-block h-7 w-7 rounded-full"
                    src={IMG5}
                  />
                  <img
                    className="absolute left-16 z-30 inline-block h-7 w-7 rounded-full"
                    src={IMG3}
                  />
                </div>
              </div>
              <div>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className=" mb-1 text-xs opacity-60">Due Date</p>
                  <div className="flex gap-2 whitespace-nowrap font-medium">
                    <img src={Calender} />
                    <p className="text-xs font-medium opacity-90">
                      June 6, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-10 mt-6 ">
          <div className="w-24">
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
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="m-4   flex h-48 gap-2 rounded-xl bg-gradient-to-r from-green-100 to-blue-300 ">
        <div className=" flex items-center justify-center">
          <div className="">
            <div className="left m-2 p-2">
              <p className="text-lg font-semibold">Intercom</p>
              <p className="text-sm font-normal">Digital Product Design</p>
            </div>
            <div className="ml-5 flex items-center justify-between gap-20">
              <div className=" relative flex flex-col content-start items-start text-sm font-normal">
                <p className="">Team</p>
                <div className="absolute left-1 top-2 p-5">
                  <img
                    className="absolute left-0 z-0 inline-block h-7 w-7 rounded-full"
                    src={IMG}
                  />
                  <img
                    className="absolute left-5 z-10 inline-block h-7 w-7 rounded-full"
                    src={IMG2}
                  />
                  <img
                    className="absolute left-10 z-20 inline-block h-7 w-7 rounded-full"
                    src={IMG5}
                  />
                  <img
                    className="absolute left-16 z-30 inline-block h-7 w-7 rounded-full"
                    src={IMG3}
                  />
                </div>
              </div>
              <div>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className=" mb-1 text-xs opacity-60">Due Date</p>
                  <div className="flex gap-2 whitespace-nowrap font-medium">
                    <img src={Calender} />
                    <p className="text-xs font-medium opacity-90">
                      June 6, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-10 mt-6 ">
          <div className="w-24">
            <div className="ml-4">
              <CircularProgressbarWithChildren
                value={65}
                styles={buildStyles({
                  pathColor: "#F77307",
                  trailColor: "#eee",
                  strokeLinecap: "butt"
                })}
              >
                {/* Foreground path */}
                <CircularProgressbar
                  value={58}
                  text={`${58}%`}
                  styles={buildStyles({
                    trailColor: "transparent",
                    strokeLinecap: "butt"
                  })}
                />
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="m-4   flex h-48 gap-2 rounded-xl bg-gradient-to-r from-orange-100 to-blue-100 ">
        <div className=" flex items-center justify-center">
          <div className="">
            <div className="left m-2 p-2">
              <p className="text-lg font-semibold">Intercom</p>
              <p className="text-sm font-normal">Digital Product Design</p>
            </div>
            <div className="ml-5 flex items-center justify-between gap-20">
              <div className=" relative flex flex-col content-start items-start text-sm font-normal">
                <p className="">Team</p>
                <div className="absolute left-1 top-2 p-5">
                  <img
                    className="absolute left-0 z-0 inline-block h-7 w-7 rounded-full"
                    src={IMG}
                  />
                  <img
                    className="absolute left-5 z-10 inline-block h-7 w-7 rounded-full"
                    src={IMG2}
                  />
                  <img
                    className="absolute left-10 z-20 inline-block h-7 w-7 rounded-full"
                    src={IMG5}
                  />
                  <img
                    className="absolute left-16 z-30 inline-block h-7 w-7 rounded-full"
                    src={IMG3}
                  />
                </div>
              </div>
              <div>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <p className=" mb-1 text-xs opacity-60">Due Date</p>
                  <div className="flex gap-2 whitespace-nowrap font-medium">
                    <img src={Calender} />
                    <p className="text-xs font-medium opacity-90">
                      June 6, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mr-10 mt-6 ">
          <div className="w-24">
            <div className="ml-4">
              <CircularProgressbarWithChildren
                value={33}
                styles={buildStyles({
                  pathColor: "#F77307",
                  trailColor: "#eee",
                  strokeLinecap: "butt"
                })}
              >
                {/* Foreground path */}
                <CircularProgressbar
                  value={33}
                  text={`${33}%`}
                  styles={buildStyles({
                    trailColor: "transparent",
                    strokeLinecap: "butt"
                  })}
                />
              </CircularProgressbarWithChildren>
            </div>
          </div>
        </div>
      </div>
      <Link to="/">
        <h1 className="ml-4 cursor-pointer p-4 text-lg font-bold text-blue-300 underline">
          Go Back
        </h1>
      </Link>
    </>
  );
};

export default secondPage;
