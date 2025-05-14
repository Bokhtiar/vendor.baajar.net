import { Outlet } from "react-router-dom";
import Sidebar from "../components/menu-bar/sidebar";
import Header from "../components/menu-bar/header";
import { useState } from "react";

export const DashboardLayout = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [menuStyle, setMenuStyle] = useState("hover");
  const [menuPosition, setMenuPosition] = useState("fixed");

  console.log("menuStyle", menuStyle);
  console.log("menuPosition", menuPosition);

  const toggleSidebar = () => {
    console.log("first");
    setMenuOpen(!menuOpen);
  };

  return (
    // <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div>
      <div className="flex h-screen overflow-hidden">
        {/* sidbar start  */}
        <Sidebar
          toggleSidebar={toggleSidebar}
          menuOpen={menuOpen}
          menuStyle={menuStyle}
          setMenuStyle={setMenuStyle}

        />
        <div className=" relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden   ">
          
          {/* mx-auto overflow-y-auto */}
          {/* Header start  */}
          
            {" "}
            <Header
              toggleSidebar={toggleSidebar}
              menuOpen={menuOpen}
              menuStyle={menuStyle}
              setMenuStyle={setMenuStyle}
              menuPosition={menuPosition}
              setMenuPosition={setMenuPosition}
            />
         
          <main>
            <div
              className={`mx-auto w-full p-2 md:p-4 2xl:p-6 bg-light dark:bg-dark     ${
                menuPosition === "fixed"
                  ? "mt-20"
                  : ""
              } `}
            >
              <Outlet />
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
};
