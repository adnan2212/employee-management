import MyForm from "./MyForm";
import React from "react";
import plus from "../assets/img/plus-btn.svg";
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
  useDisclosure
} from "@chakra-ui/react";

const TASK_URL = "/tasks";

const PopUp = () => {
  const { auth } = useContent();
  const token = auth?.accessToken;
  console.log("💚 POPUP", auth);
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px) " />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const taskData = async (values) => {
    console.log("Adding taskData.");
    // const data = { taskType, subTaskType, hoursSpent };
    try {
      const response = await axios.post(TASK_URL, JSON.stringify(values), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      console.log(response);
      // const accessToken = response?.data?.accessToken;
      // console.log(user, accessToken);
      // setAuth({ user, accessToken });
      // resetUser();
      // setPassword("");
      // navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      // if (!err?.response) {
      //   setErrMsg("No Server Response");
      // } else if (err.response?.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.response?.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg("Login Failed");
      // }
      // errRef.current.focus();
    }
  };

  return (
    <>
      <div className=" mb-2 flex flex-col items-center   ">
        <Button
          className="px-0"
          colorScheme=""
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
          <img className="mb-2" src={plus} alt="" />
        </Button>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Hour-Sheet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyForm taskData={taskData} />
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopUp;
