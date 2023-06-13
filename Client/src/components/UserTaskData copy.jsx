import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useContent from "../hooks/useContent";
import { Delete28Regular, Edit24Filled } from "@ricons/fluent";
import { Icon } from "@ricons/utils";
import {
  Box,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
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
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  Pagination
} from "@windmill/react-ui";

import { FaCheckCircle, FaTimesCircle, FaEdit } from "react-icons/fa";
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
  const cancelRef = React.useRef();
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
  };

  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${TASK_URL}/${deleteTaskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      const updatedTaskData = getUserTaskData.filter(
        (task) => task._id !== deleteTaskId
      );
      setGetUserTaskData(updatedTaskData);
      setIsConfirmationOpen(false);
      setSuccessMessage("Task deleted successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (page) => {
    console.log("Page:", page);
    // Fetch data for the selected page
  };

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Sub Type</TableCell>
              <TableCell>Hours Spent</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getUserTaskData.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.taskType}</TableCell>
                <TableCell>{task.subTaskType}</TableCell>
                <TableCell>{task.hoursSpent}</TableCell>
                <TableCell>{formatDate(task.date)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(task._id)}
                    leftIcon={<Icon as={FaEdit} />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteTaskId(task._id);
                      setIsConfirmationOpen(true);
                    }}
                    leftIcon={<Icon as={Delete28Regular} />}
                    colorScheme="red"
                    variant="outline"
                    size="sm"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableFooterPagination colSpan={5}>
                <Pagination
                  totalResults={getUserTaskData.length}
                  resultsPerPage={10}
                  onChange={handlePageChange}
                />
              </TableFooterPagination>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              taskType: "",
              subTaskType: "",
              hoursSpent: ""
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                await axios.patch(`${TASK_URL}/${selectedTask._id}`, values, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  },
                  withCredentials: true
                });
                const updatedTaskData = getUserTaskData.map((task) =>
                  task._id === selectedTask._id
                    ? {
                        ...task,
                        taskType: values.taskType,
                        subTaskType: values.subTaskType,
                        hoursSpent: values.hoursSpent
                      }
                    : task
                );
                setGetUserTaskData(updatedTaskData);
                setSuccessMessage("Task updated successfully.");
                actions.resetForm();
                setIsPopupOpen(false);
                onClose();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {(props) => (
              <Form>
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Task Type</FormLabel>
                    <Input
                      type="text"
                      name="taskType"
                      value={props.values.taskType}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.taskType && props.touched.taskType && (
                      <FormErrorMessage>
                        {props.errors.taskType}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Sub Task Type</FormLabel>
                    <Input
                      type="text"
                      name="subTaskType"
                      value={props.values.subTaskType}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.subTaskType && props.touched.subTaskType && (
                      <FormErrorMessage>
                        {props.errors.subTaskType}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Hours Spent</FormLabel>
                    <Input
                      type="text"
                      name="hoursSpent"
                      value={props.values.hoursSpent}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.hoursSpent && props.touched.hoursSpent && (
                      <FormErrorMessage>
                        {props.errors.hoursSpent}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={props.handleSubmit}
                  >
                    Update
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isConfirmationOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseConfirmation}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Task
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseConfirmation}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteConfirmation}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {successMessage && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
    </Box>
  );
};

export default TaskList;
