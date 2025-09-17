import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import LandingImg from "../assets/jobhunt.svg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 mb-8">
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ✨ AI-Powered Job Tracking
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-gradient">JobTrackAI</span>
              <br />
              <span className="text-slate-800 text-4xl md:text-6xl">
                Your Smart Career Companion
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Transform your job search with AI-powered insights, intelligent
              tracking, and data-driven career decisions. Land your dream job
              faster with JobTrackAI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
              >
                <Link href="/add-job" className="flex items-center gap-2">
                  Start Tracking Jobs
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="lg" className="border-2 border-slate-300 hover:border-blue-400 px-8 py-4 rounded-xl backdrop-blur-soft">
                <Link href="/stats">
                  View Demo Dashboard
                </Link>
              </Button> */}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl rounded-full" />
            <Image
              src={LandingImg}
              alt="JobTrackAI - AI-powered job tracking platform"
              width={800}
              height={600}
              priority
              className="relative z-10 mx-auto drop-shadow-2xl float-animation"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Why Choose JobTrackAI?
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of job searching with our AI-powered
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Smart Job Tracking
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Organize and track all your job applications with AI-powered
                categorization and intelligent reminders.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Analytics & Insights
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Get detailed analytics on your job search performance and
                AI-driven recommendations for improvement.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Success Optimization
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Maximize your chances with AI-optimized application strategies
                and interview preparation tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simplify Your Job Search Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Make Job Applications
              <span className="text-yellow-300"> Effortless</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Transform your job search from complicated chaos to organized
              success with AI-powered tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Track Jobs Instantly</h3>
              <p className="text-blue-100 leading-relaxed">
                Add and organize job applications in seconds. No more scattered
                spreadsheets.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI-Powered Resumes</h3>
              <p className="text-blue-100 leading-relaxed">
                Generate tailored resumes in seconds using AI that understands
                job requirements and optimizes your experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Cover Letters</h3>
              <p className="text-blue-100 leading-relaxed">
                Create compelling cover letters instantly. AI analyzes job posts
                and crafts personalized content that stands out.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Simplify
            </span>{" "}
            Your Job Search?
          </h2>
          <p className="text-xl text-slate-300 mb-12 leading-relaxed">
            Stop juggling spreadsheets and start landing interviews with
            AI-powered job tracking and application tools
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
          >
            <Link href="/add-job" className="flex items-center gap-3">
              Start Your Journey
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
