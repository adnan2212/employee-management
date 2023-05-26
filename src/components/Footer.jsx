import { Link } from "react-router-dom";

import { Home32Filled, PeopleTeam32Regular } from "@ricons/fluent";
import { MessageOutlined, CalendarMonthOutlined } from "@ricons/material";
import { UserAvatarFilledAlt } from "@ricons/carbon";

import { Icon } from "@ricons/utils";

const Footer = () => {
  return (
    <div>
      <div className="content-container  rounded-full  ">
        <Link to="/form">
          <div className="plus-button"></div>
        </Link>
      </div>
      <div className=" footer mb-1 flex  h-24 items-center justify-around rounded-t-3xl bg-slate-100 p-14 pt-20 text-[#333]">
        <Link to="/" className="  flex w-8  flex-col items-center">
          <div className="f-button flex scale-100 flex-col items-center transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms]">
            <Icon color="red" size="30">
              <Home32Filled />
            </Icon>
            <p className=" ">Home</p>
          </div>
        </Link>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="f-button flex scale-100 flex-col items-center transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms]">
              <Icon color="#333" size="30">
                <PeopleTeam32Regular />
              </Icon>
              <p className=" ">Team</p>
            </div>
          </Link>
        </span>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="f-button flex scale-100 flex-col items-center transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms]">
              <Icon color="#333" size="30">
                <MessageOutlined />
              </Icon>
              <p className=" ">Messages</p>
            </div>
          </Link>
        </span>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="f-button flex scale-100 flex-col items-center transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms]">
              <Icon color="#333" size="30">
                <CalendarMonthOutlined />
              </Icon>
              <p className=" ">Calendar</p>
            </div>
          </Link>
        </span>
        <span className="flex w-8 flex-col items-center">
          <Link to="/" className="  flex w-8  flex-col items-center">
            <div className="f-button flex scale-100 flex-col items-center transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms]">
              <Icon color="#333" size="30">
                <UserAvatarFilledAlt />
              </Icon>
              <p className=" ">Profile</p>
            </div>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
