"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import {
  JobType,
  createAndEditJobType,
  createAndEditJobSchema,
  JobStatus,
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

async function authenticateAndRedirect(): Promise<string> {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  return userId;
}

export const createJobAction = async (
  values: createAndEditJobType
): Promise<JobType | null> => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = await authenticateAndRedirect();
  try {
    createAndEditJobSchema.parse(values);
    const job = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
};

type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
};

export const getAllJobsAction = async ({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> => {
  const userId = await authenticateAndRedirect();

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };
    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            jobTitle: {
              //position
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }
    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return { jobs, count: 0, page: 1, totalPages: 0 };
  } catch (error) {
    console.error(error);
    return { jobs: [], count: 0, page: 1, totalPages: 0 };
  }
};

// deleting job
export const deleteJobAction = async (id: string): Promise<JobType | null> => {
  const userId = await authenticateAndRedirect();

  try {
    const job = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });

    return job;
  } catch (error) {
    return null;
  }
};

export const getSingleJobAction = async (
  id: string
): Promise<JobType | null> => {
  let job: JobType | null = null;
  const userId = await authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    job = null;
  }
  if (!job) {
    redirect("/jobs");
  }
  return job;
};

export const updateJobAction = async (
  id: string,
  values: createAndEditJobType
): Promise<JobType | null> => {
  const userId = await authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
};
