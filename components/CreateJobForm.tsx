"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  createAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import {
  CustomFormField,
  CustomFormSelect,
  CustomFormDate,
} from "./FormComponents";

import AiAutofillButton from "./AiAutoFillButton";

const CreateJobForm = () => {
  const form = useForm<createAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      company: "",
      jobTitle: "",
      status: JobStatus.Pending,
      dateApplied: new Date(),
      location: "",
      mode: JobMode.FullTime,
      jobUrl: "",
    },
  });

  // This function receives the data from the AiAutofillButton component
  const handleAutofillData = (data: {
    jobTitle: string;
    company: string;
    location: string;
  }) => {
    // Use form.setValue to update the form fields with the AI-generated data
    form.setValue("jobTitle", data.jobTitle || "", { shouldValidate: true });
    form.setValue("company", data.company || "", { shouldValidate: true });
    form.setValue("location", data.location || "", { shouldValidate: true });
  };

  const onSubmit = (values: createAndEditJobType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>

        {/* --- USE THE NEW COMPONENT HERE --- */}
        <AiAutofillButton onAutofill={handleAutofillData} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="jobTitle" control={form.control} />
          {/* Company */}
          <CustomFormField name="company" control={form.control} />
          {/* Location */}
          <CustomFormField name="location" control={form.control} />

          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />
          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          {/* Date applied */}
          <CustomFormDate
            name="dateApplied"
            control={form.control}
            labelText="date applied"
          />

          {/* job url optional */}
          <CustomFormField name="jobUrl" control={form.control} />

          <Button type="submit" className="self-end capitalize">
            Create job
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateJobForm;
