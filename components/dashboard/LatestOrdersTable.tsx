"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // For "View All"
import { LatestOrderItem, OrderStatus } from "@/app/(root)/dashboard-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For customer avatars

interface LatestOrdersTableProps {
  data: LatestOrderItem[];
}

const getStatusBadgeVariant = (
  status: OrderStatus
): "default" | "secondary" | "destructive" | "outline" => {
  switch (status) {
    case "Delivered":
      return "default"; // Usually green, depends on theme
    case "Pending":
      return "secondary"; // Usually yellow/orange, depends on theme
    case "Cancelled":
      return "destructive"; // Usually red, depends on theme
    default:
      return "outline";
  }
};

// Custom styles for badges to match the reference lozenge shape and colors
const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700", // Reference uses orange for Pending
  Cancelled: "bg-red-100 text-red-700",
};

export const LatestOrdersTable: React.FC<LatestOrdersTableProps> = ({
  data,
}) => {
  return (
    <Card className="shadow-md border border-gray-100 bg-white rounded-lg">
      <CardHeader className="p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Latest Orders
            </CardTitle>
            {/* Description removed as it's not in the reference image for this card */}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 sm:mt-0 text-sm text-purple-600 border-purple-300 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-500"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 sm:p-5 sm:pt-0"> {/* Remove padding for full-width table on mobile, restore for sm+ */}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              {/* Reference table header is simpler, without background color, and specific bottom border */}
              <TableRow className="border-b border-gray-200">
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tracking ID</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product Name</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</TableHead>
                <TableHead className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-100">
              {data.map((order) => (
                <TableRow key={order.trackingId} className="hover:bg-gray-50 transition-colors duration-150">
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{order.trackingId}</TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.productName}</TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-3 rounded-full"> {/* Slightly larger Avatar, rounded-full */}
                        <AvatarImage src={order.customerAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(order.customer)}&background=random&size=32&font-size=0.4&bold=true&color=fff`} alt={order.customer} />
                        <AvatarFallback className="text-xs font-medium">
                          {order.customer.split(" ").map(n => n[0]).join("").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {order.customer}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.date}</TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{order.amount}</TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap text-sm">
                    <Badge
                      // variant prop is less useful here as we need specific bg/text combinations
                      className={`capitalize text-xs px-3 py-1 rounded-full font-semibold ${statusStyles[order.status]}`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
