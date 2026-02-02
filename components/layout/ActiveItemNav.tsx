"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function ActiveItemNav({ items }: { items: any[] }) {
  const pathname = usePathname();
  const url = ["/dashboard", "/provider-dashboard"];
  return (
    <>
      {items.map((item: any) => {
        const isActive =
          pathname === item.url ||
          (pathname.startsWith(item.url + "/") &&
            item.url !== url[0] &&
            item.url !== url[1]);

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={item.url}>{item.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
