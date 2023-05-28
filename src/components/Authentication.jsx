import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import Logo from "./Logo";

const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const initialValues = { email: "", password: "" };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle login logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      <Logo />
      <div className="mx-auto flex h-[100vh] flex-col  items-center justify-center pb-56">
        <h2 className="mb-4 text-2xl font-bold">Login</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={loginValidationSchema}
        >
          {({ isSubmitting }) => (
            <form className="mb-4 w-96 rounded px-8 pb-8 pt-6">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="focus:shadow-outline w-full appearance-none border border-b-[#1E1E1E] bg-[#E5E5E5] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="focus:shadow-outline w-full appearance-none border border-b-[#1E1E1E] bg-[#E5E5E5] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="mt-8 flex items-center justify-between font-light">
                <div className="text-[#5E5E5E] ">Forgot Password?</div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus:shadow-outline rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export const SigninForm = () => {
  const initialValues = { email: "", password: "" };

  const onSubmit = (values, { setSubmitting }) => {
    // Handle sign-up logic here
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      <Logo />
      {/* <div className="mx-auto max-w-md"> */}
      <div
        className="top-0 mx-auto flex
      h-[90vh] w-full min-w-full flex-col items-center pt-16"
      >
        <h2 className="mb-4 flex flex-col items-center text-5xl font-extralight lg:flex-row lg:gap-1">
          <span>Sign In to </span>
          <spans>Morningstar</spans>
        </h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={signupValidationSchema}
        >
          {({ isSubmitting }) => (
            <form className="mb-4 w-96 px-8 pb-8 pt-6 lg:w-6/12">
              <div className="mb-4 ">
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="focus:shadow-outline w-full appearance-none border border-b-[#1E1E1E] bg-[#E5E5E5] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="focus:shadow-outline w-full appearance-none border border-b-[#1E1E1E] bg-[#E5E5E5] px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-xs text-red-500"
                />
              </div>

              <div className="mt-8 flex items-center justify-between font-light">
                <div className="cursor-pointer text-[#5E5E5E]">
                  Forgot Password?
                </div>
                <button
                  type="submit"
                  disabled
                  // disabled={isSubmitting}
                  // className="focus:shadow-outline rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  className="focus:shadow-outline cursor-not-allowed rounded-full bg-blue-500 px-4 py-2 font-bold text-white opacity-50 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>

              <div className="m-4 mr-5 flex cursor-pointer justify-end text-blue-400 underline">
                <Link to="/">
                  <p>skip</p>
                </Link>
              </div>

              {/* <div className="mt-8 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="focus:shadow-outline rounded-full border bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                >
                  Sign In
                </button>
              </div> */}
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};
