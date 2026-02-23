import fetch from "node-fetch";

// Official Judge0 public API - completely free, no API key needed
const JUDGE0_API = "https://ce.judge0.com";

// Judge0 language IDs
const LANGUAGE_IDS = {
  javascript: 63,  // Node.js 12.14.0
  python: 71,      // Python 3.8.1
  java: 62,        // Java OpenJDK 13.0.1
  cpp: 54,         // C++ (GCC 9.2.0)
};

export const executeCode = async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res.status(400).json({
        success: false,
        error: "Language and code are required",
      });
    }

    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: "",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Judge0 API error (${response.status}):`, errorText);
      return res.status(500).json({
        success: false,
        error: "Code execution service temporarily unavailable.",
      });
    }

    const result = await response.json();

    const stdout = result.stdout || "";
    const stderr = result.stderr || "";
    const compileOutput = result.compile_output || "";
    const errorOutput = stderr || compileOutput;

    if (errorOutput) {
      return res.json({
        success: false,
        output: stdout,
        error: errorOutput,
      });
    }

    return res.json({
      success: true,
      output: stdout || "No output",
    });

  } catch (error) {
    console.error("Code execution error:", error);
    return res.status(500).json({
      success: false,
      error: "Code execution service temporarily unavailable. Please try again later.",
    });
  }
};
