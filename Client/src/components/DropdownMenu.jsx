import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { Icon } from "@ricons/utils";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Collapse,
  Center
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onClose();
  };

  return (
    <Box className="relative inline-block ">
      {/* Drawer toggle button */}
      <Button
        onClick={onOpen}
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
      </Button>

      {/* Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <Collapse in={isOpen} animateOpacity>
              <DrawerBody>
                {/* Menu items */}
                <Box display="flex" flexDirection="column" align="center">
                  <Button
                    onClick={() => handleItemClick("profile")}
                    bg={selectedItem === "profile" ? "blue.100" : "transparent"}
                    my={2}
                    _hover={{
                      bg: "blue.100"
                    }}
                    _focus={{
                      bg: "blue.100"
                    }}
                    centerIcon={<Icon as={AiOutlineUser} />}
                  >
                    Your Profile
                  </Button>
                  <Button
                    onClick={() => handleItemClick("projects")}
                    bg={
                      selectedItem === "projects" ? "blue.100" : "transparent"
                    }
                    my={2}
                    _hover={{
                      bg: "blue.100"
                    }}
                    _focus={{
                      bg: "blue.100"
                    }}
                    centerIcon={<Icon as={RiProjectorFill} />}
                  >
                    Your Team
                  </Button>
                  <Button
                    onClick={() => handleItemClick("help")}
                    bg={selectedItem === "help" ? "blue.100" : "transparent"}
                    my={2}
                    _hover={{
                      bg: "blue.100"
                    }}
                    _focus={{
                      bg: "blue.100"
                    }}
                    centerIcon={<Icon as={FaQuestion} />}
                  >
                    Help
                  </Button>
                  <Button
                    onClick={() => handleItemClick("settings")}
                    bg={
                      selectedItem === "settings" ? "blue.100" : "transparent"
                    }
                    my={2}
                    _hover={{
                      bg: "blue.100"
                    }}
                    _focus={{
                      bg: "blue.100"
                    }}
                    centerIcon={<Icon as={AiOutlineSetting} />}
                  >
                    Settings
                  </Button>
                  <Button
                    onClick={() => handleItemClick("signout")}
                    bg={selectedItem === "signout" ? "blue.100" : "transparent"}
                    my={2}
                    _hover={{
                      bg: "blue.100"
                    }}
                    _focus={{
                      bg: "blue.100"
                    }}
                    centerIcon={<Icon as={AiOutlineLogout} />}
                  >
                    Sign Out
                  </Button>
                </Box>
              </DrawerBody>
            </Collapse>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default DropdownMenu;
