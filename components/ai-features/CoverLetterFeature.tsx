"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Clock } from "lucide-react";

const CoverLetterFeature = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl opacity-60">
          <MessageSquare className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground opacity-70">
            ✍️ AI Cover Letter Generator
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <span className="text-sm text-muted-foreground">
              In Development
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-purple-50/30 to-pink-50/30 rounded-lg border border-purple-200/30 opacity-70">
        <h4 className="font-semibold text-purple-900 mb-3 opacity-80">
          🎯 Personalized Cover Letter Creation
        </h4>
        <p className="text-sm text-purple-800 mb-4 opacity-80">
          Generate compelling, personalized cover letters that highlight your unique value proposition 
          and align perfectly with company culture and job requirements.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/40 rounded-lg border border-purple-200/20">
            <h5 className="font-medium text-purple-900 text-sm mb-1">✨ AI Creates</h5>
            <ul className="text-xs text-purple-700 space-y-1 opacity-80">
              <li>• Company-specific intro</li>
              <li>• Role-tailored content</li>
              <li>• Achievement highlights</li>
              <li>• Strong closing CTA</li>
            </ul>
          </div>
          <div className="p-3 bg-white/40 rounded-lg border border-purple-200/20">
            <h5 className="font-medium text-purple-900 text-sm mb-1">⚡ Smart Features</h5>
            <ul className="text-xs text-purple-700 space-y-1 opacity-80">
              <li>• Tone adaptation</li>
              <li>• Industry research</li>
              <li>• Keyword optimization</li>
              <li>• Multiple variations</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-purple-100/50 rounded-lg border border-purple-200/30">
          <p className="text-sm text-purple-800 font-medium">
            🚀 Development Status: Training AI writing models
          </p>
          <p className="text-xs text-purple-700 mt-1">
            Expected launch: Q1 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterFeature;