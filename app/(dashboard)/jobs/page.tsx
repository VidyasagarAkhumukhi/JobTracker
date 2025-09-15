import React from "react";
import JobsList from "@/components/JobsList";
import SearchForm from "@/components/SearchForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllJobsAction } from "@/utils/actions";
import { Briefcase, Search, Filter, TrendingUp } from "lucide-react";

const AllJobsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["jobs", "", "all", 1],
    queryFn: () => getAllJobsAction({}),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Job Applications
              </h1>
              <p className="text-muted-foreground">
                Manage and track all your job applications
              </p>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="hidden md:flex items-center gap-4 bg-card border rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-foreground">
                Track Progress
              </span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Search className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                Smart Search
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Find jobs by title, company, or status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <Filter className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-sm text-green-900 dark:text-green-100">
                Status Filtering
              </h3>
              <p className="text-xs text-green-700 dark:text-green-300">
                Filter by application status
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div>
              <h3 className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                Progress Tracking
              </h3>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Monitor application progress
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="space-y-6">
          {/* Enhanced Search Form */}
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Search & Filter
              </h2>
              <p className="text-sm text-muted-foreground">
                Find specific applications or filter by status
              </p>
            </div>
            <div className="p-6">
              <SearchForm />
            </div>
          </div>

          {/* Jobs List Section */}
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Your Applications
              </h2>
              <p className="text-sm text-muted-foreground">
                All your job applications in one place
              </p>
            </div>
            <div className="p-6">
              <JobsList />
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default AllJobsPage;
