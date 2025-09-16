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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareIcon className="h-5 w-5 text-primary" />
            <span>AI Cover Letter Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="resume-text">Your Resume</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste your full resume here..."
                value={resume}
                onChange={(e) => setResume(e.target.value)}
                className="h-48 resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the complete job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="h-48 resize-none"
              />
            </div>
          </div>{" "}
          <Button
            onClick={handleGenerateCoverLetter}
            disabled={isLoading}
            className="w-full"
          >
            <SparklesIcon className="mr-2 h-4 w-4" />
            {isLoading
              ? "Crafting Your Personalized Cover Letter..."
              : "Generate Cover Letter"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            ✨ AI will automatically extract company name, job title, and
            requirements from the job description
            <br />
            Generated cover letter will be professionally formatted and
            personalized for the role
            <br />
            <span className="text-amber-600">
              ⚠️ Note: Please review and adjust details before sending
            </span>
          </p>
        </CardContent>
      </Card>

      {generatedCoverLetter && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Generated Cover Letter</CardTitle>
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
              {generatedCoverLetter}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CoverLetterFeature;
