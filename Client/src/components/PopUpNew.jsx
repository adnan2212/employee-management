import React from "react";
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

import MyForm from "./MyForm";
import plus from "../assets/img/plus-btn.svg";

const PopUpNew = ({ task, onClose }) => {
  const { isOpen } = useDisclosure();

  return (
    <>
      <div className="mb-2 flex flex-col items-center"></div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyForm taskData={task} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PopUpNew;
