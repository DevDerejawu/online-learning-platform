"use client"
import { useSidebar } from "@/components/ui/sidebar";
import { Bell, Menu } from "lucide-react";
import { MdChat } from "react-icons/md";
const DashboardNavbar = () => {
  const { toggleSidebar, open } = useSidebar();
  return (
 <div className={`grid grid-cols-[auto_1fr] md:gap-10 fixed top-0 right-0 left-0 z-10 bg-blue-700 text-orange-300 h-[30px] items-center pr-3 md:pr-10 ${open?"md:left-32 md:transition-all md:duration-600":"md:transition-all md:duration-600 md:left-12"}`}>
          <Menu size={30} className="cursor-pointer" onClick={toggleSidebar} />

          <div className="flex gap-6 items-center justify-end">
            <span className="flex items-center gap-2 cursor-not-allowed">
              <MdChat /> Chat with AI
            </span>
            <span className="flex items-center gap-2 cursor-not-allowed">
              <Bell /> Notifications
            </span>
          </div>
        </div>
  )
}

export default DashboardNavbar