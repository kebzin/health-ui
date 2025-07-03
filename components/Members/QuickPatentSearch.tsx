"use client";

import React, { useEffect, useState } from "react";
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
import { Search, Loader2, AlertTriangle, ArrowLeft } from "lucide-react";
import { usePatentStore } from "@/store/patentStore"; // Assuming alias @ is set up for app directory
import { Patent } from "@/app/actions/patentActions";

const QuickPatentSearch = () => {
  const {
    searchQuery,
    searchResults,
    isLoading,
    selectedPatent,
    error,
    setSearchQuery,
    fetchPatents,
    setSelectedPatent,
    clearSearchResults,
  } = usePatentStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      await fetchPatents();
    }
  };

  const handleSelectPatent = (patent: Patent) => {
    setSelectedPatent(patent);
  };

  const handleClearSelectedPatent = () => {
    setSelectedPatent(null);
  };

  const handleDialogClose = () => {
    // Reset state when dialog is closed
    clearSearchResults();
    setIsDialogOpen(false);
  };

  // Effect to clear results when dialog is closed using the X button or ESC
  useEffect(() => {
    if (!isDialogOpen) {
      clearSearchResults();
    }
  }, [isDialogOpen, clearSearchResults]);


  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          <span className="text-muted-foreground">Quick Patent Search ...</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
        {!selectedPatent ? (
          <>
            <DialogHeader>
              <DialogTitle>Search Patent</DialogTitle>
              <DialogDescription>
                Find a patent by its title, abstract, ID, or applicant.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSearch} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="patent-search">Search Term</Label>
                <div className="flex gap-2">
                  <Input
                    id="patent-search"
                    name="search"
                    placeholder="e.g., Quantum Computing, US-20230000001-A1"
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

            <div className="flex-grow overflow-y-auto pr-2 space-y-2">
              {isLoading && searchResults.length === 0 && (
                <div className="flex items-center justify-center text-muted-foreground">
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  <span>Searching...</span>
                </div>
              )}
              {error && (
                <div className="text-red-500 flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Error: {error}</span>
                </div>
              )}
              {!isLoading && !error && searchResults.length === 0 && searchQuery && (
                <p className="text-center text-muted-foreground">
                  No patents found for "{searchQuery}".
                </p>
              )}
              {searchResults.map((patent) => (
                <div
                  key={patent.id}
                  className="p-3 border rounded-md hover:bg-accent cursor-pointer"
                  onClick={() => handleSelectPatent(patent)}
                >
                  <h3 className="font-semibold text-sm">{patent.title}</h3>
                  <p className="text-xs text-muted-foreground truncate">
                    {patent.id} {patent.applicant ? `| ${patent.applicant}` : ''}
                  </p>
                </div>
              ))}
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={handleDialogClose}>Cancel</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSelectedPatent}
                className="absolute left-4 top-4 px-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to results
              </Button>
              <DialogTitle className="pt-8 sm:pt-0 sm:pl-20">{selectedPatent.title}</DialogTitle>
              <DialogDescription className="sm:pl-20">
                ID: {selectedPatent.id} {selectedPatent.pubDate ? `| Published: ${selectedPatent.pubDate}` : ''}
                {selectedPatent.applicant ? ` | Applicant: ${selectedPatent.applicant}` : ''}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 flex-grow overflow-y-auto pr-1">
              <h4 className="font-semibold mt-2 mb-1">Abstract:</h4>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {selectedPatent.abstract}
              </p>
            </div>
            <DialogFooter className="flex justify-end gap-2 mt-auto">
               <Button variant="ghost" onClick={handleDialogClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default QuickPatentSearch;
