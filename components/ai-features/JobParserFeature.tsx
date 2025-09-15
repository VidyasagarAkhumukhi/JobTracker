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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl">
          <Sparkles className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">
            🚀 AI Job Description Parser
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-green-100 text-green-700 border-green-200">
              ✅ Available Now
            </Badge>
            <span className="text-sm text-muted-foreground">Ready to use</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg border border-green-200/50">
        <h4 className="font-semibold text-green-900 mb-3">
          🎯 Smart Auto-Fill Technology
        </h4>
        <p className="text-sm text-green-800 mb-4">
          Paste any job description and let our AI instantly extract all the key
          details. Save time and eliminate manual data entry with 95%+ accuracy
          powered by Google Gemini AI.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/60 rounded-lg border border-green-200/30">
            <h5 className="font-medium text-green-900 text-sm mb-1">
              ✨ AI Extracts
            </h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Company name</li>
              <li>• Job title</li>
              <li>• Location</li>
              <li>• Salary info</li>
            </ul>
          </div>
          <div className="p-3 bg-white/60 rounded-lg border border-green-200/30">
            <h5 className="font-medium text-green-900 text-sm mb-1">
              ⚡ Works With
            </h5>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• LinkedIn jobs</li>
              <li>• Indeed postings</li>
              <li>• Company websites</li>
              <li>• Any job description</li>
            </ul>
          </div>
        </div>

        <Button
          onClick={handleTryNow}
          className="w-full group bg-green-600 hover:bg-green-700"
        >
          <Zap className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
          Try AI Auto-Fill Now
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div className="p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-muted-foreground text-sm mb-2">
          💡 How it works:
        </h4>
        <ol className="text-sm text-muted-foreground space-y-1">
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
