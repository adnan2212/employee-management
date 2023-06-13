import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Logout } from "@ricons/carbon";
import { Icon } from "@ricons/utils";

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signout = async () => {
    await logout();
    navigate("/");
    console.log("❌ Logged Out Successfully ❌");
  };

  return (
    <div>
      <button
        className="mt-4 flex justify-evenly rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={signout}
      >
        Logout
        <span className="pl-2 align-middle">
          <Icon>
            <Logout />
          </Icon>
        </span>
      </button>
    </div>
  );
};

export default LogoutButton;
