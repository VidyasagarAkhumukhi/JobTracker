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
      <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
        <StatsLoadingCard />
        <StatsLoadingCard />
        <StatsLoadingCard />
      </div>
    );

  //   Pending: 0,
  //   Applied: 0,
  //   Interviewing: 0,
  //   Offer: 0,
  //   Declined: 0,
  //   Rejected: 0,
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="pending jobs" value={data?.Pending || 0} />
      <StatsCard title="applied jobs" value={data?.Applied || 0} />
      <StatsCard title="interviews set" value={data?.Interviewing || 0} />
      <StatsCard title="offers received" value={data?.Offer || 0} />
      <StatsCard title="jobs declined" value={data?.Declined || 0} />
      <StatsCard title="rejections received" value={data?.Rejected || 0} />
    </div>
  );
};
export default StatsContainer;
