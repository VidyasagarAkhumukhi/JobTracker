"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  CheckCircle,
  Globe,
} from "lucide-react";
import { useRouter } from "next/navigation";

const JobParserFeature = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();

  const handleTryNow = () => {
    onClose?.(); // Close the modal
    router.push("/add-job"); // Navigate to add job page
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg border">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-foreground flex items-center gap-3">
                AI Job Parser
                <Badge variant="secondary" className="text-xs">
                  Ready to Use
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Instantly extract job details from any description
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Action */}
          <div className="text-center space-y-4">
            <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-border">
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  Ready to Try AI Auto-Fill?
                </h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Copy any job description and let our AI extract company name,
                  job title, location, and more with 95%+ accuracy.
                </p>
              </div>
            </div>

            <Button
              onClick={handleTryNow}
              size="lg"
              className="w-full sm:w-auto px-8 h-12 text-base font-medium"
            >
              <Target className="h-5 w-5 mr-2" />
              Start AI Auto-Fill
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">
                  What AI Extracts
                </h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Company name and details</li>
                <li>• Job title and position level</li>
                <li>• Work location (remote/hybrid/onsite)</li>
                <li>• Salary and compensation info</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="h-5 w-5 text-primary" />
                <h4 className="font-medium text-foreground">
                  Works With Any Source
                </h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• LinkedIn job postings</li>
                <li>• Indeed and job boards</li>
                <li>• Company career pages</li>
                <li>• Email job descriptions</li>
              </ul>
            </div>
          </div>

          {/* Step-by-Step Guide */}
          <div className="p-4 bg-muted/20 rounded-lg border">
            <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              How it works
            </h4>
            <div className="space-y-3">
              {[
                "Navigate to the Add Job page",
                "Click the AI Auto-Fill button",
                "Paste your job description",
                "Watch AI fill all fields instantly",
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full text-sm flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobParserFeature;
