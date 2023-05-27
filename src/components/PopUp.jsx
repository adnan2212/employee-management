import MyForm from "./MyForm";
import React from "react";
import { AddFilled } from "@ricons/material";
import { Icon } from "@ricons/utils";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

const PopUp = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.900"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <div className="">
        <Button
          colorScheme="blue"
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
          <Icon color="white" size="30">
            <AddFilled />
          </Icon>
        </Button>
      </div>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MyForm />
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
