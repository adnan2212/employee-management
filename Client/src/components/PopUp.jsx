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
