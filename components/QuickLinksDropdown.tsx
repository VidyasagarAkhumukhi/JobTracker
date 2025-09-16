"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Zap,
  Building2,
  Users,
  Globe,
  MapPin,
  Briefcase,
} from "lucide-react";

const QuickLinksDropdown = () => {
  const [open, setOpen] = useState(false);
  const jobBoards = [
    {
      name: "LinkedIn Jobs",
      url: "https://www.linkedin.com/jobs/",
      icon: <Users className="h-4 w-4" />,
      description: "Professional network jobs",
      category: "professional",
    },
    {
      name: "Indeed",
      url: "https://www.indeed.com/",
      icon: <Globe className="h-4 w-4" />,
      description: "World's largest job site",
      category: "general",
    },
    {
      name: "Glassdoor",
      url: "https://www.glassdoor.com/Job/index.htm",
      icon: <Building2 className="h-4 w-4" />,
      description: "Jobs with company insights",
      category: "insights",
    },
    {
      name: "ZipRecruiter",
      url: "https://www.ziprecruiter.com/",
      icon: <Zap className="h-4 w-4" />,
      description: "AI-powered job matching",
      category: "ai",
    },
    {
      name: "Monster",
      url: "https://www.monster.com/",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Career advancement platform",
      category: "career",
    },
    {
      name: "CareerBuilder",
      url: "https://www.careerbuildercareers.com/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Build your career",
      category: "career",
    },
  ];

  const remoteJobBoards = [
    {
      name: "RemoteYeah",
      url: "https://remoteyeah.com/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Remote job opportunities",
    },
    {
      name: "NoDesk",
      url: "https://nodesk.co/remote-jobs/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Remote work directory",
    },
    {
      name: "RemoteOK",
      url: "https://remoteok.io/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Remote tech jobs",
    },
    {
      name: "We Work Remotely",
      url: "https://weworkremotely.com/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Remote-first job board",
    },
    {
      name: "Remote.co",
      url: "https://remote.co/remote-jobs/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Remote work opportunities",
    },
  ];

  const techJobBoards = [
    {
      name: "Wellfound",
      url: "https://wellfound.com/",
      icon: <Zap className="h-4 w-4" />,
      description: "Startup jobs & equity (formerly AngelList)",
    },
    {
      name: "Stack Overflow Jobs",
      url: "https://stackoverflowjobs.com/?co=GB",
      icon: <Globe className="h-4 w-4" />,
      description: "Developer-focused jobs",
    },
    {
      name: "Dice",
      url: "https://www.dice.com/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Tech career marketplace",
    },
    {
      name: "GitHub Jobs",
      url: "https://www.github.careers/careers-home",
      icon: <Globe className="h-4 w-4" />,
      description: "Developer jobs on GitHub",
    },
    {
      name: "Hacker News Jobs",
      url: "https://news.ycombinator.com/jobs",
      icon: <Zap className="h-4 w-4" />,
      description: "YC community job board",
    },
    {
      name: "CrunchBoard",
      url: "https://www.crunchboard.com/",
      icon: <Building2 className="h-4 w-4" />,
      description: "TechCrunch's job board",
    },
    {
      name: "Startup.jobs",
      url: "https://startup.jobs/",
      icon: <Zap className="h-4 w-4" />,
      description: "Global startup opportunities",
    },
    {
      name: "F6S Jobs",
      url: "https://www.f6s.com/jobs",
      icon: <Building2 className="h-4 w-4" />,
      description: "Startup & founder jobs",
    },
    {
      name: "Toptal",
      url: "https://www.toptal.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Elite freelance network",
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Freelance & contract work",
    },
    {
      name: "Freelancer.com",
      url: "https://www.freelancer.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Global freelancing platform",
    },
    {
      name: "Dribbble Jobs",
      url: "https://dribbble.com/jobs",
      icon: <Building2 className="h-4 w-4" />,
      description: "Design & creative jobs",
    },
    {
      name: "Product Hunt Jobs",
      url: "https://www.producthunt.com/topics/hiring",
      icon: <Zap className="h-4 w-4" />,
      description: "Product & startup roles",
    },
    {
      name: "Tech Ladies",
      url: "https://www.hiretechladies.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Tech jobs for women",
    },
    {
      name: "Relocate.me",
      url: "https://relocate.me/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Jobs with visa sponsorship",
    },
    {
      name: "PowerToFly",
      url: "https://powertofly.com/jobs/",
      icon: <Users className="h-4 w-4" />,
      description: "Diverse tech talent",
    },
    {
      name: "Cord",
      url: "https://cord.co/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Tech recruitment platform",
    },
    {
      name: "Otta",
      url: "https://otta.com/",
      icon: <Zap className="h-4 w-4" />,
      description: "Startup job discovery",
    },
    {
      name: "Huntr",
      url: "https://huntr.co/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Job tracking & discovery",
    },
    {
      name: "Greenhouse Job Board",
      url: "https://boards.greenhouse.io/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Company-specific boards",
    },
  ];

  const irelandJobBoards = [
    {
      name: "Jobs.ie",
      url: "https://www.jobs.ie/",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Ireland's leading job site",
    },
    {
      name: "IrishJobs.ie",
      url: "https://www.irishjobs.ie/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Top Irish jobs platform",
    },
    {
      name: "Indeed Ireland",
      url: "https://ie.indeed.com/",
      icon: <Globe className="h-4 w-4" />,
      description: "Indeed's Ireland portal",
    },
    {
      name: "LinkedIn Jobs Ireland",
      url: "https://www.linkedin.com/jobs/search/?location=Ireland",
      icon: <Users className="h-4 w-4" />,
      description: "Professional jobs in Ireland",
    },
    // {
    //   name: "TheJournal Jobs",
    //   url: "https://www.thejournal.ie/jobs/",
    //   icon: <Building2 className="h-4 w-4" />,
    //   description: "Irish media job portal",
    // },
  ];

  const recruitmentAgencies = [
    {
      name: "CPL Resources",
      url: "https://www.cpl.ie/",
      icon: <Users className="h-4 w-4" />,
      description: "Leading Irish recruitment",
    },
    {
      name: "Morgan McKinley",
      url: "https://www.morganmckinley.ie/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Professional recruitment",
    },
    {
      name: "Hays Ireland",
      url: "https://www.hays.ie/",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Global recruitment experts",
    },
    {
      name: "FRS Recruitment",
      url: "https://www.frsrecruitment.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Irish recruitment specialists",
    },
    {
      name: "Reperio Human Capital",
      url: "https://www.reperiohumancapital.com/jobs-search",
      icon: <Zap className="h-4 w-4" />,
      description: "Tech recruitment Ireland",
    },
    {
      name: "Version 1 Careers",
      url: "https://www.version1.com/careers/job-listing/?searchterm=&taxonomyFilter-dept=&taxonomyFilter-location=ireland&taxonomyFilter-practice=",
      icon: <Globe className="h-4 w-4" />,
      description: "IT recruitment Ireland",
    },
    {
      name: "Collins McNicholas",
      url: "https://www.collinsmcnicholas.ie/jobs/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Professional recruitment Ireland",
    },
    {
      name: "Built In Dublin",
      url: "https://builtindublin.ie/jobs",
      icon: <Zap className="h-4 w-4" />,
      description: "Dublin tech & startup jobs",
    },
    {
      name: "Solas IT",
      url: "https://www.solasit.ie/",
      icon: <Globe className="h-4 w-4" />,
      description: "IT recruitment specialists",
    },
    {
      name: "Matrix Recruitment",
      url: "https://www.matrixrecruitment.ie/?source=google.com",
      icon: <Users className="h-4 w-4" />,
      description: "Professional staffing solutions",
    },
    {
      name: "CompuStaff",
      url: "https://www.compustaff.ie/",
      icon: <Building2 className="h-4 w-4" />,
      description: "IT & finance recruitment",
    },
    {
      name: "RealTime Jobs",
      url: "https://realtime.jobs/",
      icon: <Zap className="h-4 w-4" />,
      description: "Real-time job matching",
    },
    {
      name: "TechHeads",
      url: "https://techheads.ie/candidate-services/",
      icon: <Globe className="h-4 w-4" />,
      description: "Technology recruitment experts",
    },
    {
      name: "Workday Ireland",
      url: "https://workday.wd5.myworkdayjobs.com/en-US/Workday?q=Ireland",
      icon: <Building2 className="h-4 w-4" />,
      description: "Workday careers in Ireland",
    },
    {
      name: "Stripe Dublin",
      url: "https://stripe.com/jobs/search?office_locations=Europe--Dublin",
      icon: <Zap className="h-4 w-4" />,
      description: "Stripe careers in Dublin",
    },
    {
      name: "Hadfield Green",
      url: "https://www.hadfieldgreen.com/jobs/",
      icon: <Users className="h-4 w-4" />,
      description: "Specialist recruitment agency",
    },
    {
      name: "Simply Hired Ireland",
      url: "https://www.simplyhired.ie/",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Job search engine Ireland",
    },
  ];

  const euJobBoards = [
    {
      name: "Eurojobs",
      url: "https://www.eurojobs.com/",
      icon: <Globe className="h-4 w-4" />,
      description: "Europe-wide opportunities",
    },
    {
      name: "EuropeLanguageJobs",
      url: "https://www.europelanguagejobs.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Multilingual jobs in EU",
    },
    {
      name: "TheLocal Jobs",
      url: "https://jobs.thelocal.com/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Local European jobs",
    },
    {
      name: "European Commission",
      url: "https://ec.europa.eu/search/?QueryText=job&swlang=en",
      icon: <Users className="h-4 w-4" />,
      description: "EU skilled migration specialists",
    },
  ];

  const visaSponsorshipBoards = [
    {
      name: "Relocate.me",
      url: "https://relocate.me/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Global jobs with visa sponsorship",
    },
    {
      name: "Visa-Jobs.com",
      url: "https://www.visa-jobs.com/",
      icon: <Globe className="h-4 w-4" />,
      description: "International jobs with visas",
    },

    {
      name: "EU Blue Card Jobs",
      url: "https://www.eu-bluecard.com/jobs/",
      icon: <Globe className="h-4 w-4" />,
      description: "EU skilled worker visas",
    },
    {
      name: "TechMeAbroad",
      url: "https://nodesk.co/remote-work/techmeabroad/",
      icon: <Zap className="h-4 w-4" />,
      description: "Tech jobs with visa support",
    },
    {
      name: "JobsinBerlin.eu",
      url: "https://jobsinberlin.eu/jobs/visa-sponsored",
      icon: <MapPin className="h-4 w-4" />,
      description: "Berlin visa-sponsored roles",
    },
    {
      name: "Amsterdam Works",
      url: "https://www.jobinamsterdam.com/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Netherlands visa support",
    },
    {
      name: "Jobs.de International",
      url: "https://jobs.de/en/international",
      icon: <Globe className="h-4 w-4" />,
      description: "German jobs for internationals",
    },
    {
      name: "Stockholm Jobs",
      url: "https://www.jobsinstockholm.com/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Swedish job opportunities",
    },
    {
      name: "Denmark.dk Jobs",
      url: "https://www.workindenmark.dk/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Work in Denmark portal",
    },
    {
      name: "Portugal Jobs",
      url: "https://europeanjobdays.eu/en/workinportugal2025",
      icon: <Globe className="h-4 w-4" />,
      description: "Portuguese job market",
    },
  ];

  const visaSponsorshipAgencies = [
    {
      name: "Migrate World",
      url: "https://www.migrateworld.com/",
      icon: <Globe className="h-4 w-4" />,
      description: "International migration services",
    },
    {
      name: "European Recruitment",
      url: "https://www.euro-recruitment.com/",
      icon: <Building2 className="h-4 w-4" />,
      description: "Pan-European recruitment",
    },
    {
      name: "TalentBridge International",
      url: "https://talentbridge.com/",
      icon: <Users className="h-4 w-4" />,
      description: "Irish visa sponsorship experts",
    },
    {
      name: "WorkPermit.com",
      url: "https://workpermit.com/",
      icon: <MapPin className="h-4 w-4" />,
      description: "Global work permit guidance",
    },
    {
      name: "Blue Card Network",
      url: "https://bluecardnetwork.eu/",
      icon: <Building2 className="h-4 w-4" />,
      description: "EU Blue Card specialists",
    },
    {
      name: "Global Talent Stream",
      url: "https://europa.eu/eures/portal/jv-se/home?lang=en",
      icon: <Globe className="h-4 w-4" />,
      description: "EU Job Search",
    },
  ];

  const handleLinkClick = (
    url: string,
    name: string,
    event?: React.MouseEvent
  ) => {
    // Prevent the dropdown from closing
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Track click for analytics if needed
    console.log(`Quick link clicked: ${name}`);
    window.open(url, "_blank", "noopener,noreferrer");

    // Keep the dropdown open by not changing the state
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-background hover:bg-muted border-border/50 hover:border-primary/50 transition-all duration-200"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="text-sm font-medium hidden sm:inline">
            Quick Links
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 max-h-[80vh] overflow-y-auto shadow-lg border border-border/50"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2">
          <Briefcase className="h-4 w-4 text-primary" />
          <span className="font-semibold">Job Boards</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Ireland-Specific Job Boards */}
        <DropdownMenuLabel className="text-xs text-green-600 px-3 py-1 flex items-center gap-1">
          🇮🇪 Ireland Jobs
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {irelandJobBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-green-100 text-green-700 rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Irish Recruitment Agencies */}
        <DropdownMenuLabel className="text-xs text-green-600 px-3 py-1 flex items-center gap-1">
          🏢 Irish Recruitment Agencies
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {recruitmentAgencies.map((agency) => (
            <DropdownMenuItem
              key={agency.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(agency.url, agency.name, e)}
              >
                <div className="p-1 bg-emerald-100 text-emerald-700 rounded">
                  {agency.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {agency.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {agency.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* EU Job Boards */}
        <DropdownMenuLabel className="text-xs text-blue-600 px-3 py-1 flex items-center gap-1">
          🇪🇺 EU Opportunities
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {euJobBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-blue-100 text-blue-700 rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Visa Sponsorship Job Boards */}
        <DropdownMenuLabel className="text-xs text-orange-600 px-3 py-1 flex items-center gap-1">
          🛂 Visa Sponsorship Jobs
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {visaSponsorshipBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-orange-100 text-orange-700 rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Visa Sponsorship Agencies */}
        <DropdownMenuLabel className="text-xs text-orange-600 px-3 py-1 flex items-center gap-1">
          🌍 Immigration & Visa Services
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {visaSponsorshipAgencies.map((agency) => (
            <DropdownMenuItem
              key={agency.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(agency.url, agency.name, e)}
              >
                <div className="p-1 bg-amber-100 text-amber-700 rounded">
                  {agency.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {agency.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {agency.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Remote Job Boards */}
        <DropdownMenuLabel className="text-xs text-indigo-600 px-3 py-1 flex items-center gap-1">
          🏠 Remote Work
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {remoteJobBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-indigo-100 text-indigo-700 rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* General Job Boards */}
        <DropdownMenuLabel className="text-xs text-muted-foreground px-3 py-1">
          🌍 Global Job Boards
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {jobBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-primary/10 text-primary rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Tech-Specific Job Boards */}
        <DropdownMenuLabel className="text-xs text-muted-foreground px-3 py-1">
          💻 Tech & Startups
        </DropdownMenuLabel>
        <div className="px-1 py-1">
          {techJobBoards.map((board) => (
            <DropdownMenuItem
              key={board.name}
              className="p-0"
              onSelect={(e) => e.preventDefault()}
            >
              <div
                className="flex items-center gap-3 w-full px-3 py-2 rounded-sm hover:bg-muted cursor-pointer transition-colors"
                onClick={(e) => handleLinkClick(board.url, board.name, e)}
              >
                <div className="p-1 bg-purple-100 text-purple-700 rounded">
                  {board.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate">
                      {board.name}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {board.description}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Pro Tip */}
        <div className="px-3 py-2 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-3 w-3 text-primary" />
            <span className="text-xs font-medium text-primary">Pro Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Use our AI Auto-Fill feature to quickly import job details from any
            of these sites!
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickLinksDropdown;
