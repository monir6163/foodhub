"use client";

import { RouteIconName } from "@/types/route.types";
import {
  BookText,
  LayoutDashboard,
  ListOrdered,
  MapPinned,
  PackageSearch,
  ShoppingBag,
  Sparkles,
  Store,
  Tags,
  User,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const iconMap: Record<
  RouteIconName,
  React.ComponentType<{ className?: string }>
> = {
  "layout-dashboard": LayoutDashboard,
  tags: Tags,
  users: Users,
  "list-ordered": ListOrdered,
  "wand-sparkles": Sparkles,
  "book-text": BookText,
  "package-search": PackageSearch,
  user: User,
  "map-pinned": MapPinned,
  store: Store,
  "utensils-crossed": UtensilsCrossed,
  "shopping-bag": ShoppingBag,
};

export default function ActiveItemNav({ items }: { items: any[] }) {
  const pathname = usePathname();
  const url = ["/dashboard", "/provider-dashboard", "/admin-dashboard"];
  return (
    <>
      {items.map((item: any) => {
        const Icon = item.icon ? iconMap[item.icon as RouteIconName] : null;
        const isActive =
          pathname === item.url ||
          (pathname.startsWith(item.url + "/") &&
            item.url !== url[0] &&
            item.url !== url[1] &&
            item.url !== url[2]);

        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={item.url} className="flex items-center gap-2">
                {Icon ? <Icon className="h-4 w-4" /> : null}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
