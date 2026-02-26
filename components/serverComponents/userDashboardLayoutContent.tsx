import DashboardNavbar from "../clientComponents/dashboardNavbar";
import SidebarWithShadcn from "../clientComponents/userSidebar";
import { ReactNode } from "react";

function DashboardLayoutContent({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarWithShadcn />
      <section className="w-full">
        <DashboardNavbar />
        <div className="pt-[30px] w-full">{children}</div>
      </section>
    </>
  );
}
export default DashboardLayoutContent;
