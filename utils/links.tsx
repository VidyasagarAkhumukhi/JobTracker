import { AreaChart, Briefcase, Plus, BarChart3 } from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
};

const links: NavLink[] = [
  {
    href: "/add-job",
    label: "add job",
    icon: <Plus />,
    description: "Create new job applications",
  },
  {
    href: "/jobs",
    label: "all jobs",
    icon: <Briefcase />,
    description: "View and manage applications",
  },
  {
    href: "/stats",
    label: "analytics",
    icon: <BarChart3 />,
    description: "Track your progress",
  },
];

export default links;
