import MyForm from "./MyForm";

import { CloseSharp } from "@ricons/material";
import { Icon } from "@ricons/utils";

const Popup = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="z-10 rounded-md bg-white p-8">
        <button
          className="absolute right-0 top-64 m-4 text-red-500 hover:text-gray-800"
          onClick={onClose}
        >
          <Icon size="30">
            <CloseSharp />
          </Icon>
        </button>
        <div className="z-10 rounded-md bg-white p-8">
          <MyForm />
          <button
            className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
