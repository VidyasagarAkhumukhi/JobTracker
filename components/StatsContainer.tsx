"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import StatsCard, { StatsLoadingCard } from "./StatsCard";

const StatsContainer = () => {
  const { data, isPending } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  if (isPending)
    return (
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3">
        <StatsCard title="Pending Applications" value={data?.Pending || 0} />
        <StatsCard title="Applied Jobs" value={data?.Applied || 0} />
        <StatsCard
          title="Interviews Scheduled"
          value={data?.Interviewing || 0}
        />
        <StatsCard title="Offers Received" value={data?.Offer || 0} />
        <StatsCard title="Applications Declined" value={data?.Declined || 0} />
        <StatsCard title="Rejections Received" value={data?.Rejected || 0} />
      </div>

      {/* Summary Section */}
      <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
        <h3 className="font-semibold text-foreground mb-3">
          Application Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(data?.Pending || 0) +
                (data?.Applied || 0) +
                (data?.Interviewing || 0) +
                (data?.Offer || 0) +
                (data?.Declined || 0) +
                (data?.Rejected || 0)}
            </div>
            <div className="text-muted-foreground">Total Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {(data?.Interviewing || 0) + (data?.Offer || 0)}
            </div>
            <div className="text-muted-foreground">Positive Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {data?.Interviewing || 0}
            </div>
            <div className="text-muted-foreground">Active Interviews</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {data?.Offer || 0}
            </div>
            <div className="text-muted-foreground">Job Offers</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StatsContainer;
