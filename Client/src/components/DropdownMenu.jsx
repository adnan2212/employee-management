import { useState, useRef, useEffect } from "react";
import { MdMenu } from "@ricons/ionicons4";
import { Icon } from "@ricons/utils";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <button
        onClick={toggleDropdown}
        className="reBurgerComponent:outline-none z-10 mt-0 block h-0  focus:ring-blue-300 focus:ring-opacity-40 dark:bg-[#2051E5] dark:text-white dark:focus:ring-blue-400 dark:focus:ring-opacity-40"
      >
        <Icon color="white" size={30}>
          <MdMenu />
        </Icon>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute right-0 z-20 mr-8 mt-8 w-48 origin-top-right rounded-md bg-white py-2 shadow-xl dark:bg-gray-800"
        >
          <a
            href="#"
            className={`block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 ${
              selectedItem === "profile"
                ? "bg-blue-100 dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handleItemClick("profile")}
          >
            Your Profile
          </a>
          <a
            href="#"
            className={`block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 ${
              selectedItem === "projects"
                ? "bg-blue-100 dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handleItemClick("projects")}
          >
            Your Projects
          </a>
          <a
            href="#"
            className={`block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 ${
              selectedItem === "help"
                ? "bg-blue-100 dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handleItemClick("help")}
          >
            Help
          </a>
          <a
            href="#"
            className={`block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 ${
              selectedItem === "settings"
                ? "bg-blue-100 dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handleItemClick("settings")}
          >
            Settings
          </a>
          <a
            href="#"
            className={`block transform px-4 py-3 text-sm capitalize text-gray-600 transition-colors duration-300 ${
              selectedItem === "signout"
                ? "bg-blue-100 dark:bg-gray-700 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            }`}
            onClick={() => handleItemClick("signout")}
          >
            Sign Out
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
