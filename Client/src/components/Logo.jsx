import { Logo } from "../../config";

const Login = () => {
  return (
    <div className="bg-white">
      <img className="mx-auto flex justify-center pl-2" src={Logo} />
      <hr className="border-1 border-gray-300 drop-shadow-xl hover:border-gray-500" />
    </div>
  );
};

export default Login;
