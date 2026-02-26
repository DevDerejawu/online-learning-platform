

import { ReactNode } from "react";
import {
  SidebarProvider,
} from "@/components/ui/sidebar";
import DashboardLayoutContent from "../../../components/serverComponents/userDashboardLayoutContent";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
      
    </SidebarProvider>
  );
}
