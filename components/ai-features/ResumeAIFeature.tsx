"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileTextIcon,
  SparklesIcon,
  ClipboardIcon,
  CheckIcon,
  DownloadIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Tab,
  TabStopPosition,
  TabStopType,
} from "docx";
import { saveAs } from "file-saver";

const ResumeAIFeature = () => {
  const [originalResume, setOriginalResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
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
        // Convert markdown bullet points to clean bullets
        .replace(/^\s*[\*\-\+]\s+/gm, "• ")
        // Clean up multiple dashes/lines
        .replace(/^\s*---+\s*$/gm, "")
        .replace(/^\s*===+\s*$/gm, "")
        // Clean up extra whitespace
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    );
  };

  const handleGenerateResume = async () => {
    if (!originalResume || !jobDescription) {
      toast.error("Please provide both your resume and the job description.");
      return;
    }
    setIsLoading(true);
    setGeneratedResume("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is not configured.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`;

      const systemPrompt = `You are an expert career coach and professional resume writer specializing in optimizing resumes for Applicant Tracking Systems (ATS). Your task is to rewrite a user's resume to be perfectly tailored for a specific job description.

            **Instructions:**
            1.  **Analyze:** Thoroughly analyze the provided "Original Resume" and "Job Description".
            2.  **Identify Keywords:** Extract the most critical skills, experiences, technologies, and keywords from the job description.
            3.  **Rewrite & Tailor:** Rewrite the resume to prominently feature the user's most relevant qualifications and experiences. Seamlessly integrate the identified keywords.
            4.  **Format Requirements:**
                - Start with candidate's name on the first line
                - Contact information on the second line
                - Use clear, ALL-CAPS section headings (e.g., SUMMARY, EXPERIENCE, SKILLS, EDUCATION, PROJECTS, CERTIFICATIONS)
                - For experience/projects: Use bullet points (•) for achievements and responsibilities
                - For skills/certifications: List items WITHOUT bullet points, one per line
                - For education: Include degree, institution, location, and date
                - Use consistent spacing and professional formatting
            5.  **Output:** Respond ONLY with the full text of the tailored resume in the specified format. Do not include any introductory phrases, explanations, or conversational text.`;

      const userQuery = `**Original Resume:**\n\n${originalResume}\n\n---\n\n**Job Description:**\n\n${jobDescription}`;

      const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
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
        setGeneratedResume(cleanedText);
        toast.success("Your tailored resume has been generated!");
      } else {
        throw new Error(
          "Failed to generate the tailored resume. The response was empty."
        );
      }
    } catch (err: any) {
      toast.error(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!generatedResume) return;
    navigator.clipboard
      .writeText(generatedResume)
      .then(() => {
        setHasCopied(true);
        toast.success("Resume copied to clipboard!");
        setTimeout(() => setHasCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy resume to clipboard.");
      });
  };

  const handleDownloadAsWord = async () => {
    if (!generatedResume) return;

    try {
      const lines = generatedResume
        .split("\n")
        .filter((line) => line.trim() !== "");
      const docChildren: Paragraph[] = [];

      let currentSection = "";

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Detect name (first line - usually no special characters)
        if (
          i === 0 &&
          !line.includes("@") &&
          !line.includes("|") &&
          line.length > 2
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 32, // 16pt
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 120 },
            })
          );
        }
        // Detect contact info (usually has email, phone, or links)
        else if (
          line.includes("@") ||
          line.includes("|") ||
          line.includes("linkedin") ||
          line.includes("github")
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 240 },
            })
          );
        }
        // Detect section headings (ALL CAPS, common section names)
        else if (
          line === line.toUpperCase() &&
          line.length > 2 &&
          /^[A-Z\s&]+$/.test(line) &&
          (line.includes("SUMMARY") ||
            line.includes("EXPERIENCE") ||
            line.includes("EDUCATION") ||
            line.includes("SKILLS") ||
            line.includes("PROJECTS") ||
            line.includes("CERTIFICATIONS") ||
            line.includes("CERTIFICATION") ||
            line.includes("AWARDS") ||
            line.includes("LANGUAGES") ||
            line.includes("VOLUNTEER"))
        ) {
          currentSection = line;
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  bold: true,
                  size: 24,
                }),
              ],
              spacing: { before: 240, after: 120 },
            })
          );
        }
        // Handle bullet points
        else if (line.startsWith("•")) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              indent: { left: 360 },
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
            })
          );
        }
        // Handle skills/certifications (detect by current section and pattern)
        else if (
          (currentSection.includes("SKILLS") ||
            currentSection.includes("CERTIFICATION") ||
            currentSection.includes("LANGUAGES")) &&
          line.length > 3 &&
          !line.includes("University") &&
          !line.includes("Hospital") &&
          !line.includes("Company") &&
          !/^\d{4}/.test(line) // doesn't start with year
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `• ${line}`,
                  size: 22,
                }),
              ],
              indent: { left: 360 },
              spacing: { after: 80 },
              alignment: AlignmentType.JUSTIFIED,
            })
          );
        }
        // Detect job titles/positions and combine with company/location/date on one line
        else if (
          i < lines.length - 1 &&
          (lines[i + 1].includes("•") ||
            lines[i + 1].includes("University") ||
            lines[i + 1].includes("Company") ||
            lines[i + 1].includes("Hospital") ||
            /\d{4}/.test(lines[i + 1])) &&
          !line.startsWith("•") &&
          line.length > 3
        ) {
          let titlePart = line.trim();
          let companyPart = "";
          let locationPart = "";
          let datePart = "";
          let linesToSkip = 0;

          // Look ahead to gather company, location, and date information
          for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
            const nextLine = lines[j];
            if (nextLine.startsWith("•")) break; // Stop at bullet points

            // Check for date pattern
            const dateMatch = nextLine.match(
              /(\w+\s+\d{4}(?:\s*[-–]\s*\w+\s+\d{4}|\s*[-–]\s*Present)?)/
            );

            if (dateMatch) {
              datePart = dateMatch[0];
              const lineWithoutDate = nextLine.replace(dateMatch[0], "").trim();

              // Check if remaining text has location patterns
              if (
                lineWithoutDate.includes(",") ||
                lineWithoutDate.includes("Ireland") ||
                lineWithoutDate.includes("India") ||
                lineWithoutDate.includes("USA") ||
                lineWithoutDate.includes("UK")
              ) {
                const parts = lineWithoutDate.split(/[,|]/);
                companyPart = parts[0]?.trim() || "";
                locationPart = parts[1]?.trim() || "";
              } else if (lineWithoutDate) {
                companyPart = lineWithoutDate;
              }
              linesToSkip = j - i;
              break;
            } else if (
              nextLine.includes("University") ||
              nextLine.includes("Hospital") ||
              nextLine.includes("Company")
            ) {
              // This line likely contains company/institution info
              const parts = nextLine.split(/[,|]/);
              companyPart = parts[0]?.trim() || "";
              if (parts.length > 1) {
                locationPart = parts[1]?.trim() || "";
              }
              linesToSkip = j - i;
            }
          }

          // Create the combined line: "Title | Company, Location" with right-aligned date
          const combinedText = [
            titlePart,
            [companyPart, locationPart].filter(Boolean).join(", "),
          ]
            .filter(Boolean)
            .join(" | ");

          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: combinedText,
                  bold: true,
                  size: 22,
                }),
                ...(datePart
                  ? [
                      new TextRun({
                        text: "\t",
                        size: 22,
                      }),
                      new TextRun({
                        text: datePart,
                        size: 22,
                        italics: true,
                      }),
                    ]
                  : []),
              ],
              spacing: { before: 120, after: 60 },
              ...(datePart
                ? {
                    tabStops: [
                      {
                        type: TabStopType.RIGHT,
                        position: TabStopPosition.MAX,
                      },
                    ],
                  }
                : {}),
            })
          );

          // Skip the lines we've already processed
          i += linesToSkip;
        }
        // Detect company/institution lines (with dates, locations)
        else if (
          (line.includes("University") ||
            line.includes("College") ||
            line.includes("Hospital") ||
            line.includes("Company") ||
            line.includes("Inc") ||
            line.includes("LLC") ||
            /\d{4}/.test(line)) &&
          !line.startsWith("•")
        ) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  italics: true,
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
            })
          );
        }
        // Regular text (summary, descriptions, etc.)
        else if (line.length > 0) {
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: line,
                  size: 22,
                }),
              ],
              spacing: { after: 100 },
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
                margin: { top: 1440, right: 1080, bottom: 1080, left: 1080 },
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

      // Extract user name from original resume
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

      const userName = extractUserName(originalResume);
      const { jobTitle, company } = extractJobInfo(jobDescription);

      const fileName = `${userName}_Resume_${jobTitle}_${company}.docx`;
      saveAs(blob, fileName);
      toast.success("Professional resume downloaded!");
    } catch (error) {
      console.error("Error generating Word document:", error);
      toast.error("Failed to download resume as Word document.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardHeader className="pb-6">
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg border">
              <FileTextIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">
                AI Resume Optimizer
              </span>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Create ATS-friendly resumes tailored for each job
              </p>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Input Focus Area */}
          <div className="p-6 bg-muted/20 rounded-lg border-2 border-dashed border-border">
            <div className="text-center mb-6">
              <h3 className="font-semibold text-lg text-foreground mb-2">
                Input Your Information
              </h3>
              <p className="text-muted-foreground">
                Provide your resume and target job to generate an optimized
                version
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <Label
                  htmlFor="original-resume"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <FileTextIcon className="h-4 w-4 text-primary" />
                  Your Current Resume
                </Label>
                <Textarea
                  id="original-resume"
                  placeholder="Paste your complete resume here including:
• Work experience and achievements
• Education and certifications  
• Skills and technologies
• Contact information"
                  value={originalResume}
                  onChange={(e) => setOriginalResume(e.target.value)}
                  className="h-48 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  ℹ️ Include all sections for best results
                </p>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="job-description"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <SparklesIcon className="h-4 w-4 text-primary" />
                  Target Job Description
                </Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the complete job description:
• Job requirements and qualifications
• Preferred skills and experience
• Company information
• Role responsibilities"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="h-48 resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  🎯 AI will analyze and match requirements
                </p>
              </div>
            </div>
          </div>

          {/* Generate Button - Prominent */}
          <div className="text-center">
            <Button
              onClick={handleGenerateResume}
              disabled={isLoading || !originalResume || !jobDescription}
              size="lg"
              className="w-full sm:w-auto px-8 h-14 text-base font-medium"
            >
              <SparklesIcon className="mr-3 h-5 w-5" />
              {isLoading
                ? "Optimizing Your Resume..."
                : "Generate Optimized Resume"}
            </Button>

            {(!originalResume || !jobDescription) && (
              <p className="text-sm text-muted-foreground mt-2">
                Please fill in both fields above to continue
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Resume Output - Right Below Generate Button */}
      {generatedResume && (
        <Card className="border-border bg-card">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <span className="text-foreground">Your Optimized Resume</span>
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
              {/* Resume Preview - Main Output */}
              <div className="p-6 bg-muted/20 rounded-lg border-2 border-dashed border-border">
                <div className="mb-4 text-center">
                  <h3 className="font-semibold text-foreground mb-1">
                    Generated Resume
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review and customize as needed
                  </p>
                </div>
                <div className="whitespace-pre-wrap bg-background p-6 font-mono text-sm leading-relaxed border rounded-lg max-h-96 overflow-y-auto">
                  {generatedResume}
                </div>
              </div>

              {/* Action Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <DownloadIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Professional Export
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Downloads as .docx with your name, job title, and
                        company in filename. Perfect for ATS systems and online
                        applications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-card rounded-lg border">
                  <div className="flex items-start gap-3">
                    <SparklesIcon className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Review & Personalize
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Check and re-add any links (LinkedIn, GitHub,
                        portfolio). Customize details before submitting
                        applications.
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
          {/* Features Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground text-sm">
                  Smart Optimization
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Matches your experience with job requirements using relevant
                keywords
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <CheckIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground text-sm">
                  ATS-Friendly
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Formatted to pass Applicant Tracking Systems successfully
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <DownloadIcon className="h-5 w-5 text-primary" />
                <h3 className="font-medium text-foreground text-sm">
                  Professional Export
                </h3>
              </div>
              <p className="text-xs text-muted-foreground">
                Download as Word document with clean, professional formatting
              </p>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="p-4 bg-muted/20 rounded-lg border">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <SparklesIcon className="h-4 w-4 text-primary" />
              How It Works
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• AI analyzes job requirements and identifies key skills</li>
              <li>
                • Restructures your experience to highlight relevant
                qualifications
              </li>
              <li>
                • Ensures proper ATS formatting with clear section headers
              </li>
              <li>• Creates professional layout ready for applications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeAIFeature;
