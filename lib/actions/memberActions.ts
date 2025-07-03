"use server";

import { z } from "zod";

// Define the structure of a Member
export interface Member {
  id: string; // Membership ID
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  insurancePlanName: string;
  policyNumber: string;
  eligibilityStatus: "Active" | "Inactive" | "Pending" | "Expired";
  contactNumber?: string;
  nationalId?: string;
  address?: string;
  pcpName?: string; // Primary Care Physician
  effectiveDate?: string; // YYYY-MM-DD
  terminationDate?: string; // YYYY-MM-DD
}

// Sample member data (simulating a database or external API)
const sampleMembers: Member[] = [
  {
    id: "MBR-00001",
    fullName: "John Michael Doe",
    dateOfBirth: "1985-07-22",
    insurancePlanName: "Premium Health Plan",
    policyNumber: "POL-987654321",
    eligibilityStatus: "Active",
    contactNumber: "555-0101",
    nationalId: "NID-123456789",
    address: "123 Main St, Anytown, USA",
    pcpName: "Dr. Emily Carter",
    effectiveDate: "2023-01-01",
    terminationDate: "2024-12-31",
  },
  {
    id: "MBR-00002",
    fullName: "Alice Jane Smith",
    dateOfBirth: "1992-03-15",
    insurancePlanName: "Standard Care",
    policyNumber: "POL-123450987",
    eligibilityStatus: "Active",
    contactNumber: "555-0102",
    nationalId: "NID-987654321",
    address: "456 Oak Ave, Anytown, USA",
    pcpName: "Dr. Ben Miller",
    effectiveDate: "2022-06-01",
    terminationDate: "2024-05-31",
  },
  {
    id: "MBR-00003",
    fullName: "Robert Brown",
    dateOfBirth: "1978-11-02",
    insurancePlanName: "Basic Coverage",
    policyNumber: "POL-A5B6C7D8E",
    eligibilityStatus: "Inactive",
    contactNumber: "555-0103",
    nationalId: "NID-A1B2C3D4E",
    address: "789 Pine Rd, Otherville, USA",
    pcpName: "Dr. Sarah Wilson",
    effectiveDate: "2021-03-15",
    terminationDate: "2023-03-14",
  },
  {
    id: "MBR-00004",
    fullName: "Emily Sarah Johnson",
    dateOfBirth: "2001-09-10",
    insurancePlanName: "Student Health Initiative",
    policyNumber: "POL-S1T2U3V4W",
    eligibilityStatus: "Pending",
    nationalId: "NID-S9T8R7Q6P",
    address: "101 University Dr, Collegetown, USA",
    effectiveDate: "2023-09-01",
  },
  {
    id: "MBR-00005",
    fullName: "David Lee",
    dateOfBirth: "1965-01-30",
    insurancePlanName: "Senior Wellness Program",
    policyNumber: "POL-X1Y2Z3A4B",
    eligibilityStatus: "Active",
    contactNumber: "555-0105",
    nationalId: "NID-X5Y6Z7A8B",
    address: "202 Elder Ct, Peaceful Valley, USA",
    pcpName: "Dr. James Anderson",
    effectiveDate: "2020-02-01",
    terminationDate: "2025-01-31",
  },
  {
    id: "MBR-00006",
    fullName: "Maria Garcia Rodriguez",
    dateOfBirth: "1988-06-05",
    insurancePlanName: "FamilyCare Plus",
    policyNumber: "POL-FGH678JKL",
    eligibilityStatus: "Expired",
    contactNumber: "555-0106",
    nationalId: "NID-MGR456XYZ",
    address: "303 Maple Drive, Suburbia, USA",
    pcpName: "Dr. Laura Chen",
    effectiveDate: "2022-01-01",
    terminationDate: "2023-12-31",
  }
];

// Schema for validating the search query
const searchSchema = z.string().min(1, "Search query cannot be empty.");

export async function searchMembersAction(
  query: string
): Promise<Member[]> {
  console.log(`Server Action: Searching members with query: "${query}"`);
  try {
    searchSchema.parse(query); // Validate query

    if (!query.trim()) {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const results = sampleMembers.filter(
      (member) =>
        member.fullName.toLowerCase().includes(lowerCaseQuery) ||
        member.id.toLowerCase().includes(lowerCaseQuery) ||
        member.policyNumber.toLowerCase().includes(lowerCaseQuery) ||
        (member.nationalId && member.nationalId.toLowerCase().includes(lowerCaseQuery)) ||
        (member.contactNumber && member.contactNumber.includes(lowerCaseQuery)) // Contact number might not need toLowerCase
    );

    console.log(`Server Action: Found ${results.length} members.`);
    return results;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Server Action: Validation error:", error.errors);
      throw new Error("Invalid search query.");
    }
    console.error("Server Action: Error searching members:", error);
    throw new Error("Failed to search members.");
  }
}
