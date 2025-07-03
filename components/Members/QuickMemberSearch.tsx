"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, AlertTriangle, ArrowLeft, UserCircle, CalendarDays, ShieldCheck, Phone, Hash } from "lucide-react";
import { useMemberStore } from "@/store/memberStore";
import { Member } from "@/app/actions/memberActions";

const QuickMemberSearch = () => {
  const {
    searchQuery,
    searchResults,
    isLoading,
    selectedMember,
    error,
    setSearchQuery,
    fetchMembers,
    setSelectedMember,
    clearSearchResults,
  } = useMemberStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      await fetchMembers();
    }
  };

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
  };

  const handleClearSelectedMember = () => {
    setSelectedMember(null);
  };

  const handleDialogVisibilityChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      clearSearchResults(); // Clear results and query when dialog is closed
    }
  };

  // Helper to format date string
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  };


  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogVisibilityChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span className="text-muted-foreground">Quick Member Search ...</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] max-h-[90vh] flex flex-col">
        {!selectedMember ? (
          <>
            <DialogHeader>
              <DialogTitle>Quick Member Search</DialogTitle>
              <DialogDescription>
                Find a member by name, Member ID, Policy No., or National ID.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSearchSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="member-search">Search Term</Label>
                <div className="flex gap-2">
                  <Input
                    id="member-search"
                    name="search"
                    placeholder="e.g., John Doe, MBR-00001, POL-987654321"
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <Button type="submit" disabled={isLoading || !searchQuery.trim()}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="mr-2 h-4 w-4" />
                    )}
                    Search
                  </Button>
                </div>
              </div>
            </form>

            <div className="flex-grow overflow-y-auto pr-2 space-y-2 min-h-[150px]">
              {isLoading && searchResults.length === 0 && (
                <div className="flex items-center justify-center text-muted-foreground pt-4">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Searching for members...</span>
                </div>
              )}
              {error && (
                <div className="text-red-600 flex items-center gap-2 p-3 bg-red-50 border border-red-300 rounded-md">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Error: {error}</span>
                </div>
              )}
              {!isLoading && !error && searchResults.length === 0 && searchQuery && !get().isLoading && (
                <p className="text-center text-muted-foreground pt-4">
                  No members found for "{searchQuery}".
                </p>
              )}
              {searchResults.map((member) => (
                <div
                  key={member.id}
                  className="p-3 border rounded-md hover:bg-accent cursor-pointer transition-colors"
                  onClick={() => handleSelectMember(member)}
                >
                  <h3 className="font-semibold text-sm text-primary">{member.fullName}</h3>
                  <p className="text-xs text-muted-foreground">
                    ID: {member.id} | Plan: {member.insurancePlanName} | Status: <span className={
                      member.eligibilityStatus === "Active" ? "text-green-600" :
                      member.eligibilityStatus === "Pending" ? "text-yellow-600" : "text-red-600"
                    }>{member.eligibilityStatus}</span>
                  </p>
                </div>
              ))}
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-auto pt-4">
              <Button variant="ghost" onClick={() => handleDialogVisibilityChange(false)}>Cancel</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelectedMember}
                className="absolute left-2 top-2 sm:left-4 sm:top-4 px-2 py-1 h-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <DialogTitle className="pt-10 sm:pt-4 text-center sm:text-left sm:ml-16">
                {selectedMember.fullName}
              </DialogTitle>
              <DialogDescription className="text-center sm:text-left sm:ml-16">
                Member ID: {selectedMember.id}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 flex-grow overflow-y-auto pr-1 space-y-3 text-sm">
              <h4 className="font-semibold text-base mb-2 border-b pb-1">Member Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex items-center">
                  <UserCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Full Name:</strong>&nbsp;{selectedMember.fullName}
                </div>
                <div className="flex items-center">
                  <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Member ID:</strong>&nbsp;{selectedMember.id}
                </div>
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Date of Birth:</strong>&nbsp;{formatDate(selectedMember.dateOfBirth)}
                </div>
                 <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                  <strong>Status:</strong>&nbsp;
                  <span className={
                      selectedMember.eligibilityStatus === "Active" ? "text-green-600 font-semibold" :
                      selectedMember.eligibilityStatus === "Pending" ? "text-yellow-600 font-semibold" :
                      selectedMember.eligibilityStatus === "Expired" ? "text-orange-600 font-semibold" : "text-red-600 font-semibold"
                    }>{selectedMember.eligibilityStatus}</span>
                </div>
                {selectedMember.nationalId && (
                  <div className="flex items-center">
                    <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
                    <strong>National ID:</strong>&nbsp;{selectedMember.nationalId}
                  </div>
                )}
                {selectedMember.contactNumber && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <strong>Contact:</strong>&nbsp;{selectedMember.contactNumber}
                  </div>
                )}
              </div>

              <h4 className="font-semibold text-base mt-4 mb-2 border-b pb-1">Insurance Information</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                <div><strong>Plan Name:</strong>&nbsp;{selectedMember.insurancePlanName}</div>
                <div><strong>Policy Number:</strong>&nbsp;{selectedMember.policyNumber}</div>
                {selectedMember.effectiveDate && <div><strong>Effective Date:</strong>&nbsp;{formatDate(selectedMember.effectiveDate)}</div>}
                {selectedMember.terminationDate && <div><strong>Termination Date:</strong>&nbsp;{formatDate(selectedMember.terminationDate)}</div>}
                {selectedMember.pcpName && <div><strong>PCP:</strong>&nbsp;{selectedMember.pcpName}</div>}
              </div>

              {selectedMember.address && (
                 <>
                   <h4 className="font-semibold text-base mt-4 mb-2 border-b pb-1">Contact Information</h4>
                    <div><strong>Address:</strong>&nbsp;{selectedMember.address}</div>
                 </>
              )}

            </div>
            <DialogFooter className="flex justify-end gap-2 mt-auto pt-4">
               <Button variant="outline" onClick={() => handleDialogVisibilityChange(false)}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuickMemberSearch;
