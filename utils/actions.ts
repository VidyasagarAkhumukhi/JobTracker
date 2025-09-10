"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import { JobType, createAndEditJobType, createAndEditJobSchema } from "./types";
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
    return job as JobType;
  } catch (error) {
    console.error(error);
    return null;
  }
};
