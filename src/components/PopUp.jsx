import MyForm from "./MyForm";
import React from "react";
import { AddFilled } from "@ricons/material";
import { Icon } from "@ricons/utils";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
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

// import { CloseSharp } from "@ricons/material";
// import { Icon } from "@ricons/utils";

// const Popup = ({ isOpen, onClose }) => {
//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center ${
//         isOpen ? "block" : "hidden"
//       }`}
//     >
//       <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
//       <div className="z-10 rounded-md bg-white p-8">
//         <button
//           className="absolute right-0 top-64 m-4 text-red-500 hover:text-gray-800"
//           onClick={onClose}
//         >
//           <Icon size="30">
//             <CloseSharp />
//           </Icon>
//         </button>
//         <div className="z-10 rounded-md bg-white p-8">
//           <MyForm />
//           <button
//             className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

export default PopUp;
