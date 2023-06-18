import { Link } from "react-router-dom";
import { Home32Filled, PeopleTeam32Regular } from "@ricons/fluent";
import { CalendarMonthOutlined, DataObjectRound } from "@ricons/material";
import { UserAvatarFilledAlt, Report } from "@ricons/carbon";
import { Icon } from "@ricons/utils";
import { useState } from "react";

import Popup from "./PopUp";

const Footer = (props) => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setTimeout(() => {
      setActiveLink(null);
    }, 250);
  };

  return (
    <div className="">
      <div className="mt-10 flex items-center justify-around rounded-t-3xl border-t-2 bg-gray-800 px-5 pb-4 pt-7">
        <Link
          to="/"
          className={`flex w-8 flex-col items-center  ${
            activeLink === "/" ? "active" : ""
          }`}
          onClick={() => handleLinkClick("/")}
        >
          <div
            className={`duration-250 flex transform-gpu flex-col items-center transition-transform ${
              activeLink === "/" ? "animate-bounce" : ""
            }`}
          >
            <Icon color="white" size="30">
              <Home32Filled />
            </Icon>
            <p className=" text-gray-300  ">Home</p>
          </div>
        </Link>

        <span className=" flex w-8 flex-col items-center pl-3">
          <Link
            to="/projects"
            className={`flex w-8 flex-col items-center ${
              activeLink === "/projects" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/projects")}
          >
            <div
              className={`duration-250 flex transform-gpu flex-col items-center transition-transform ${
                activeLink === "/projects" ? "animate-bounce" : ""
              }`}
            >
              <Icon color="#D1D5DB" size="30">
                <PeopleTeam32Regular />
              </Icon>
              <p className="text-gray-300">Team</p>
            </div>
          </Link>
        </span>

        <span className="mb-3 rounded-full bg-gradient-to-r from-blue-800  to-indigo-900">
          <Popup
            formSubmitted={props.formSubmitted}
            setFormSubmitted={props.setFormSubmitted}
          />
        </span>

        <span className=" flex w-8 flex-col items-center">
          <Link
            to="/"
            className={`flex w-8 flex-col items-center ${
              activeLink === "/calendar" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/calendar")}
          >
            <div
              className={`duration-250 flex transform-gpu flex-col items-center transition-transform ${
                activeLink === "/calendar" ? "animate-bounce" : ""
              }`}
            >
              <Icon color="#D1D5DB" size="30">
                <CalendarMonthOutlined />
              </Icon>
              <p className="text-gray-300">Calendar</p>
            </div>
          </Link>
        </span>

        <span className="flex w-8 flex-col items-center ">
          <Link
            to="/yourTaskData"
            className={`flex w-8 flex-col items-center ${
              activeLink === "/yourTaskData" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("/yourTaskData")}
          >
            <div
              className={`duration-250 flex transform-gpu flex-col items-center transition-transform ${
                activeLink === "/yourTaskData" ? "animate-bounce" : ""
              }`}
            >
              <Icon color="#D1D5DB" size="30">
                <Report />
              </Icon>
              <p className="text-gray-300">Reports</p>
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
