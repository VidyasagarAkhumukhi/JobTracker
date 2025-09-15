"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock } from "lucide-react";

const InterviewPrepFeature = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-xl opacity-60">
          <Brain className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground opacity-70">
            🧠 AI Interview Preparation
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
              Planned for Q2 2025
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-indigo-50/30 to-blue-50/30 rounded-lg border border-indigo-200/30 opacity-70">
        <h4 className="font-semibold text-indigo-900 mb-3 opacity-80">
          🎯 AI-Powered Interview Practice
        </h4>
        <p className="text-sm text-indigo-800 mb-4 opacity-80">
          Practice with role-specific questions, get real-time feedback, and
          build confidence with our AI interview coach that adapts to your
          experience level and target position.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/40 rounded-lg border border-indigo-200/20">
            <h5 className="font-medium text-indigo-900 text-sm mb-1">
              ✨ Question Types
            </h5>
            <ul className="text-xs text-indigo-700 space-y-1 opacity-80">
              <li>• Behavioral (STAR method)</li>
              <li>• Technical challenges</li>
              <li>• Company culture fit</li>
              <li>• Situational scenarios</li>
            </ul>
          </div>
          <div className="p-3 bg-white/40 rounded-lg border border-indigo-200/20">
            <h5 className="font-medium text-indigo-900 text-sm mb-1">
              ⚡ AI Features
            </h5>
            <ul className="text-xs text-indigo-700 space-y-1 opacity-80">
              <li>• Mock interview simulation</li>
              <li>• Answer quality scoring</li>
              <li>• Improvement suggestions</li>
              <li>• Industry-specific prep</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-indigo-100/50 rounded-lg border border-indigo-200/30">
          <p className="text-sm text-indigo-800 font-medium">
            🚀 Development Status: Designing AI coaching algorithms
          </p>
          <p className="text-xs text-indigo-700 mt-1">
            Expected launch: Q2 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepFeature;
