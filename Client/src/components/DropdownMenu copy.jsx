import { useState, useRef, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Icon } from "@ricons/utils";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  ScaleFade
} from "@chakra-ui/react";
import {
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlineLogout
} from "react-icons/ai";
import { FaQuestion } from "react-icons/fa";
import { RiProjectorFill } from "react-icons/ri";

const DropdownMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onClose();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <Box className="relative  inline-block" ref={dropdownRef}>
      {/* Dropdown toggle button */}
      <Menu>
        <MenuButton
          as={Button}
          onClick={onToggle}
          bg="transparent"
          color="white"
          _hover={{
            bg: "transparent"
          }}
          _focus={{
            bg: "transparent"
          }}
          _active={{
            bg: "transparent"
          }}
        >
          {isOpen ? (
            <Icon color="white" size={30}>
              <MdClose />
            </Icon>
          ) : (
            <Icon color="white" size={30}>
              <MdMenu />
            </Icon>
          )}
        </MenuButton>

        {/* Dropdown menu */}
        <MenuList
          bg="white"
          boxShadow="xl"
          color="black"
          p={2}
          py={5}
          onClose={onClose}
          transition="all 0.3s"
          transformOrigin="top"
          portalProps={{ appendToParentPortal: true }} // Render the menu in a portal
          zIndex={10}
        >
          {/* Menu items */}
          <MenuItem
            onClick={() => handleItemClick("profile")}
            bg={selectedItem === "profile" ? "blue.100" : "transparent"}
            my={2}
            _hover={{
              bg: "blue.100"
            }}
            _focus={{
              bg: "blue.100"
            }}
            icon={<Icon as={AiOutlineUser} mr={2} />}
          >
            Your Profile
          </MenuItem>
          <MenuItem
            onClick={() => handleItemClick("projects")}
            bg={selectedItem === "projects" ? "blue.100" : "transparent"}
            my={2}
            _hover={{
              bg: "blue.100"
            }}
            _focus={{
              bg: "blue.100"
            }}
            icon={<Icon as={RiProjectorFill} mr={2} />}
          >
            Your Team
          </MenuItem>
          <MenuItem
            onClick={() => handleItemClick("help")}
            bg={selectedItem === "help" ? "blue.100" : "transparent"}
            my={2}
            _hover={{
              bg: "blue.100"
            }}
            _focus={{
              bg: "blue.100"
            }}
            icon={<Icon as={FaQuestion} mr={2} />}
          >
            Help
          </MenuItem>
          <MenuItem
            onClick={() => handleItemClick("settings")}
            bg={selectedItem === "settings" ? "blue.100" : "transparent"}
            my={2}
            _hover={{
              bg: "blue.100"
            }}
            _focus={{
              bg: "blue.100"
            }}
            icon={<Icon as={AiOutlineSetting} mr={2} />}
          >
            Settings
          </MenuItem>
          <MenuItem
            onClick={() => handleItemClick("signout")}
            bg={selectedItem === "signout" ? "blue.100" : "transparent"}
            my={2}
            _hover={{
              bg: "blue.100"
            }}
            _focus={{
              bg: "blue.100"
            }}
            icon={<Icon as={AiOutlineLogout} mr={2} />}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
