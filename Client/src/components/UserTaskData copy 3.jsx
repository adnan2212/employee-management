import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  ModalFooter
} from "@chakra-ui/react";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const TASK_URL = "/tasks";

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

const UserTaskData = () => {
  const { auth, getUserTaskData, setGetUserTaskData } = useContent();
  const token = auth?.accessToken;
  const [selectedTask, setSelectedTask] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const taskData = {};

  const onCloseModal = () => {
    setIsPopupOpen(false);
    onClose();
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(TASK_URL, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log("UserTaskData ->>>", response.data);
        setGetUserTaskData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPostData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEdit = (taskId) => {
    const task = getUserTaskData.find((task) => task._id === taskId);
    setSelectedTask(task);
    setIsPopupOpen(true);
    setInitialFormValues({
      taskType: task.taskType,
      subTaskType: task.subTaskType,
      hoursSpent: task.hoursSpent
    });
    onOpen();
    console.log("Edit Task ID:", taskId);
  };
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setIsConfirmationOpen(true);
    const updatedTaskData = taskData.filter((task) => task._id !== taskId);
    setTaskData(updatedTaskData);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${TASK_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log("Deleted Task ID:", taskId);
      const updatedTaskData = getUserTaskData.filter(
        (task) => task._id !== taskId
      );
      setGetUserTaskData(updatedTaskData);
    } catch (err) {
      console.log(err);
      // Handle error here
    }
  };

  const handleSubmit = async (values, formikBag) => {
    try {
      const response = await axios.put(
        `${TASK_URL}/${selectedTask._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );
      console.log("Updated Task:", response.data);
      formikBag.resetForm();
      setSuccessMessage("Form Updated successfully!");
      const updatedTaskData = getUserTaskData.map((task) => {
        if (task._id === selectedTask._id) {
          return {
            ...task,
            taskType: values.taskType,
            subTaskType: values.subTaskType,
            hoursSpent: values.hoursSpent
          };
        }
        return task;
      });
      setGetUserTaskData(updatedTaskData);
    } catch (err) {
      console.log(err);
      // Handle error here
    }
    console.log("Line 38:", values);
  };
  const [initialFormValues, setInitialFormValues] = useState({
    taskType: "",
    subTaskType: "",
    hoursSpent: ""
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="mb-4 text-2xl font-bold">User Task Data</h2>
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Task Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sub Task Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Hours
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {getUserTaskData.map(
              ({ date, _id, taskType, subTaskType, hoursSpent }) => (
                <tr key={_id}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(date)}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{taskType}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{subTaskType}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{hoursSpent}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button
                      className="mr-2 text-indigo-600 hover:text-indigo-900 md:mr-3"
                      onClick={() => handleEdit(_id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
            <Modal
              isOpen={isConfirmationOpen}
              onClose={() => setIsConfirmationOpen(false)}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Deletion</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Are you sure you want to delete this task?
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    onClick={() => deleteTask(deleteTaskId)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setIsConfirmationOpen(false)}
                  >
                    No
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </tbody>
        </table>
      </div>

      <Modal isOpen={isOpen} onClose={onCloseModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex  items-center justify-center ">
              <Formik
                initialValues={initialFormValues}
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
                      {touched.taskType && !errors.taskType}
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
                        {touched.subTaskType && !errors.subTaskType}
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
                        id="hoursSpent"
                        name="hoursSpent"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.hoursSpent}
                        className={`w-full border p-2 ${
                          errors.hoursSpent && touched.hoursSpent
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded focus:outline-none`}
                      />
                      {touched.hoursSpent && errors.hoursSpent && (
                        <div className="mt-1 text-xs text-red-500">
                          <FaTimesCircle className="mb-1 mr-1 inline" />
                          {errors.hoursSpent}
                        </div>
                      )}
                      {touched.hoursSpent && !errors.hoursSpent}
                    </div>

                    <div className="flex items-center justify-between">
                      <Button
                        type="submit"
                        colorScheme="teal"
                        className={`w-full rounded bg-red-500 px-4 py-2 text-white ${
                          Object.keys(errors).length > 0 || !values.taskType
                            ? "cursor-not-allowed opacity-50"
                            : ""
                        } hover:bg-red-600`}
                        disabled={
                          Object.keys(errors).length > 0 ||
                          !values.taskType ||
                          (values.taskType && !values.subTaskType) ||
                          !values.hoursSpent
                        }
                      >
                        Update
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserTaskData;
