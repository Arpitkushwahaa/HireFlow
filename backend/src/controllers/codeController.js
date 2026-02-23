// Uses Node.js 18+ built-in fetch — no extra dependencies needed
// Piston API - free, no key needed, works server-to-server
const PISTON_API = "https://emkc.org/api/v2/piston";

// Piston language configs
const LANGUAGE_CONFIGS = {
  javascript: { language: "javascript", version: "18.15.0", filename: "main.js" },
  python:     { language: "python",     version: "3.10.0",  filename: "main.py" },
  java:       { language: "java",       version: "15.0.2",  filename: "Main.java" },
  cpp:        { language: "c++",        version: "10.2.0",  filename: "main.cpp" },
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

    const langConfig = LANGUAGE_CONFIGS[language];

    if (!langConfig) {
      return res.status(400).json({
        success: false,
        error: `Unsupported language: ${language}`,
      });
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: langConfig.language,
        version:  langConfig.version,
        files: [{ name: langConfig.filename, content: code }],
        stdin: "",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Piston API error (${response.status}):`, errorText);
      return res.status(500).json({
        success: false,
        error: "Code execution service temporarily unavailable.",
      });
    }

    const result = await response.json();

    const stdout   = result.run?.stdout || "";
    const stderr   = result.run?.stderr || "";
    const exitCode = result.run?.code;

    if (stderr || (exitCode !== 0 && exitCode !== null)) {
      return res.json({
        success: false,
        output: stdout,
        error: stderr || `Process exited with code ${exitCode}`,
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
