import CreateJobForm from "@/components/CreateJobForm";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Plus, Briefcase, Sparkles } from "lucide-react";

const AddJobPage = () => {
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Add New Job Application
          </h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Track your job applications efficiently. Use our AI-powered auto-fill
          feature to quickly extract job details from any job posting.
        </p>

        {/* Quick Tips */}
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-sm text-primary mb-1">
                💡 Pro Tip
              </h3>
              <p className="text-sm text-muted-foreground">
                Copy and paste the complete job description into the AI
                Auto-Fill section below to automatically populate the form
                fields. This saves you time and ensures accuracy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CreateJobForm />
      </HydrationBoundary>

      {/* Footer Helper */}
      <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
        <div className="flex items-center gap-3 mb-3">
          <Briefcase className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-foreground">
            Application Tracking Tips
          </h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            Keep job URLs for easy reference to original postings
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            Update application status as you progress through the hiring process
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            Use accurate application dates for better tracking and follow-ups
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AddJobPage;
