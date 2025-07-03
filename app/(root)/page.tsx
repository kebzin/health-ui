"use client"; // Required for client-side components like charts and event handlers

import React from "react";
import { statCardItems, salesChartData, latestOrdersData } from "./dashboard-data";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { LatestOrdersTable } from "@/components/dashboard/LatestOrdersTable";
import { DateRangePicker } from "@/components/dashboard/DateRangePicker";
import { useDashboardStore } from '@/store/dashboardStore';
import { format } from 'date-fns'; // For formatting dates

const DashboardPage = () => {
  const selectedDateRange = useDashboardStore((state) => state.selectedDateRange);
  // const setDateRange = useDashboardStore((state) => state.setDateRange); // Action if we were setting it

  const formatDateRange = (from?: Date, to?: Date): string => {
    if (!from || !to) return "Select a date range";
    // Example: Jan 1, 2023 - Jan 31, 2023
    const fromFormatted = format(from, "MMM d, yyyy");
    const toFormatted = format(to, "MMM d, yyyy");
    return `${fromFormatted} - ${toFormatted}`;
  };

  const displayDate = formatDateRange(selectedDateRange.from, selectedDateRange.to);

  return (
    // The parent div in layout.tsx already provides p-5.
    // This div controls the flow and spacing of dashboard elements.
    <div className="flex flex-col gap-6">
      {/* Header Row: Title and Date Picker */}
      {/* Increased bottom margin for more space below this header row */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-2">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <DateRangePicker displayDateRange={displayDate} />
      </div>

      {/* Stat Cards Row */}
      {/* Adjusted gap to match reference more closely */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCardItems.map((item) => (
          <StatCard
            key={item.id}
            id={item.id}
            title={item.title}
            value={item.value}
            icon={item.icon}
            percentageChange={item.percentageChange}
            trend={item.trend}
            trendColor={item.trendColor}
            bgColor={item.bgColor}
          />
        ))}
      </div>

      {/* Sales Chart Row */}
      <div className="grid grid-cols-1 gap-5">
        <SalesChart data={salesChartData} />
      </div>

      {/* Latest Orders Table Row */}
      <div className="grid grid-cols-1 gap-5">
        <LatestOrdersTable data={latestOrdersData} />
      </div>
    </div>
  );
};

export default DashboardPage;
