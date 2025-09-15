import React from "react";
import { JobType } from "@/utils/types";
import {
  MapPin,
  Briefcase,
  CalendarDays,
  RadioTower,
  ExternalLink,
} from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobInfo from "./JobInfo";
import DeleteJobBtn from "./DeleteJobBtn";

function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.dateApplied).toLocaleDateString();

  // Function to get status-specific styling
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200";
      case "applied":
        return "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200";
      case "interviewing":
        return "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200";
      case "offer":
        return "bg-green-100 text-green-800 border-green-300 hover:bg-green-200";
      case "declined":
        return "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200";
    }
  };

  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.jobTitle}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
        {job.jobUrl && (
          <a
            href={job.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Job URL
          </a>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />
        <Badge
          className={`w-full max-w-32 justify-center ${getStatusStyle(
            job.status
          )}`}
        >
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobBtn id={job.id} />
      </CardFooter>
    </Card>
  );
}
export default JobCard;
