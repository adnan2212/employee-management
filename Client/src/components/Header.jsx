import axios from "../api/axios";
import useContent from "../hooks/useContent";
import useLogout from "../hooks/useLogout";
import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import jwtDecode from "jwt-decode";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

const navigation = [
  {
    name: "Dashboard",
    link: "",
    current: true,
    isProtected: false,
    roles: [1000]
  },
  {
    name: "Team",
    link: "projects",
    current: false,
    isProtected: false,
    roles: [1000]
  },
  {
    name: "Projects",
    link: "#",
    current: false,
    isProtected: false,
    roles: [1000]
  },
  {
    name: "Calendar",
    link: "#",
    current: false,
    isProtected: false,
    roles: [1000]
  },
  {
    name: "Reports",
    link: "yourTaskData",
    current: false,
    isProtected: false,
    roles: [1000]
  },
  {
    name: "Admin",
    link: "data",
    current: false,
    isProtected: true,
    roles: [5150]
  },
  {
    name: "Allied Checker",
    link: "allied-checker",
    current: false,
    isProtected: true,
    roles: [5150]
  }
];
const userNavigation = [
  { name: "Your Profile", link: "#" },
  { name: "Settings", link: "#" },
  { name: "Sign out", link: "#" }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ userName }) => {
  const { auth } = useContent();
  const userFirstName = auth.user;

  console.log(userFirstName);

  const navigate = useNavigate();
  const logout = useLogout();
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const signout = async () => {
    await logout();
    navigate("/");
    console.log("❌ Logged Out Successfully ❌");
  };

  const handleNavigation = (link, index) => {
    if (link === "yourTaskData" || link === "projects") {
      navigate(link);
    } else {
      // Handle other navigation logic
    }
    setActiveButtonIndex(index); // Set the active button index
    setIsMobileMenuOpen(false); // Close the mobile menu
  };

  const filterNav = () => {
    const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
    const roles = decoded?.UserInfo?.roles || [];

    let nav = navigation.filter((ele) => {
      if (auth?.accessToken) {
        if (roles?.find((role) => ele.roles.includes(role))) {
          return true;
        } else {
          return false;
        }
      } else {
        if (!ele.isProtected) {
          return true;
        } else {
          return false;
        }
      }
    });
    return nav;
  };

  return (
    <>
      <div className="min-h-full">
        <nav className="rounded-b-3xl bg-gray-800 py-6">
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Hello Ussername */}
                <div className="main mt-3 p-5 pt-6 text-white  md:hidden block">
                  <h1 className="text-slate-100">
                    <p className="main-heading-primary mb-2 font-sans text-xs font-light opacity-80">
                      Hello,
                    </p>
                    <p className="font-sans text-2xl font-semibold">
                      {userFirstName &&
                        userFirstName.charAt(0).toUpperCase() +
                          userFirstName.slice(1)}
                    </p>
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {filterNav().map((item, index) => (
                        <NavLink
                          to={`/${item.link}`}
                          key={item.name}
                          className={classNames(
                            index === activeButtonIndex
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          onClick={() => {
                            setActiveButtonIndex(index);
                            handleNavigation(item.link);
                          }}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center gap-5 md:ml-6">
                    <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6 " aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu>
                      <MenuButton className="flex max-w-xs items-center rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </MenuButton>

                      <MenuList className="absolute right-0 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white">
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name} className="text-base">
                            <Link
                              to={item.link}
                              className={classNames(
                                "block px-4 py-2",
                                item.name === "Sign out"
                                  ? "text-red-500"
                                  : "text-gray-700",
                                "hover:bg-gray-100"
                              )}
                              onClick={() =>
                                item.name === "Sign out" ? signout() : null
                              }
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </div>
                </div>

                <div className="-mr-2 flex justify-between md:hidden">
                  {/* Main menu */}
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ml-auto"
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                      <span className="sr-only">Open main menu</span>
                      {isMobileMenuOpen ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {isMobileMenuOpen && (
              <div className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-8 sm:px-3">
                  {filterNav().map((item, index) => (
                    <NavLink
                      key={item.name}
                      to={item.link}
                      className={classNames(
                        index === activeButtonIndex
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      onClick={() => {
                        setActiveButtonIndex(index);
                        handleNavigation(item.link, index);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {userFirstName &&
                          userFirstName.charAt(0).toUpperCase() +
                            userFirstName.slice(1)}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.link}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        onClick={() => {
                          if (item.name === "Sign out") {
                            signout();
                          } else {
                            handleNavigation(item.href);
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
