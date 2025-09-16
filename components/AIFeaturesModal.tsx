"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import {
  Sparkles,
  FileText,
  MessageSquare,
  Brain,
  TrendingUp,
} from "lucide-react";

// Import individual AI feature components
import JobParserFeature from "./ai-features/JobParserFeature";
import ResumeAIFeature from "./ai-features/ResumeAIFeature";
import CoverLetterFeature from "./ai-features/CoverLetterFeature";
import InterviewPrepFeature from "./ai-features/InterviewPrepFeature";
import CareerInsightsFeature from "./ai-features/CareerInsightsFeature";

interface AIFeaturesModalProps {
  children: React.ReactNode;
}

const AIFeaturesModal = ({ children }: AIFeaturesModalProps) => {
  const [activeTab, setActiveTab] = useState("job-parser");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const tabs = [
    {
      id: "job-parser",
      name: "Job Parser",
      icon: <Sparkles className="h-4 w-4" />,
      description: "AI auto-fill for job details",
      available: true,
    },
    {
      id: "resume-ai",
      name: "Resume AI",
      icon: <FileText className="h-4 w-4" />,
      description: "AI-powered resume optimization using Google Gemini",
      available: true,
    },
    {
      id: "cover-letter",
      name: "Cover Letter",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "AI-powered personalized cover letters using Google Gemini",
      available: true,
    },
    {
      id: "interview-prep",
      name: "Interview Prep",
      icon: <Brain className="h-4 w-4" />,
      description: "Practice with AI-generated questions",
      available: false,
    },
    {
      id: "career-insights",
      name: "Career Insights",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Market analysis and career advice",
      available: false,
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "job-parser":
        return <JobParserFeature onClose={handleClose} />;
      case "resume-ai":
        return <ResumeAIFeature />;
      case "cover-letter":
        return <CoverLetterFeature />;
      case "interview-prep":
        return <InterviewPrepFeature />;
      case "career-insights":
        return <CareerInsightsFeature />;
      default:
        return <JobParserFeature onClose={handleClose} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[98vw] sm:w-[90vw] max-w-sm sm:max-w-4xl h-[98vh] sm:h-[90vh] max-h-[600px] sm:max-h-[800px] overflow-hidden p-0">
        <div className="flex flex-col h-full w-full overflow-hidden">
          <DialogHeader className="space-y-2 sm:space-y-3 p-2 sm:p-3 pb-0 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg sm:rounded-xl flex-shrink-0">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-7 lg:w-7 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <DialogTitle className="text-sm sm:text-base lg:text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent truncate">
                  🤖 AI Magic Mode
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs hidden sm:block truncate">
                  Supercharge your job search with AI-powered tools
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {/* Mobile Tab Navigation */}
          <div className="block lg:hidden px-2 sm:px-3 py-1.5 sm:py-2 border-b bg-muted/20 overflow-hidden">
            <div className="flex gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : tab.available
                      ? "bg-background text-foreground hover:bg-muted"
                      : "opacity-50 text-muted-foreground cursor-default"
                  }`}
                  disabled={!tab.available}
                >
                  <span className="hidden sm:inline text-xs">{tab.icon}</span>
                  <span className="whitespace-nowrap text-xs truncate max-w-[60px] sm:max-w-none">
                    {tab.name}
                  </span>
                  {tab.available ? (
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                  ) : (
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-400 rounded-full flex-shrink-0"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-1 min-h-0 w-full">
            {/* Desktop Sidebar Tabs */}
            <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 border-r bg-muted/20">
              <div className="p-4 space-y-2 h-full overflow-y-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-3 xl:p-4 rounded-lg transition-all duration-200 group ${
                      activeTab === tab.id
                        ? "bg-primary/10 text-primary border-2 border-primary/20 shadow-sm"
                        : tab.available
                        ? "hover:bg-muted/50 text-foreground border-2 border-transparent"
                        : "opacity-60 text-muted-foreground border-2 border-transparent cursor-default"
                    }`}
                    disabled={!tab.available}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                          activeTab === tab.id
                            ? "bg-primary/20 text-primary"
                            : tab.available
                            ? "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                            : "bg-muted/50 text-muted-foreground/50"
                        }`}
                      >
                        {tab.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-medium text-sm truncate">
                            {tab.name}
                          </span>
                          {tab.available ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium flex-shrink-0">
                              Live
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium flex-shrink-0">
                              Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">
                      {tab.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto min-w-0">
              <div className="p-2 sm:p-3 lg:p-4 h-full w-full">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeaturesModal;
