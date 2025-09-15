"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// A simple sparkles icon for the AI button
const SparklesIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5z"></path>
    <path d="M22 3h-1.5"></path>
    <path d="M22 10h-1.5"></path>
    <path d="M15 3h-1.5"></path>
    <path d="M15 10h-1.5"></path>
  </svg>
);

// the shape of the data that will be passed back
type AutofillData = {
  jobTitle: string;
  company: string;
  location: string;
};

// Define the props
type AiAutofillButtonProps = {
  onAutofill: (data: AutofillData) => void;
};

const AiAutofillButton = ({ onAutofill }: AiAutofillButtonProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [autofillError, setAutofillError] = useState("");

  const handleAutofill = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      setAutofillError(
        "API Key is not configured. Please add it to your .env.local file."
      );
      return;
    }

    if (!jobDescription) {
      setAutofillError("Please paste a job description first.");
      return;
    }
    setIsAutofilling(true);
    setAutofillError("");

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const payload = {
        contents: [
          {
            parts: [
              {
                text: `From the following job description, extract the job title, the company name, and the primary work location. \n\n---\n\n${jobDescription}`,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              jobTitle: { type: "STRING" },
              company: { type: "STRING" },
              location: { type: "STRING" },
            },
            required: ["jobTitle", "company", "location"],
          },
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE",
          },
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
      const parsedText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (parsedText) {
        const parsedJson = JSON.parse(parsedText);
        onAutofill(parsedJson);
      } else {
        if (result.promptFeedback?.blockReason) {
          throw new Error(
            `Request blocked due to: ${result.promptFeedback.blockReason}`
          );
        }
        throw new Error(
          "Failed to parse the job description. The API returned an empty response."
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setAutofillError(err.message);
      } else {
        setAutofillError("An unknown error occurred.");
      }
    } finally {
      setIsAutofilling(false);
    }
  };

  return (
    <div className="bg-background p-4 rounded-lg border mb-8">
      <div className="mb-2">
        <label
          htmlFor="jobDescription"
          className="block text-sm font-medium mb-1"
        >
          Job Description (Optional Autofill)
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={5}
          placeholder="Paste the full job description here to autofill fields..."
          className="w-full p-2 border rounded-md text-sm bg-muted focus:ring-2 focus:ring-primary focus:border-primary"
        />
      </div>
      <Button
        type="button"
        onClick={handleAutofill}
        disabled={isAutofilling}
        className="w-full"
      >
        {isAutofilling ? (
          "Parsing..."
        ) : (
          <>
            <SparklesIcon className="w-4 h-4 mr-2" />
            Autofill from Description
          </>
        )}
      </Button>
      {autofillError && (
        <p className="text-red-500 text-sm mt-2">{autofillError}</p>
      )}
    </div>
  );
};

export default AiAutofillButton;
