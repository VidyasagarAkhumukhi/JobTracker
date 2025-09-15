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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

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

  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: createAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast("There was an error");
        return;
      }
      toast("Job created");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      router.push("/jobs");
      // form.reset();
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
    mutate(values);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card border shadow-sm p-8 rounded-xl space-y-8"
        >
          {/* Form Header */}
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Job Application Details
            </h2>
            <p className="text-muted-foreground">
              Fill in the job information below or use AI auto-fill to populate
              fields automatically.
            </p>
          </div>

          {/* AI Auto-fill Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <span className="text-primary">🤖</span>
              AI-Powered Auto-Fill
            </h3>
            <AiAutofillButton onAutofill={handleAutofillData} />
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">
              Application Information
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Job Title */}
              <div className="lg:col-span-1">
                <CustomFormField name="jobTitle" control={form.control} />
              </div>
              {/* Company */}
              <div className="lg:col-span-1">
                <CustomFormField name="company" control={form.control} />
              </div>
              {/* Location */}
              <div className="lg:col-span-1">
                <CustomFormField name="location" control={form.control} />
              </div>

              {/* Job Status */}
              <div className="lg:col-span-1">
                <CustomFormSelect
                  name="status"
                  control={form.control}
                  labelText="Application Status"
                  items={Object.values(JobStatus)}
                />
              </div>
              {/* Job Mode */}
              <div className="lg:col-span-1">
                <CustomFormSelect
                  name="mode"
                  control={form.control}
                  labelText="Employment Type"
                  items={Object.values(JobMode)}
                />
              </div>
              {/* Date Applied */}
              <div className="lg:col-span-1">
                <CustomFormDate
                  name="dateApplied"
                  control={form.control}
                  labelText="Date Applied"
                />
              </div>

              {/* Job URL */}
              <div className="lg:col-span-3">
                <CustomFormField name="jobUrl" control={form.control} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <Button
              type="submit"
              className="px-8 py-2 text-lg font-medium"
              disabled={isPending}
              size="lg"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Application...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Job Application
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJobForm;
