"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock } from "lucide-react";

const ResumeAIFeature = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl opacity-60">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground opacity-70">
            📄 AI Resume Generator
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className="bg-orange-50 text-orange-700 border-orange-200"
            >
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <span className="text-sm text-muted-foreground">
              In Development
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-blue-50/30 to-cyan-50/30 rounded-lg border border-blue-200/30 opacity-70">
        <h4 className="font-semibold text-blue-900 mb-3 opacity-80">
          🎯 AI-Powered Resume Optimization
        </h4>
        <p className="text-sm text-blue-800 mb-4 opacity-80">
          Create tailored resumes that match job requirements with AI-powered
          content optimization, ATS compatibility scoring, and industry-specific
          formatting.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/40 rounded-lg border border-blue-200/20">
            <h5 className="font-medium text-blue-900 text-sm mb-1">
              ✨ Features
            </h5>
            <ul className="text-xs text-blue-700 space-y-1 opacity-80">
              <li>• ATS optimization</li>
              <li>• Keyword matching</li>
              <li>• Skills highlighting</li>
              <li>• Custom templates</li>
            </ul>
          </div>
          <div className="p-3 bg-white/40 rounded-lg border border-blue-200/20">
            <h5 className="font-medium text-blue-900 text-sm mb-1">
              ⚡ Smart Analysis
            </h5>
            <ul className="text-xs text-blue-700 space-y-1 opacity-80">
              <li>• Job requirement matching</li>
              <li>• Industry best practices</li>
              <li>• Achievement quantification</li>
              <li>• Professional formatting</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-blue-100/50 rounded-lg border border-blue-200/30">
          <p className="text-sm text-blue-800 font-medium">
            🚀 Development Status: Building AI resume analysis engine
          </p>
          <p className="text-xs text-blue-700 mt-1">Expected launch: Q1 2025</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeAIFeature;
