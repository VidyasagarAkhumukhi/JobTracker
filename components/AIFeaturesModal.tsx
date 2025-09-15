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
      description: "AI-powered resume optimization",
      available: false,
    },
    {
      id: "cover-letter",
      name: "Cover Letter",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Generate personalized cover letters",
      available: false,
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="space-y-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-xl">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                🤖 AI Magic Mode
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Supercharge your job search with AI-powered tools
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex h-[600px] gap-6">
          {/* Sidebar Tabs */}
          <div className="w-72 flex-shrink-0">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-200 group ${
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
                      className={`p-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-primary/20 text-primary"
                          : tab.available
                          ? "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          : "bg-muted/50 text-muted-foreground/50"
                      }`}
                    >
                      {tab.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{tab.name}</span>
                        {tab.available ? (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            Live
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
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
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="h-full">{renderTabContent()}</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIFeaturesModal;
