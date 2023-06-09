import { useState, useEffect, useContext } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import plus from "../assets/img/plus-btn.svg";
import StateContext from "../context/ContextProvider"; //

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast
} from "@chakra-ui/react";

const TASK_URL = "/tasks";

const PopUp = () => {
  const { auth } = useContent();
  const token = auth?.accessToken;
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px) " />;
  const { setGetUserTaskData } = useContext(StateContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [successMessage, setSuccessMessage] = useState("");
  const toast = useToast();

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

  const taskData = async (values) => {
    console.log("Adding taskData.");
    try {
      const response = await axios.post(TASK_URL, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log(response);
      setSuccessMessage("Form submitted successfully!");
      setGetUserTaskData((prevData) => [...prevData, values]); // Store the values in the context
      setTimeout(() => {
        onClose(); // Close the modal after 1 second
        setSuccessMessage("");
        toast({
          position: "top",
          title: "Task submitted",
          status: "success",
          duration: 3000,
          isClosable: true
        });
      }, 400);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        <Button
          className=""
          colorScheme=""
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
          size="lg"
          rounded="full"
          fontSize="2xl"
          lineHeight="1" // Ensure the line height is set to 1 for vertical centering
          transform="translateY(-1.5px) translateX(-0.5px)" // Adjust the vertical positioning if needed
        >
          +
        </Button>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Hour-Sheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex items-center justify-center">
              <Formik
                initialValues={{
                  taskType: "",
                  subTaskType: "",
                  hoursSpent: "",
                  comment: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  resetForm();
                  setSuccessMessage("Form submitted successfully!");
                  taskData(values);
                }}
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

                    <div className="mb-4">
                      <label
                        htmlFor="comment"
                        className="mb-2 block text-sm font-bold text-gray-700"
                      >
                        Comment:
                      </label>
                      <Field
                        as="textarea"
                        name="comment"
                        id="comment"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.comment}
                        className="w-full rounded border border-gray-300 p-2 focus:outline-none"
                        placeholder="Enter your comment"
                      />
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
                        className={`w-full rounded bg-red-500 px-4 py-2 text-white ${
                          Object.keys(errors).length > 0 || !values.taskType
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        } hover:bg-red-600`}
                        disabled={
                          Object.keys(errors).length > 0 || !values.taskType
                        }
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopUp;

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
    .required("Hours Spent is required"),
  comment: Yup.string().notRequired(),
});
