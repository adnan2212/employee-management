import { Link } from "react-router-dom";

import { Home32Filled, PeopleTeam32Regular } from "@ricons/fluent";
import { CalendarMonthOutlined } from "@ricons/material";
import { UserAvatarFilledAlt } from "@ricons/carbon";

import { Icon } from "@ricons/utils";
import Home from "../assets/img/Home.svg";
import calender from "../assets/img/calender.svg";
import message from "../assets/img/message.svg";
import profile from "../assets/img/profile.svg";
import team from "../assets/img/team.svg";
import Popup from "./PopUp";

const Footer = () => {
  return (
    <div className="">
      <div className="mt-6 flex h-24 items-center justify-around border-t-2 px-5  ">
        <Link to="/" className="flex w-8  flex-col items-center">
          <div className="  flex scale-100 flex-col items-center transition-transform duration-[250ms] ">
            <Icon color="red" size="30">
              <Home32Filled />
            </Icon>
            <p className=" text-slate-500">Home</p>
          </div>
        </Link>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="  flex scale-100 flex-col items-center transition-transform duration-[250ms] ">
              <Icon color="grey" size="30">
                <PeopleTeam32Regular />
              </Icon>
              <p className="text-slate-500 ">Team</p>
            </div>
          </Link>
        </span>
        <Popup />

        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="  flex scale-100 flex-col items-center transition-transform duration-[250ms] ">
              <Icon color="grey" size="30">
                <CalendarMonthOutlined />
              </Icon>
              <p className="text-slate-500 ">Calendar</p>
            </div>
          </Link>
        </span>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="  flex scale-100 flex-col items-center transition-transform duration-[250ms] ">
              <Icon color="grey" size="30">
                <UserAvatarFilledAlt />
              </Icon>
              <p className=" text-slate-500">Profile</p>
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
