// Piston API is a service for code execution
// Using multiple endpoints for redundancy
const PISTON_ENDPOINTS = [
  "https://emkc.org/api/v2/piston",
  "https://rextester.com/api/v2/piston",
  "https://code-compiler.p.rapidapi.com/v2/piston",
];

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

  // Try multiple endpoints until one works
  let lastError = null;
  let attemptedEndpoints = [];
  
  for (const endpoint of PISTON_ENDPOINTS) {
    try {
      console.log(`Attempting code execution with: ${endpoint}`);
      
      const response = await fetch(`${endpoint}/execute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      attemptedEndpoints.push(endpoint);

      // Handle specific error cases
      if (response.status === 401) {
        console.log(`⚠️ ${endpoint} returned 401, trying next endpoint...`);
        lastError = `Authentication failed`;
        continue; // Try next endpoint
      }

      if (response.status === 429) {
        console.log(`⚠️ ${endpoint} returned 429 (rate limit)`);
        lastError = "Rate limit exceeded";
        continue; // Try next endpoint instead of stopping
      }

      if (!response.ok) {
        console.log(`⚠️ ${endpoint} returned ${response.status}`);
        lastError = `HTTP ${response.status}`;
        continue; // Try next endpoint
      }

      const data = await response.json();
      console.log(`✅ Code executed successfully on ${endpoint}`);

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
      console.log(`❌ ${endpoint} failed:`, error.message);
      lastError = error.message;
      attemptedEndpoints.push(endpoint);
      continue; // Try next endpoint
    }
  }

  // All endpoints failed
  console.error(`All ${attemptedEndpoints.length} endpoints failed. Last error: ${lastError}`);
  return {
    success: false,
    error: `Unable to execute code. All execution services are currently unavailable. Please try again in a few moments.`,
  };
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
