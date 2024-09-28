import {
  Barcode,
  ChartBarStacked,
  CreditCard,
  LayoutDashboard,
  Rss,
  Settings,
  User,
  Users,
} from "lucide-react";

const TopSidebarLinks = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    name: "Products",
    icon: Barcode,
    href: "/products",
  },
  {
    name: "Blogs",
    icon: Rss,
    href: "/blogs",
  },
  {
    name: "Categories",
    icon: ChartBarStacked,
    href: "/categories",
  },
  {
    name: "Users",
    icon: Users,
    href: "/users",
  },
];

const BottomSidebarLinks = [
  {
    name: "Profile",
    icon: User,
    href: "/profile",
  },
  {
    name: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export { TopSidebarLinks, BottomSidebarLinks };
