export type RouteIconName =
  | "layout-dashboard"
  | "tags"
  | "users"
  | "list-ordered"
  | "wand-sparkles"
  | "book-text"
  | "package-search"
  | "user"
  | "map-pinned"
  | "store"
  | "utensils-crossed"
  | "shopping-bag";

export interface Route {
  title: string;
  items: {
    title: string;
    url: string;
    isActive?: boolean;
    icon?: RouteIconName;
  }[];
}
