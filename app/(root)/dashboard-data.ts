import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCurrencyDollar,
  IconChecklist,
  IconBox,
  IconUsers,
} from "@tabler/icons-react";

// Types for dashboard elements

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  percentageChange: string;
  trend: "up" | "down";
  // trendColor: string; // Handled by utility text-green/red-600 in component
  // bgColor: string; // Card background is white, icon specific bg is new
  iconBgColor: string;
  iconColor: string;
}

export interface SalesChartDataItem {
  month: string;
  "Online Sales": number;
  "Offline Sales": number;
}

export type OrderStatus = "Delivered" | "Pending" | "Cancelled";

export interface LatestOrderItem {
  trackingId: string;
  productName: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
  customerAvatar?: string; // Optional: if we want to add avatars later
}

// Dummy Data

export const statCardItems: StatCardData[] = [
  {
    id: "sales",
    title: "Total Sales",
    value: "$56,852",
    icon: IconCurrencyDollar,
    percentageChange: "+15.3%",
    trend: "up",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: "orders",
    title: "Total Order",
    value: "12,556",
    icon: IconChecklist,
    percentageChange: "-2.5%",
    trend: "down",
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "sold",
    title: "Product Sold",
    value: "8,526",
    icon: IconBox,
    percentageChange: "+5.8%",
    trend: "up",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "customers",
    title: "New Customers",
    value: "1,254",
    icon: IconUsers,
    percentageChange: "+8.2%",
    trend: "up",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export const salesChartData: SalesChartDataItem[] = [
  { month: "Jan", "Online Sales": 4000, "Offline Sales": 2400 },
  { month: "Feb", "Online Sales": 3000, "Offline Sales": 1398 },
  { month: "Mar", "Online Sales": 2000, "Offline Sales": 5800 }, // Reference has high offline sales for March
  { month: "Apr", "Online Sales": 2780, "Offline Sales": 3908 },
  { month: "May", "Online Sales": 1890, "Offline Sales": 4800 },
  { month: "Jun", "Online Sales": 2390, "Offline Sales": 3800 },
  { month: "Jul", "Online Sales": 3490, "Offline Sales": 4300 },
  { month: "Aug", "Online Sales": 2000, "Offline Sales": 3200 },
  { month: "Sep", "Online Sales": 2900, "Offline Sales": 4000 },
  { month: "Oct", "Online Sales": 1800, "Offline Sales": 2800 },
  { month: "Nov", "Online Sales": 3100, "Offline Sales": 3700 },
  { month: "Dec", "Online Sales": 2500, "Offline Sales": 3000 },
];

export const latestOrdersData: LatestOrderItem[] = [
  {
    trackingId: "#TN00000325",
    productName: "Smart T-shirt",
    customer: "Walter White",
    date: "24 Jan, 2023",
    amount: "$251.50",
    status: "Delivered",
  },
  {
    trackingId: "#TN00000326",
    productName: "Smart Watch",
    customer: "Jesse Pinkman",
    date: "24 Jan, 2023",
    amount: "$120.90",
    status: "Pending",
  },
  {
    trackingId: "#TN00000327",
    productName: "Apple new mac",
    customer: "Saul Goodman",
    date: "23 Jan, 2023",
    amount: "$1999.00",
    status: "Delivered",
  },
  {
    trackingId: "#TN00000328",
    productName: "Nike Sport Shoe",
    customer: "Gustavo Fring",
    date: "23 Jan, 2023",
    amount: "$99.50",
    status: "Cancelled",
  },
  {
    trackingId: "#TN00000329",
    productName: "Denim Jeans",
    customer: "Skyler White",
    date: "22 Jan, 2023",
    amount: "$75.00",
    status: "Delivered",
  },
   {
    trackingId: "#TN00000330",
    productName: "Leather Jacket",
    customer: "Mike Ehrmantraut",
    date: "22 Jan, 2023",
    amount: "$350.00",
    status: "Pending",
  },
];

// For Zustand store (initial structure, can be expanded)
export interface DashboardState {
  selectedDateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  // Add other relevant states here, e.g., for table pagination/sorting
}

export const initialDashboardState: DashboardState = {
  selectedDateRange: {
    from: new Date("2023-01-01"),
    to: new Date("2023-01-31"),
  },
};

// Helper icons for stat cards, if needed separately (already in StatCardData)
export const statIcons = {
  sales: IconCurrencyDollar,
  orders: IconChecklist,
  sold: IconBox,
  customers: IconUsers,
  arrowUp: IconArrowUpRight,
  arrowDown: IconArrowDownRight,
};
