"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const QuickMemberSearch = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span className="text-muted-foreground">Quick Member Search ...</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Search Member</DialogTitle>
          <DialogDescription>
            Find a member by their full name or membership ID.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="member-search">Name or ID</Label>
            <Input
              id="member-search"
              name="search"
              placeholder="e.g., John Doe or MBR-10293"
              className="w-full"
              autoFocus
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Search</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuickMemberSearch;
