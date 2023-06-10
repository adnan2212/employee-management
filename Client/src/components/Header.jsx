import { MdNotificationsOutline } from "@ricons/ionicons4";
import { Icon } from "@ricons/utils";
import DropdownMenu from "./DropdownMenu";
import useContent from "../hooks/useContent";

const Header = ({ userName }) => {
  const { auth } = useContent();
  const user = auth.user;
  userName = user.charAt(0).toUpperCase() + user.slice(1);
  return (
    <div
      className="red-bg flex
    h-32 items-center justify-between rounded-b-2xl p-2 pb-0 "
    >
      <div className="main mt-3 p-5 pt-6 text-white">
        <h1 className="text-slate-100 ">
          <p className="main-heading-primary mb-2 font-sans text-xs font-light opacity-80">
            Hello,
          </p>
          {/*username classes : color-text main-heading-secondary */}
          <p className=" font-sans text-2xl  font-semibold">{userName}</p>
        </h1>
      </div>
      <div className="flex items-center justify-between pt-5">
        <span className="mx-8 mt-[1.7px] ">
          <Icon color="white" size={30}>
            <MdNotificationsOutline />
          </Icon>
        </span>

        <span className="mr-5">
          <Icon color="white" size={20}>
            <DropdownMenu />
          </Icon>
        </span>
      </div>
    </div>
  );
};

export default Header;
