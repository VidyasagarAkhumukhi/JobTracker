"use client";
import React from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";

const SearchContainer = () => {
  // set default values
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  // Function to get status-specific styling
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "applied":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "interviewing":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "offer":
        return "bg-green-100 text-green-800 border-green-300";
      case "declined":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "all":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const jobStatus = formData.get("jobStatus") as string;
    params.set("search", search);
    params.set("jobStatus", jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3  gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search Jobs"
        name="search"
        defaultValue={search}
        className="bg-white"
      />
      <Select defaultValue={jobStatus} name="jobStatus">
        <SelectTrigger className={`${getStatusStyle(jobStatus)}`}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["all", ...Object.values(JobStatus)].map((status) => {
            return (
              <SelectItem
                key={status}
                value={status}
                className={`${getStatusStyle(status)} hover:opacity-80`}
              >
                {status}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Search</Button>
    </form>
  );
};
export default SearchContainer;
