import MyForm from "./MyForm";
import React from "react";
import plus from "../assets/img/plus-btn.svg";

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

const PopUp = () => {
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(10px) " />;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

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
