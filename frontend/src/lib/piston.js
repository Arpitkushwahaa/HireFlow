// Piston API is a service for code execution
// Using backend proxy to avoid CORS and authentication issues
import axiosInstance from "./axios.js";

const LANGUAGE_VERSIONS = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
};

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

  try {
    const response = await axiosInstance.post("/code/execute", {
      language,
      code,
    });

    return response.data;
  } catch (error) {
    console.error("Code execution error:", error);
    
    if (error.response?.data) {
      return error.response.data;
    }

    return {
      success: false,
      error: "Unable to execute code. Please try again later.",
    };
  }
}
