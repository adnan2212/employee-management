import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useInput from "../hooks/useInput";
import Logo from "../components/Logo";

const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth } = useContent();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttributes] = useInput("user", "");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const userId = accessToken?.UserInfo?.id;
      console.log(userId);
      console.log(user, response);
      setAuth({ user, accessToken });
      resetUser();
      setPassword("");
      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <Logo />
      <section className="flex h-screen w-full flex-col flex-wrap content-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="mb-4 w-96 rounded px-8 pb-8 pt-6"
        >
          <p
            ref={errRef}
            className={
              errMsg
                ? "mb-2 rounded-lg bg-pink-400 p-2 font-bold text-red-600"
                : "absolute -left-full"
            }
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <div className="mx-5">
            <h1 className="mb-4 text-center text-3xl font-bold">
              Welcome Back!
            </h1>
            <h6 className=" mb-4 text-center text-sm font-medium text-slate-500">
              Login to Continue
            </h6>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-bold"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                {...userAttributes}
                className="bg-active-link-bg focus:shadow-outline w-full appearance-none rounded-2xl px-3 py-2 text-black shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-active-link-bg focus:shadow-outline w-full appearance-none rounded-2xl px-3 py-2 text-black shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-6 text-center">
              <button className="focus:shadow-outline w-52 rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                Sign In
              </button>
            </div>

            <p>
              Need an Account?
              <span className="line ml-2 text-slate-400">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
