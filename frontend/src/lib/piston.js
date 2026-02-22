// Piston API is a service for code execution
const PISTON_API = "https://emkc.org/api/v2/piston";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
};

// Retry configuration for API failures
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {string} language - programming language
 * @param {string} code - source code to executed
 * @returns {Promise<{success:boolean, output?:string, error?: string}>}
 */
export async function executeCode(language, code) {
  const languageConfig = LANGUAGE_VERSIONS[language];

  if (!languageConfig) {
    return {
      success: false,
      error: `Unsupported language: ${language}`,
    };
  }

  const requestBody = {
    language: languageConfig.language,
    version: languageConfig.version,
    files: [
      {
        name: `main.${getFileExtension(language)}`,
        content: code,
      },
    ],
  };

  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Handle specific error cases
    if (response.status === 401) {
      return {
        success: false,
        error: "Code execution service requires authentication. Please contact support or try again later.",
      };
    }

    if (response.status === 429) {
      return {
        success: false,
        error: "Too many requests. Please wait a moment and try again.",
      };
    }

    if (!response.ok) {
      return {
        success: false,
        error: `Code execution failed with status ${response.status}. Please try again later.`,
      };
    }

    const data = await response.json();

    const output = data.run.output || "";
    const stderr = data.run.stderr || "";

    if (stderr) {
      return {
        success: false,
        output: output,
        error: stderr,
      };
    }

    return {
      success: true,
      output: output || "No output",
    };
  } catch (error) {
    console.error("Code execution error:", error);
    return {
      success: false,
      error: `Unable to execute code. Network error: ${error.message}. Please check your internet connection and try again.`,
    };
  }
}

function getFileExtension(language) {
  const extensions = {
    javascript: "js",
    python: "py",
    java: "java",
    cpp: "cpp",
  };

  return extensions[language] || "txt";
}
