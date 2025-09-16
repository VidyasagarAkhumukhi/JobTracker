"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageSquareIcon,
  SparklesIcon,
  ClipboardIcon,
  CheckIcon,
  DownloadIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";

const CoverLetterFeature = () => {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  // Function to clean markdown formatting and ensure plain text
  const cleanMarkdownFormatting = (text: string): string => {
    return (
      text
        // Remove markdown bold/italic formatting
        .replace(/\*\*(.+?)\*\*/g, "$1")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/__(.+?)__/g, "$1")
        .replace(/_(.+?)_/g, "$1")
        // Clean up extra whitespace
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    );
  };

  const handleGenerateCoverLetter = async () => {
    if (!resume || !jobDescription) {
      toast.error("Please provide both your resume and the job description.");
      return;
    }
    setIsLoading(true);
    setGeneratedCoverLetter("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is not configured.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

      const systemPrompt = `You are an expert career coach and professional cover letter writer specializing in creating compelling, personalized cover letters that get results.

**Instructions:**
1. **Analyze:** Thoroughly analyze the provided resume and job description to identify the candidate's most relevant qualifications.
2. **Extract Information:** From the job description, automatically identify:
   - Company name
   - Job title/position
   - Key requirements and responsibilities
   - Company culture and values
3. **Personalize:** Create a cover letter specifically tailored to the company and role using extracted information.
4. **Structure:** Use professional business letter format with proper formatting.
5. **Content Requirements:**
   - Professional header with candidate's contact information (from resume)
   - Use today's date: ${new Date().toLocaleDateString("en-US", {
     year: "numeric",
     month: "long",
     day: "numeric",
   })} (do not use placeholders like "[Current Date]")
   - Proper employer address (use company name from job description)
   - Engaging opening that mentions the specific role and company by name
   - 2-3 body paragraphs highlighting relevant experience and achievements
   - Strong closing with call to action
   - Professional signature line
6. **Tone:** Professional, confident, and enthusiastic without being overly casual
7. **Length:** Keep it concise (3-4 paragraphs max)
8. **Keywords:** Naturally integrate relevant keywords from the job description
9. **Output:** Respond ONLY with the complete cover letter text. Do not include any explanations or additional commentary.`;

      const candidateInfo = `**Resume:**
${resume}

**Job Description:**
${jobDescription}`;

      const payload = {
        contents: [{ parts: [{ text: candidateInfo }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        const cleanedText = cleanMarkdownFormatting(text);
        setGeneratedCoverLetter(cleanedText);
        toast.success("Your personalized cover letter has been generated!");
      } else {
        throw new Error(
          "Failed to generate the cover letter. The response was empty."
        );
      }
    } catch (err: any) {
      toast.error(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedCoverLetter) return;
    navigator.clipboard
      .writeText(generatedCoverLetter)
      .then(() => {
        setHasCopied(true);
        toast.success("Cover letter copied to clipboard!");
        setTimeout(() => setHasCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy cover letter to clipboard.");
      });
  };

  const handleDownloadAsWord = async () => {
    if (!generatedCoverLetter) return;

    try {
      // Extract user name from resume
      const extractUserName = (resumeText: string) => {
        const lines = resumeText.split("\n").filter((line) => line.trim());
        if (lines.length > 0) {
          // First line usually contains the name
          const firstLine = lines[0].trim();
          // Remove common prefixes and clean up
          const cleanName = firstLine
            .replace(/^(name:|full name:|candidate:|applicant:)/i, "")
            .trim()
            .replace(/[^a-zA-Z\s]/g, "")
            .replace(/\s+/g, "_")
            .slice(0, 30); // Limit length
          return cleanName || "User";
        }
        return "User";
      };

      // Extract job title and company from job description
      const extractJobInfo = (jobDesc: string) => {
        const lines = jobDesc.split("\n").filter((line) => line.trim());
        let jobTitle = "Position";
        let company = "Company";

        for (const line of lines.slice(0, 10)) {
          // Check first 10 lines
          const lowerLine = line.toLowerCase();

          // Look for job title patterns
          if (
            lowerLine.includes("position:") ||
            lowerLine.includes("role:") ||
            lowerLine.includes("job title:") ||
            lowerLine.includes("we are hiring")
          ) {
            jobTitle = line
              .replace(/^(position:|role:|job title:|we are hiring)/i, "")
              .trim()
              .replace(/[^a-zA-Z\s]/g, "")
              .replace(/\s+/g, "_")
              .slice(0, 25);
          }

          // Look for company name patterns
          if (
            lowerLine.includes("company:") ||
            lowerLine.includes("organization:") ||
            lowerLine.includes("at ") ||
            lowerLine.includes("join ")
          ) {
            company = line
              .replace(/^(company:|organization:|at |join )/i, "")
              .trim()
              .replace(/[^a-zA-Z\s]/g, "")
              .replace(/\s+/g, "_")
              .slice(0, 20);
          }
        }

        // If not found in structured format, try to extract from first few lines
        if (jobTitle === "Position" && lines.length > 0) {
          jobTitle =
            lines[0]
              .replace(/[^a-zA-Z\s]/g, "")
              .replace(/\s+/g, "_")
              .slice(0, 25) || "Position";
        }

        return { jobTitle, company };
      };

      const userName = extractUserName(resume);
      const { jobTitle, company } = extractJobInfo(jobDescription);

      const lines = generatedCoverLetter
        .split("\n")
        .filter((line) => line.trim() !== "");

      const docChildren: Paragraph[] = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) continue;

        // Handle dates
        if (line.match(/^\w+\s+\d{1,2},\s+\d{4}$/)) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 240 },
            })
          );
        }
        // Handle addresses and contact info
        else if (
          line.includes("@") ||
          line.includes("Street") ||
          line.includes("Ave") ||
          line.includes("Road") ||
          line.match(/^\d+/) ||
          line.includes("City,") ||
          line.match(/\(\d{3}\)/) ||
          line.match(/\d{3}-\d{3}-\d{4}/)
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
        // Handle names (usually first non-contact line)
        else if (
          i === 0 ||
          (i < 3 &&
            !line.includes("@") &&
            !line.includes("(") &&
            line.length > 5)
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
        // Handle salutations
        else if (line.startsWith("Dear ") || line.startsWith("To Whom")) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              spacing: { before: 240, after: 120 },
            })
          );
        }
        // Handle closing salutations
        else if (
          line.startsWith("Sincerely") ||
          line.startsWith("Best regards") ||
          line.startsWith("Thank you") ||
          line.startsWith("Looking forward")
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              spacing: { before: 240, after: 120 },
            })
          );
        }
        // Regular paragraphs
        else {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              spacing: { after: 240 },
              alignment: AlignmentType.JUSTIFIED,
            })
          );
        }
      }

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
              },
            },
            children: docChildren,
          },
        ],
        styles: {
          default: {
            document: {
              run: { font: "Calibri", size: 22 },
            },
          },
        },
      });

      const blob = await Packer.toBlob(doc);
      const fileName = `${userName}_CoverLetter_${jobTitle}_${company}.docx`;
      saveAs(blob, fileName);
      toast.success("Professional cover letter downloaded!");
    } catch (error) {
      console.error("Error generating Word document:", error);
      toast.error("Failed to download cover letter as Word document.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2.5 bg-muted rounded-xl border border-border">
              <MessageSquareIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">
                AI Cover Letter Generator
              </span>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Personalized cover letters with company-specific insights
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main Input Area */}
          <div className="p-6 bg-muted/20 rounded-lg border-2 border-dashed border-border">
            <div className="mb-4 text-center">
              <h3 className="font-semibold text-foreground mb-1">
                Create Your Cover Letter
              </h3>
              <p className="text-sm text-muted-foreground">
                Provide your background and the target position
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="resume-text"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <MessageSquareIcon className="h-4 w-4 text-primary" />
                  Your Resume & Background
                </Label>
                <Textarea
                  id="resume-text"
                  placeholder="Paste your complete resume including your experience, skills, achievements, and contact information..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="h-48 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Include your full name, contact details, and professional
                  background
                </p>
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="job-description"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <SparklesIcon className="h-4 w-4 text-primary" />
                  Complete Job Description
                </Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the full job posting including company name, role details, requirements, and company culture..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="h-48 resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  AI will analyze company culture and role requirements for
                  personalization
                </p>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateCoverLetter}
              disabled={isLoading || !resume || !jobDescription}
              className="w-full h-12 mt-6 font-medium text-base"
            >
              <SparklesIcon className="mr-3 h-5 w-5" />
              {isLoading
                ? "Crafting Your Personalized Cover Letter..."
                : "Generate Cover Letter"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Cover Letter Output - Right Below Generate Button */}
      {generatedCoverLetter && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  Your Personalized Cover Letter
                </span>
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyToClipboard}
                  className="border-border hover:bg-muted"
                >
                  {hasCopied ? (
                    <CheckIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <ClipboardIcon className="mr-2 h-4 w-4" />
                  )}
                  {hasCopied ? "Copied!" : "Copy Text"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadAsWord}
                  className="border-border hover:bg-muted"
                >
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Download Word
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Cover Letter Preview - Main Output */}
              <div className="p-6 bg-muted/20 rounded-lg border-2 border-dashed border-border">
                <div className="mb-4 text-center">
                  <h3 className="font-semibold text-foreground mb-1">
                    Generated Cover Letter
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Professional business letter format
                  </p>
                </div>
                <div className="whitespace-pre-wrap bg-background p-6 font-serif text-sm leading-relaxed border rounded-lg max-h-96 overflow-y-auto">
                  {generatedCoverLetter}
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <DownloadIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Professional Word Export
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Downloads as formatted .docx file with business letter
                        layout. Filename includes your name, job title, and
                        company for easy organization.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <MessageSquareIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Final Review
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Please review the generated cover letter for accuracy
                        and personalization. Adjust any details, dates, or
                        specific requirements before submitting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features & Tips - Moved to Bottom for Less Clutter */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">
                  Smart Analysis
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                AI extracts company info and role requirements automatically
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">
                  Personalized Content
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Tailored letters highlighting your relevant experience
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <DownloadIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">
                  Professional Format
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Business letter format with proper structure and dating
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="p-4 bg-card rounded-lg border">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-muted rounded">
                <SparklesIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  How It Works
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>
                    • Automatically extracts company name and job title from
                    description
                  </li>
                  <li>
                    • Creates personalized opening addressing the specific role
                    and company
                  </li>
                  <li>
                    • Highlights your most relevant experience for the position
                  </li>
                  <li>
                    • Uses current date and professional business letter
                    formatting
                  </li>
                  <li>
                    • Includes confident closing with clear call-to-action
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  💼 Pro tip: Always review and customize the letter before
                  sending
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterFeature;
