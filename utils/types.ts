import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  jobTitle: string; //position
  company: string;
  location: string;
  status: string;
  dateApplied: Date; //additional
  mode: string;
  jobUrl?: string; //additional //optional
};

export enum JobStatus {
  Pending = "Pending",
  Applied = "Applied",
  Interviewing = "Interviewing",
  Offer = "Offer",
  Declined = "Declined",
  Rejected = "Rejected",
}

export enum JobMode {
  FullTime = "FullTime",
  PartTime = "PartTime",
  Internship = "Internship",
}

export const createAndEditJobSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job Title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
  dateApplied: z.date(),
  jobUrl: z.string().url().optional().or(z.literal("")),
});

export type createAndEditJobType = z.infer<typeof createAndEditJobSchema>;
