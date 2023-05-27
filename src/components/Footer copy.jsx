import { Link } from "react-router-dom";
import Home from "../assets/img/Home.svg";
import calender from "../assets/img/calender.svg";
import message from "../assets/img/message.svg";
import profile from "../assets/img/profile.svg";
import team from "../assets/img/team.svg";

const Footer = () => {
  return (
    <div>
      <div className="content-container rounded-full  ">
        <Link to="/form">
          <div className="plus-button"></div>
        </Link>
      </div>
      <div className=" mb-1  flex h-24 items-center justify-around rounded-t-3xl bg-[#938DC2] p-14 pt-20">
        <Link to="/" className="flex w-8  flex-col items-center">
          <img src={Home} className="" />
          <p className="scale-100 transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms] ">
            Home
          </p>
        </Link>
        <span className="flex w-8 flex-col items-center">
          <img src={team} />
          <p className="scale-100 transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms] ">
            Team
          </p>
        </span>
        <span className="flex w-8 flex-col items-center">
          <img src={message} />
          <p className="scale-100 transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms] ">
            Message
          </p>
        </span>
        <span className="flex w-8 flex-col items-center">
          <img src={calender} />
          <p className="scale-100 transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms] ">
            Calender
          </p>
        </span>
        <span className="flex w-8 flex-col items-center">
          <img src={profile} />
          <p className="scale-100 transition-transform duration-[250ms] hover:scale-[1.15] hover:transition-all hover:duration-[250ms] focus:scale-[1.15] focus:transition-all focus:duration-[250ms] ">
            Profile
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
