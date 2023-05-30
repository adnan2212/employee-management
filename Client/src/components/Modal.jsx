import { useState, useEffect } from "react";
import { PlusCircleFilled } from "@ricons/antd";
import { Icon } from "@ricons/utils";

const Modal = ({ openButtonText }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && isOpen == true) {
        toggleModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    document.documentElement.classList.toggle("overflow-y-hidden");
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      <button className="" onClick={toggleModal}>
        <Icon color="blue" size={45}>
          <PlusCircleFilled />
        </Icon>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
            onClick={handleBackdropClick}
          ></div>

          {/* Modal container */}
          <div className="fixed mx-auto max-w-lg rounded-lg bg-white p-4 shadow-lg">
            {/* Modal header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Modal Title</h3>
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={toggleModal}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal content */}
            <div className="mb-4">
              <p>
                Modal content goes here. You can add any HTML or components you
                need.
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex justify-end">
              <button
                className="mr-2 rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-400"
                onClick={() => {
                  // Custom action logic
                  toggleModal();
                }}
              >
                Action
              </button>
              <button
                className="rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
