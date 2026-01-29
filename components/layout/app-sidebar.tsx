import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ROLES } from "@/constants/Roles";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { CustomerRoutes } from "@/routes/CustomerRoutes";
import { ProviderRoutes } from "@/routes/ProviderRoutes";
import { Route } from "@/types";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function AppSidebar({
  user,
  ...props
}: { user: string } & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];
  switch (user) {
    case ROLES.ADMIN:
      routes = AdminRoutes;
      break;
    case ROLES.CUSTOMER:
      routes = CustomerRoutes;
      break;

    case ROLES.PROVIDER:
      routes = ProviderRoutes;
      break;

    default:
      routes = [];
      break;
  }
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {/* <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        /> */}
        {/* <SearchForm /> */}
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item: any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
