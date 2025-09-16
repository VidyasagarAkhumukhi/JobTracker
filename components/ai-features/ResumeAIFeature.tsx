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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5 text-primary" />
            <span>AI Resume Tailor</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="original-resume">Your Current Resume</Label>
              <Textarea
                id="original-resume"
                placeholder="Paste your full current resume here..."
                value={originalResume}
                onChange={(e) => setOriginalResume(e.target.value)}
                className="h-48 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Target Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the job description you are applying for..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="h-48 resize-none"
              />
            </div>
          </div>
          <Button
            onClick={handleGenerateResume}
            disabled={isLoading}
            className="w-full"
          >
            <SparklesIcon className="mr-2 h-4 w-4" />
            {isLoading
              ? "Generating Your ATS-Optimized Resume..."
              : "Generate Tailored Resume"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            ✨ Generated resume will be in clean, plain text format - ready to
            copy, paste, or download as Word document
            <br />
            <span className="text-amber-700">
              Note: Please check and re-add any links (LinkedIn, GitHub,
              portfolio, etc) as they appear as plain text
            </span>
          </p>
        </CardContent>
      </Card>

      {generatedResume && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Generated Resume</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyToClipboard}
              >
                {hasCopied ? (
                  <CheckIcon className="mr-2 h-4 w-4" />
                ) : (
                  <ClipboardIcon className="mr-2 h-4 w-4" />
                )}
                {hasCopied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadAsWord}
              >
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download Word
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap rounded-md bg-muted p-6 font-sans text-sm leading-relaxed border">
              {generatedResume}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResumeAIFeature;
