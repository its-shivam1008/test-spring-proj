import * as React from "react"
import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BiCartAdd, BiMessageAdd, BiSolidMessageSquareAdd } from "react-icons/bi"

// This is sample data.
const data = {
  user: {
    name: "Tushar Gupta",
    email: "tushar109@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Employee Management System",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
  projects: [
    {
      name: "Add employee",
      url: "/",
      icon: BiMessageAdd,
    },
    {
      name: "Employees",
      url: "/employees",
      icon: Frame,
    },
    {
      name: "Find a employee",
      url: "/get-employee",
      icon: PieChart,
    },
    {
      name: "Edit Employee",
      url: "/update-employee",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
