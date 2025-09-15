import React from "react";
import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";
import { getChartsDataAction, getStatsAction } from "@/utils/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { BarChart3, TrendingUp, Target, Eye, Lightbulb } from "lucide-react";

const StatsPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["charts"],
    queryFn: () => getChartsDataAction(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Analytics & Insights
            </h1>
            <p className="text-muted-foreground text-lg">
              Track your job search progress and performance
            </p>
          </div>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Eye className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                Application Overview
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                Monitor your application status distribution
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-sm text-green-900 dark:text-green-100">
                Progress Tracking
              </h3>
              <p className="text-xs text-green-700 dark:text-green-300">
                Visualize your application trends over time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <Target className="h-5 w-5 text-purple-600" />
            <div>
              <h3 className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                Success Metrics
              </h3>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                Track interviews, offers, and conversions
              </p>
            </div>
          </div>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="space-y-8">
          {/* Stats Overview Section */}
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Application Statistics
              </h2>
              <p className="text-sm text-muted-foreground">
                Current status of all your job applications
              </p>
            </div>
            <div className="p-6">
              <StatsContainer />
            </div>
          </div>

          {/* Charts Section */}
          <div className="bg-card border rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-foreground mb-1">
                Trends & Analytics
              </h2>
              <p className="text-sm text-muted-foreground">
                Visual representation of your job search progress over time
              </p>
            </div>
            <div className="p-6">
              <ChartsContainer />
            </div>
          </div>

          {/* Insights & Tips Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
            <div className="p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    💡 Job Search Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">
                        Application Strategy
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          Aim for 10-15 applications per week for optimal
                          results
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          Follow up on applications after 1-2 weeks
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">
                        Interview Success
                      </h4>
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          A 5-10% interview rate is considered healthy
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          Track which job boards yield the best results
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default StatsPage;
