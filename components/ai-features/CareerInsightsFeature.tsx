"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock } from "lucide-react";

const CareerInsightsFeature = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl opacity-60">
          <TrendingUp className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground opacity-70">
            📊 AI Career Insights
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              <Clock className="h-3 w-3 mr-1" />
              Coming Soon
            </Badge>
            <span className="text-sm text-muted-foreground">
              Planned for Q3 2025
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gradient-to-r from-orange-50/30 to-yellow-50/30 rounded-lg border border-orange-200/30 opacity-70">
        <h4 className="font-semibold text-orange-900 mb-3 opacity-80">
          🎯 Data-Driven Career Analytics
        </h4>
        <p className="text-sm text-orange-800 mb-4 opacity-80">
          Get personalized insights about your job search performance, market trends, 
          salary benchmarks, and strategic recommendations to accelerate your career growth.
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-white/40 rounded-lg border border-orange-200/20">
            <h5 className="font-medium text-orange-900 text-sm mb-1">✨ Analytics</h5>
            <ul className="text-xs text-orange-700 space-y-1 opacity-80">
              <li>• Application success rates</li>
              <li>• Response time analysis</li>
              <li>• Skills gap identification</li>
              <li>• Market positioning</li>
            </ul>
          </div>
          <div className="p-3 bg-white/40 rounded-lg border border-orange-200/20">
            <h5 className="font-medium text-orange-900 text-sm mb-1">⚡ Market Data</h5>
            <ul className="text-xs text-orange-700 space-y-1 opacity-80">
              <li>• Salary benchmarking</li>
              <li>• Industry growth trends</li>
              <li>• Location opportunities</li>
              <li>• Role demand forecasting</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-orange-100/50 rounded-lg border border-orange-200/30">
          <p className="text-sm text-orange-800 font-medium">
            🚀 Development Status: Building analytics infrastructure
          </p>
          <p className="text-xs text-orange-700 mt-1">
            Expected launch: Q3 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerInsightsFeature;