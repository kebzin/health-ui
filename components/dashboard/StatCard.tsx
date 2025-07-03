"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconArrowUpRight, IconArrowDownRight } from "@tabler/icons-react";
import type { StatCardData } from "@/app/(root)/dashboard-data";

interface StatCardProps extends StatCardData {
  iconBgColor?: string; // For the icon background
  iconColor?: string;   // For the icon color itself
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  percentageChange,
  trend,
  // trendColor is now handled by green/red text utility classes directly
  // bgColor is the card background, which is white in reference
  iconBgColor = "bg-gray-100", // Default icon background
  iconColor = "text-gray-600",   // Default icon color
}) => {
  const TrendIcon = trend === "up" ? IconArrowUpRight : IconArrowDownRight;
  const trendTextColor = trend === "up" ? "text-green-600" : "text-red-600";

  return (
    <Card className="shadow-md border border-gray-100 bg-white rounded-lg">
      <CardContent className="p-5 flex items-center space-x-4">
        <div className={cn("p-3 rounded-full", iconBgColor)}>
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          <div className="flex items-center text-xs mt-1">
            <TrendIcon
              className={cn("h-4 w-4 mr-0.5", trendTextColor)}
            />
            <span className={cn(trendTextColor, "font-medium")}>
              {percentageChange}
            </span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
