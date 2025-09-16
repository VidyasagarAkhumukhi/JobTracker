"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const JobParserFeature = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();

  const handleTryNow = () => {
    onClose?.(); // Close the modal
    router.push("/add-job"); // Navigate to add job page
  };
  return (
    <div className="space-y-3 sm:space-y-4 lg:space-y-6 w-full max-w-none overflow-hidden">
      <div className="flex items-start sm:items-center gap-1.5 sm:gap-2 lg:gap-3 w-full">
        <div className="p-1.5 sm:p-2 lg:p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg sm:rounded-xl flex-shrink-0">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 lg:h-6 lg:w-6 text-green-600" />
        </div>
        <div className="flex-1 min-w-0 w-full overflow-hidden">
          <h3 className="text-xs sm:text-sm lg:text-lg font-bold text-foreground leading-tight truncate">
            🚀 AI Job Description Parser
          </h3>
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex-shrink-0">
              ✅ Available Now
            </Badge>
            <span className="text-xs text-muted-foreground truncate">Ready to use</span>
          </div>
        </div>
      </div>

      <div className="p-2 sm:p-3 lg:p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg border border-green-200/50 w-full overflow-hidden">
        <h4 className="font-semibold text-green-900 mb-2 sm:mb-3 text-xs sm:text-sm lg:text-base">
          🎯 Smart Auto-Fill Technology
        </h4>
        <p className="text-xs sm:text-sm text-green-800 mb-2 sm:mb-3 lg:mb-4 leading-relaxed">
          Paste any job description and let our AI instantly extract all the key
          details. Save time and eliminate manual data entry with 95%+ accuracy
          powered by Google Gemini AI.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 lg:gap-3 mb-2 sm:mb-3 lg:mb-4 w-full">
          <div className="p-1.5 sm:p-2 lg:p-3 bg-white/60 rounded border border-green-200/30 min-w-0">
            <h5 className="font-medium text-green-900 text-xs sm:text-sm mb-1">
              ✨ AI Extracts
            </h5>
            <ul className="text-xs text-green-700 space-y-0.5">
              <li>• Company name</li>
              <li>• Job title</li>
              <li>• Location</li>
              <li>• Salary info</li>
            </ul>
          </div>
          <div className="p-1.5 sm:p-2 lg:p-3 bg-white/60 rounded border border-green-200/30 min-w-0">
            <h5 className="font-medium text-green-900 text-xs sm:text-sm mb-1">
              ⚡ Works With
            </h5>
            <ul className="text-xs text-green-700 space-y-0.5">
              <li>• LinkedIn jobs</li>
              <li>• Indeed postings</li>
              <li>• Company websites</li>
              <li>• Any job description</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleTryNow}
          className="w-full group bg-green-600 hover:bg-green-700 h-9 sm:h-10 lg:h-12 text-xs sm:text-sm"
        >
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
          Try AI Auto-Fill Now
          <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="p-1.5 sm:p-2 lg:p-4 bg-muted/30 rounded border border-muted/50 w-full overflow-hidden">
        <h4 className="font-medium text-muted-foreground text-xs sm:text-sm mb-1 sm:mb-2">
          💡 How it works:
        </h4>
        <ol className="text-xs text-muted-foreground space-y-0.5">
          <li>1. Go to Add Job page</li>
          <li>2. Click "AI Auto-Fill" button</li>
          <li>3. Paste any job description</li>
          <li>4. Watch AI fill all the fields instantly!</li>
        </ol>
      </div>
    </div>
  );
};

export default JobParserFeature;
