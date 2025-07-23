"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  LayoutDashboardIcon,
  Settings2,
  SquareLibrary,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { NavBottom } from "./nav-user"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Interviews",
      url: "/interviews",
      icon: SquareLibrary,
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  avBottom: [
    {
      title: "Help",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      isActive: true,
    },
    {
      title: "Privacy policy",
      url: "#",
      icon: Bot,
    },
    {
      title: "Terms of service",
      url: "#",
      icon: BookOpen,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="md:ml-20 border-l border-l-black/20 dark:border-l-white/20">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center">
                <Image src={'/icons/app-logo.png'} width={25} height={25} alt="application logo"/>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FortinixAI</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavBottom items={data.avBottom} />
      </SidebarFooter>
    </Sidebar>
  )
}
