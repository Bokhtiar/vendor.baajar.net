import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import {
  RiGalleryFill,
  RiMenuFold4Fill,
} from "react-icons/ri";
import { HiBars3 } from "react-icons/hi2";
import {
  MdOutlineInventory2,
} from "react-icons/md";
import { CiWallet } from "react-icons/ci";

const Sidebar = ({ toggleSidebar, menuOpen, menuStyle }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  const menuData = [
    {
      title: "Dashboard",
      icon: <RxDashboard />,
      path: "/dashboard",
    },
    {
      title: "Orders",
      icon: <HiBars3 />,
      path: "/dashboard/orders",
      childrens: [
        {
          title: "All Orders",

          path: "/dashboard/orders",
        },
        {
          title: "Pending Orders",

          path: "/dashboard/pending-orders",
          status: "pending",
        },
        {
          title: "Processed Orders",

          path: "/dashboard/processed-orders",
          status: "processed",
        },
        {
          title: "Shipped Orders",

          path: "/dashboard/shipped-orders",
          status: "shipped",
        },
        {
          title: "Completed Orders",

          path: "/dashboard/completed-orders",
          status: "delivered",
        },
        {
          title: "Canceled Orders",

          path: "/dashboard/canceled-orders",
          status: "cancelled",
        },
      ],
    },
    {
      title: "Products",
      icon: <RiGalleryFill />,
      path: "/dashboard/products",
      childrens: [
        {
          title: "Create Product",
          path: "/dashboard/create-product",
        },
        {
          title: "All Product",

          path: "/dashboard/all-product",
        },
        {
          title: "Stock Out",

          path: "/dashboard/stock-out",
        },

      ],
    },
    {
      title: "Inventory",
      icon: <MdOutlineInventory2 />,
      path: "/dashboard/inventory",
    },
    {
      title: "Earnings",
      icon: <CiWallet />,
      path: "/dashboard/earnings",
      childrens: [
        {
          title: "My Earnings",
          path: "/dashboard/earnings",
        },
        {
          title: "Withdrawal",

          path: "/dashboard/Withdrawal",
        },
      ],
    },
    {
      title: "Setting",
      icon: <IoSettingsOutline />,
      path: "/dashboard/setting",
    },

  ];
  return (
    <>
      {menuStyle === "hover" && (
        <div className="w-20 hover:w-64 h-screen bg-lightCard dark:bg-darkCard dark:text-darkTitle py-4 group  transition-all duration-300 ease-in-out overflow-hidden  z-50 ">
          {/* Logo */}
          <div className="flex items-center space-x-2 pb-[22px]border-gray-300 pl-4 ">
            {/* <div className="text-blue-500 text-2xl font-bold">R</div> */}
            {/* <img src={logo} alt="" className="w-10 h-10 rounded-full " /> */}
            <span className="text-primary text-lg font-bold   left-5 p-5">
              Baajar
            </span>
          </div>

          {/* Menu List */}

          <nav className="mt-4">
            {menuData.map((item, index) => {
              const isActive = location.pathname === item.path;

              return (
                <div key={index} className="mb-2 relative">
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-[#0d6efd] z-50"></span>
                  )}

                  {/* Parent Menu Item */}
                  <Link
                    to={item.path}
                    className={`flex items-center w-full text-left rounded-md transition-all duration-200 group
            ${isActive
                        ? "bg-primary text-white"
                        : "hover:text-black hover:bg-blue-100"
                      }
          `}
                    onClick={() => toggleMenu(item.title)}
                  >
                    {/* Icon - Fixed Size */}
                    <span className="mr-3 flex-shrink-0 text-xl pl-6 p-2">
                      {item.icon}
                    </span>

                    {/* Title */}
                    <div className="hidden group-hover:block truncate w-full">
                      {item.title}
                    </div>
                  </Link>

                  {/* Submenu Items */}
                  {item.childrens && openMenu === item.title && (
                    <div className="ml-6 mt-1 flex flex-col space-y-2">
                      {item.childrens.map((subItem, subIndex) => {
                        const isSubActive = location.pathname === subItem.path;

                        return (
                          <Link
                            key={subIndex}
                            to={
                              subItem.status
                                ? `${subItem.path}?status=${subItem.status}`
                                : subItem.path
                            }

                            className={`flex items-center  rounded-md  pl-4 transition-all duration-200 relative
                    ${isSubActive
                                ? " text-primary font-semibold hover:bg-blue-100"
                                : "hover:text-black hover:bg-blue-100"
                              }
                  `}
                          >
                            {/* Submenu Icon */}
                            <span className="mr-2 flex-shrink-0 text-lg p-2">
                              {subItem.icon}
                            </span>

                            {/* Submenu Title */}
                            <div className="truncate w-full">
                              {subItem.title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      {menuStyle === "click" && (
        <div
          className={`w-64 fixed z-50  top-0 left-0 h-screen bg-lightCard dark:bg-darkCard dark:text-darkTitle shadow-2xl transition-all duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Logo */}
          <div className="flex items-center justify-between w-full p-[18px] border-b border-gray-300">
            {/* Logo */}
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />

            {/* Title */}
            <span className="text-lg font-semibold">Zav Vision </span>

            {/* Toggle Button */}
            <button
              className="flex items-center justify-center w-10 h-10 rounded-md transition "
              onClick={toggleSidebar}
            >
              <RiMenuFold4Fill
                className={`text-xl transform transition-transform duration-300 z-50 cursor-pointer ${menuOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
          </div>

          {/* Menu List */}
          <nav className="mt-4 overflow-hidden">
            {" "}
            {/* Prevents blue bar from going outside */}
            {menuData.map((item, index) => {
              const isActive = location.pathname === item.path; // Check active menu

              return (
                <div
                  key={index}
                  className="mb-2 relative overflow-hidden gap-4"
                >
                  {/* Parent Menu Item */}
                  {isActive && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-primary z-50  "></span>
                  )}
                  <Link
                    to={item.path}
                    className={`flex items-center w-full  text-left rounded-md 
                p-2 pl-6 transition-all duration-200 relative 
                ${isActive
                        ? "bg-primary text-[#0d6efd]"
                        : " hover:text-black hover:bg-blue-100 "
                      }
              `}
                    onClick={() => toggleMenu(item.title)}
                  >
                    <span className="mr-3 flex-shrink-0 text-base p-1">
                      {item.icon}
                    </span>

                    {/* Title - Truncated for consistency */}
                    <div className="truncate w-full text-sm">{item.title}</div>
                  </Link>

                  {/* Submenu Items (if exists) */}
                  {item.childrens && openMenu === item.title && (
                    <div className="ml-6 mt-1 flex flex-col space-y-1">
                      {item.childrens.map((subItem, subIndex) => {
                        const isSubActive = location.pathname === subItem.path; // Check active submenu
                        return (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className={`flex items-center text-sm rounded-md p-2 pl-4 transition-all duration-200 relative text-lightTitle dark:text-darkTitle
                        ${isSubActive
                                ? "bg-blue-200 text-blue-900"
                                : "hover:bg-blue-100 hover:text-lightTitle"
                              }
                      `}
                          >
                            {/* Active Vertical Bar for Submenu */}
                            {/* {isSubActive && (
                              <span className="absolute left-0 top-0 h-full w-1 bg-blue-500"></span>
                            )} */}

                            {/* Submenu Icon - Fixed Size */}
                            <span className="mr-2 flex-shrink-0 text-lg">
                              {subItem.icon}
                            </span>

                            {/* Submenu Title - Truncated */}
                            <div className="truncate w-full">
                              {subItem.title}
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
