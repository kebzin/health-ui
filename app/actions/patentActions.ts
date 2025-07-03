"use server";

import { z } from "zod";

// Define the structure of a patent
export interface Patent {
  id: string;
  title: string;
  abstract: string;
  applicant?: string; // Making applicant optional as per previous examples
  pubDate?: string; // Making publication date optional
}

// Sample patent data (simulating a database or external API)
const samplePatents: Patent[] = [
  {
    id: "US-20230000001-A1",
    title: "System and Method for Autonomous Vehicle Navigation",
    abstract:
      "A system and method for autonomous vehicle navigation includes a sensor suite, a processing unit, and a control system. The sensor suite gathers data about the vehicle's surroundings. The processing unit processes the sensor data to generate a navigation path. The control system actuates vehicle controls to follow the navigation path.",
    applicant: "Tech Innovations Inc.",
    pubDate: "2023-01-05",
  },
  {
    id: "US-20230000002-A1",
    title: "AI-Powered Drug Discovery Platform",
    abstract:
      "An AI-powered platform for accelerating drug discovery. The platform uses machine learning algorithms to analyze biological data, predict drug efficacy, and identify potential candidates. It aims to reduce the time and cost of developing new pharmaceuticals.",
    applicant: "BioPharma Solutions",
    pubDate: "2023-01-12",
  },
  {
    id: "US-20230000003-A1",
    title: "Quantum Computing Architecture for Complex Simulations",
    abstract:
      "A novel quantum computing architecture designed for performing complex simulations. This architecture offers significant speedups over classical computers for problems in materials science, cryptography, and financial modeling.",
    applicant: "Quantum Leap Corp.",
    pubDate: "2023-01-19",
  },
  {
    id: "EP-1000000-A1",
    title: "Renewable Energy Storage Solution using Graphene Supercapacitors",
    abstract:
      "A high-capacity energy storage solution utilizing graphene-based supercapacitors. This technology provides long cycle life, rapid charging, and improved energy density for renewable energy systems and electric vehicles.",
    applicant: "GreenEnergy Ltd.",
    pubDate: "2023-02-01",
  },
  {
    id: "WO-2023000004-A1",
    title: "Personalized Learning Platform with Adaptive Curriculum",
    abstract:
      "An online learning platform that uses AI to create personalized learning paths for students. The platform adapts the curriculum based on individual student performance and learning styles, optimizing educational outcomes.",
    applicant: "EduTech Global",
    pubDate: "2023-02-10",
  },
];

// Schema for validating the search query (optional but good practice)
const searchSchema = z.string().min(1, "Search query cannot be empty.");

export async function searchPatentsAction(
  query: string
): Promise<Patent[]> {
  console.log(`Server Action: Searching patents with query: "${query}"`);
  try {
    // Validate the query (optional)
    searchSchema.parse(query);

    if (!query.trim()) {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();

    // Simulate a delay (like a real API call)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const results = samplePatents.filter(
      (patent) =>
        patent.title.toLowerCase().includes(lowerCaseQuery) ||
        patent.abstract.toLowerCase().includes(lowerCaseQuery) ||
        patent.id.toLowerCase().includes(lowerCaseQuery) ||
        (patent.applicant && patent.applicant.toLowerCase().includes(lowerCaseQuery))
    );

    console.log(`Server Action: Found ${results.length} patents.`);
    return results;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Server Action: Validation error:", error.errors);
      // You might want to throw a custom error or return a specific error response
      throw new Error("Invalid search query.");
    }
    console.error("Server Action: Error searching patents:", error);
    // In a real app, you might throw the error or return an empty array/error object
    throw new Error("Failed to search patents.");
  }
}
