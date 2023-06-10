import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useInput from "../hooks/useInput";
import Logo from "../components/Logo";
import useToggle from "../hooks/useToggle";

const REGISTER_URL = "/register";
const Register = () => {
  const { setAuth } = useContent();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, resetUser, userAttributes] = useInput("user", "");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [check, toggleCheck] = useToggle("persist", false);

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
        REGISTER_URL,
        JSON.stringify({ user, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;

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
        setErrMsg("Registration Failed");
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
              Register Page!
            </h1>
            <h6 className=" mb-4 text-center text-sm font-medium text-slate-500">
              Register
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
                Sign Up
              </button>
            </div>

            <div className="mb-6">
              <input
                type="checkbox"
                id="persist"
                onChange={toggleCheck}
                checked={check}
                className="ml-2 leading-tight"
              />
              <label htmlFor="persist" className="mb-2 ml-2 text-sm font-bold">
                Trust This Device
              </label>
            </div>

            <p>
              Already have an Account?
              <span className="line ml-2 text-slate-400">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
