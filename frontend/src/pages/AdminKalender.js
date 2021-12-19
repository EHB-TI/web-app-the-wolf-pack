import React from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import Kalender from "../components/Kalender";

export const AdminKalender = () => {
  return (
    <div className="App font-bold">
      <div class="container mx-auto px-6 mt-16 text-left text-color-footer flex-grow">
        <div class="border-gray-300 flex flex-wrap">
          <SidebarAdmin />
          <div className="mt-2 ml-20 pr-20 float-right w-3/4 overflow-auto">
            <Kalender />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminKalender;
