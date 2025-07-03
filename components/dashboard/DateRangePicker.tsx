"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { IconCalendarEvent } from "@tabler/icons-react"; // Using Tabler icon

interface DateRangePickerProps {
  // In a real app, you'd have props for dates, onDateChange, etc.
  // For now, it's mostly presentational based on the image.
  displayDateRange?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  displayDateRange = "Jan 1, 2023 - Jan 31, 2023",
}) => {
  return (
    <Button
      variant="outline"
      // Reference styling: white background, gray border, gray text, purple focus ring.
      // Icon is slightly darker gray. Text is primary interactive element.
      className="
        flex items-center text-sm font-medium
        bg-white border-gray-200 hover:bg-gray-50
        text-gray-700 hover:text-gray-800
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
        px-4 py-2 rounded-md shadow-sm
      "
    >
      <IconCalendarEvent className="h-5 w-5 mr-2.5 text-gray-400" />
      <span>{displayDateRange}</span>
      {/* No dropdown arrow in reference image for this specific button */}
    </Button>
  );
};
