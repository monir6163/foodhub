"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

export default function ActiveItemNav({ items }: { items: any[] }) {
  const pathname = usePathname();

  return (
    <>
      {items.map((item: any) => {
        const isActive =
          pathname === item.url ||
          (pathname.startsWith(item.url + "/") && item.url !== "/dashboard");

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
