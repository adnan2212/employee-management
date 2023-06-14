import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Table,
  Tbody,
  Tr,
  Td,
  Field,
  Formik,
  Form,
  ErrorMessage,
  Select
} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";

const TASK_URL = "your_task_management_api_url";

const TaskManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [getUserTaskData, setGetUserTaskData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const cancelRef = React.useRef();

  const validationSchema = Yup.object().shape({
    taskType: Yup.string().required("Task Type is required"),
    subTaskType: Yup.string().required("Sub Task Type is required"),
    hoursSpent: Yup.number()
      .typeError("Hours Spent must be a number")
      .required("Hours Spent is required")
      .positive("Hours Spent must be a positive number")
  });

  useEffect(() => {
    // Fetch user task data from the API
    fetchUserTaskData();
  }, []);

  const fetchUserTaskData = async () => {
    try {
      const response = await axios.get(TASK_URL);
      setGetUserTaskData(response.data);
    } catch (error) {
      console.log("Error fetching user task data:", error);
    }
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setIsOpen(true);
  };

  const handleEdit = (taskId) => {
    const task = getUserTaskData.find((task) => task._id === taskId);
    setSelectedTask(task);
    setIsOpen(true);
  };

  const handleDelete = (taskId) => {
    setSelectedTask(taskId);
    setIsConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setIsConfirmationOpen(false);
  };

  const handleConfirmationDelete = async () => {
    try {
      await axios.delete(`${TASK_URL}/${selectedTask}`);
      setIsConfirmationOpen(false);
      setSuccessMessage("Task deleted successfully");
      fetchUserTaskData();
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const { taskType, subTaskType, hoursSpent } = values;
    const formData = { taskType, subTaskType, hoursSpent };

    try {
      if (selectedTask) {
        // Edit existing task
        await axios.put(`${TASK_URL}/${selectedTask._id}`, formData);
        setSuccessMessage("Task updated successfully");
      } else {
        // Add new task
        await axios.post(TASK_URL, formData);
        setSuccessMessage("Task added successfully");
      }

      setIsOpen(false);
      setSubmitting(false);
      fetchUserTaskData();
    } catch (error) {
      console.log("Error submitting task form:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box p={4}>
        <Button colorScheme="teal" mb={4} onClick={handleAdd}>
          Add Task
        </Button>

        <Table variant="simple">
          <Tbody>
            {getUserTaskData.map((task) => (
              <Tr key={task._id}>
                <Td>{task.taskType}</Td>
                <Td>{task.subTaskType}</Td>
                <Td>{task.hoursSpent}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => handleEdit(task._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    ml={2}
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedTask ? "Edit Task" : "Add Task"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{
                  taskType: selectedTask ? selectedTask.taskType : "",
                  subTaskType: selectedTask ? selectedTask.subTaskType : "",
                  hoursSpent: selectedTask ? selectedTask.hoursSpent : ""
                }}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Field mb={2}>
                      <Select
                        id="taskType"
                        name="taskType"
                        placeholder="Select Task Type"
                        value={values.taskType}
                        onChange={handleChange}
                      >
                        <option value="Task A">Task A</option>
                        <option value="Task B">Task B</option>
                        <option value="Task C">Task C</option>
                      </Select>
                      <ErrorMessage
                        name="taskType"
                        component={Box}
                        color="red"
                        mt={1}
                      />
                    </Field>
                    <Field mb={2}>
                      <Select
                        id="subTaskType"
                        name="subTaskType"
                        placeholder="Select Sub Task Type"
                        value={values.subTaskType}
                        onChange={handleChange}
                      >
                        <option value="Sub Task A">Sub Task A</option>
                        <option value="Sub Task B">Sub Task B</option>
                        <option value="Sub Task C">Sub Task C</option>
                      </Select>
                      <ErrorMessage
                        name="subTaskType"
                        component={Box}
                        color="red"
                        mt={1}
                      />
                    </Field>
                    <Field mb={2}>
                      <input
                        type="number"
                        id="hoursSpent"
                        name="hoursSpent"
                        placeholder="Hours Spent"
                        value={values.hoursSpent}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 p-2"
                      />
                      <ErrorMessage
                        name="hoursSpent"
                        component={Box}
                        color="red"
                        mt={1}
                      />
                    </Field>
                    <Button
                      type="submit"
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      mt={4}
                    >
                      {selectedTask ? "Save Changes" : "Add Task"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>

        <AlertDialog
          isOpen={isConfirmationOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleConfirmationClose}
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
                <Button ref={cancelRef} onClick={handleConfirmationClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={handleConfirmationDelete}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {successMessage && (
          <Box mt={4} p={2} bg="green.100" color="green.800" rounded="md">
            {successMessage}
          </Box>
        )}
      </Box>
    </>
  );
};

export default TaskManagement;
