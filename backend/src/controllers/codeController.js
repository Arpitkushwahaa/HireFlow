import fetch from "node-fetch";

const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
};

const FILE_EXTENSIONS = {
  javascript: "js",
  python: "py",
  java: "java",
  cpp: "cpp",
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

    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const requestBody = {
      language: languageConfig.language,
      version: languageConfig.version,
      files: [
        {
          name: `main.${FILE_EXTENSIONS[language] || "txt"}`,
          content: code,
        },
      ],
    };

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Piston API error (${response.status}):`, errorText);
      
      return res.status(response.status).json({
        success: false,
        error: `Code execution failed with status ${response.status}`,
      });
    }

    const data = await response.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return res.json({
        success: false,
        output: output,
        error: stderr,
      });
    }

    return res.json({
      success: true,
      output: output || "No output",
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return res.status(500).json({
      success: false,
      error: "Code execution service temporarily unavailable. Please try again later.",
    });
  }
};
