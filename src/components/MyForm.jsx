import { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Header_2 from "./Header_2";
import Footer from "./Footer";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const task_type = ["Production", "Non-Production"];
const sub_task_type = {
  Production: ["Audit", "Junking", "Coding"],
  "Non-Production": ["Meeting", "Client Handling", "Networking"]
};

const validationSchema = Yup.object({
  taskType: Yup.string().required("Task Type is required"),
  subTaskType: Yup.string().when("taskType", (taskType, schema) =>
    taskType ? schema.required("Sub Task Type is required") : schema.nullable()
  ),
  hoursSpent: Yup.number()
    .positive("Hours Spent must be a positive number")
    .required("Hours Spent is required")
});

const MyForm = () => {
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [successMessage]);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    setSuccessMessage("Form submitted successfully!");
  };

  return (
    <>
      <Header_2 title={"Tasks"} />
      <div className="flex min-h-screen items-center justify-center ">
        <Formik
          initialValues={{
            taskType: "",
            subTaskType: "",
            hoursSpent: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form className="mb-2 w-full rounded bg-white px-8 pb-8 pt-6 shadow-md sm:max-w-md">
              {successMessage && (
                <div className="mb-2 mt-2 rounded border border-green-500 bg-green-100 px-4 py-2 text-sm text-green-900">
                  {successMessage}
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="taskType"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Task Type:
                </label>
                <Field
                  as="select"
                  name="taskType"
                  id="taskType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.taskType}
                  className={`w-full border p-2 ${
                    errors.taskType && touched.taskType
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none`}
                >
                  <option className="" value="" disabled>
                    Select a task type
                  </option>
                  {task_type.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Field>
                {touched.taskType && errors.taskType && (
                  <div className="mt-1 text-xs text-red-500">
                    <FaTimesCircle className="mb-1 mr-1 inline" />
                    {errors.taskType}
                  </div>
                )}
                {touched.taskType && !errors.taskType && (
                  <div className="mt-1 text-xs text-green-500">
                    <FaCheckCircle className="mb-1 mr-1 inline" />
                    Task Type is valid
                  </div>
                )}
              </div>

              {values.taskType && (
                <div className="mb-4">
                  <label
                    htmlFor="subTaskType"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Sub Task Type:
                  </label>
                  <Field
                    as="select"
                    name="subTaskType"
                    id="subTaskType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subTaskType}
                    className={`w-full border p-2 ${
                      errors.subTaskType && touched.subTaskType
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded focus:outline-none`}
                  >
                    <option value="" disabled>
                      Select a sub task type
                    </option>
                    {sub_task_type[values.taskType] &&
                      sub_task_type[values.taskType].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </Field>
                  {touched.subTaskType && errors.subTaskType && (
                    <div className="mt-1 text-xs text-red-500">
                      <FaTimesCircle className="mb-1 mr-1 inline" />
                      {errors.subTaskType}
                    </div>
                  )}
                  {touched.subTaskType && !errors.subTaskType && (
                    <div className="mt-1 text-xs text-green-500">
                      <FaCheckCircle className="mb-1 mr-1 inline" />
                      Sub Task Type is valid
                    </div>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="hoursSpent"
                  className="mb-2 block text-sm font-bold text-gray-700"
                >
                  Hours Spent:
                </label>
                <Field
                  type="number"
                  name="hoursSpent"
                  id="hoursSpent"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hoursSpent}
                  className={`w-full border p-2 ${
                    errors.hoursSpent && touched.hoursSpent
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none`}
                  placeholder="Enter hours spent"
                />
                {touched.hoursSpent && errors.hoursSpent && (
                  <div className="mt-1 text-xs text-red-500">
                    <FaTimesCircle className="mb-1 mr-1 inline" />
                    {errors.hoursSpent}
                  </div>
                )}
                {touched.hoursSpent && !errors.hoursSpent && (
                  <div className="mt-1 text-xs text-green-500">
                    <FaCheckCircle className="mb-1 mr-1 inline" />
                    Hours Spent is valid
                  </div>
                )}
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="mb-4 rounded border border-red-500 bg-red-100 px-4 py-3 text-red-700">
                  <ul>
                    {Object.keys(errors).map((fieldName) => (
                      <li key={fieldName}>
                        <FaTimesCircle className="mb-1 mr-1 inline" />
                        {errors[fieldName]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`w-full rounded bg-blue-500 px-4 py-2 text-white ${
                    Object.keys(errors).length > 0 || !values.taskType
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  } hover:bg-blue-600`}
                  disabled={Object.keys(errors).length > 0 || !values.taskType}
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="ml-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Reset
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default MyForm;
