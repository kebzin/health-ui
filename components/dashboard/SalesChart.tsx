"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer, // Replaced ChartContainer with ResponsiveContainer for direct Recharts use
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SalesChartDataItem } from "@/app/(root)/dashboard-data";
import { Button } from "@/components/ui/button"; // For "View Report"

interface SalesChartProps {
  data: SalesChartDataItem[];
}

// Define the chart configuration for colors
const onlineSalesColor = "#7F56D9"; // Main purple from reference
const offlineSalesColor = "#B39DDB"; // Lighter purple for offline sales from reference (approx)

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <Card className="shadow-md border border-gray-100 bg-white rounded-lg">
      <CardHeader className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Sales Details
            </CardTitle>
            {/* Description removed as it's not in the reference image for this card */}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 sm:mt-0 text-sm text-purple-600 border-purple-300 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-500"
          >
            View Report
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 py-4 sm:p-5"> {/* Adjusted padding for responsiveness */}
        <div className="h-[320px] w-full"> {/* Slightly increased height */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: -15, bottom: 5 }} // Adjusted margins
              barGap={8} // Gap between bars of the same group
              barCategoryGap="20%" // Gap between groups of bars
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.08)" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                tickMargin={10}
                tickFormatter={(value) => value.slice(0, 3)}
                className="text-xs font-medium text-gray-500"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs font-medium text-gray-500"
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : `${value}`}
              />
              <Tooltip
                cursor={{ fill: 'rgba(127, 86, 217, 0.05)' }}
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: '0.375rem', // Tailwind's rounded-md
                  border: '1px solid #e5e7eb', // gray-200
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)', // shadow-md
                  padding: '8px 12px',
                }}
                labelStyle={{ marginBottom: '4px', fontWeight: '600', color: '#374151' /* gray-700 */ }}
                itemStyle={{ fontSize: '12px', color: '#4b5563' /* gray-600 */}}
              />
              <Legend
                verticalAlign="top"
                align="right"
                wrapperStyle={{ top: -10, right: 0, fontSize: '12px', color: '#4b5563' /* gray-600 */ }}
                iconType="circle"
                iconSize={8}
                formatter={(value, entry) => (
                  <span className="ml-1.5">{value}</span>
                )}
              />
              <Bar
                dataKey="Online Sales"
                fill={onlineSalesColor}
                radius={[4, 4, 0, 0]}
                barSize={12} // Adjusted bar size
              />
              <Bar
                dataKey="Offline Sales"
                fill={offlineSalesColor}
                radius={[4, 4, 0, 0]}
                barSize={12} // Adjusted bar size
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
