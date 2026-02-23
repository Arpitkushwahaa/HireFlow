// Code execution using Node.js built-in modules — no external APIs needed
import vm from "vm";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import os from "os";
import { randomUUID } from "crypto";

// Run JavaScript safely in a sandboxed vm context
function runJavaScript(code) {
  const logs = [];

  const safeConsole = {
    log: (...args) => {
      const line = args
        .map((a) => {
          if (Array.isArray(a)) return JSON.stringify(a);
          if (a !== null && typeof a === "object") return JSON.stringify(a);
          return String(a);
        })
        .join(" ");
      logs.push(line);
    },
    error: (...args) => logs.push(args.map(String).join(" ")),
    warn:  (...args) => logs.push(args.map(String).join(" ")),
  };

  const context = vm.createContext({
    console: safeConsole,
    Array, Object, Math, JSON, Number, String, Boolean, Symbol,
    parseInt, parseFloat, isNaN, isFinite,
    Map, Set, WeakMap, WeakSet, Promise, RegExp, Error, Date,
    setTimeout: () => {}, clearTimeout: () => {},
    setInterval: () => {}, clearInterval: () => {},
    Infinity, NaN, undefined,
  });

  vm.runInContext(code, context, { timeout: 10000 });
  return logs.join("\n") || "No output";
}

// Run Python/Java/C++ via child_process
function runWithProcess(command, tmpDir) {
  try {
    const output = execSync(command, {
      timeout: 15000,
      encoding: "utf8",
      cwd: tmpDir,
    });
    return { success: true, output: output || "No output" };
  } catch (err) {
    const errMsg = err.stderr || err.stdout || err.message || "Unknown error";
    return { success: false, error: errMsg };
  }
}

export const executeCode = async (req, res) => {
  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ success: false, error: "Language and code are required" });
  }

  // ── JavaScript (vm — no subprocess, always works) ──────────────────────────
  if (language === "javascript") {
    try {
      const output = runJavaScript(code);
      return res.json({ success: true, output });
    } catch (err) {
      return res.json({ success: false, error: err.message });
    }
  }

  // ── Python / Java / C++ (child_process on Render's Ubuntu env) ─────────────
  const tmpDir = join(os.tmpdir(), randomUUID());
  try {
    mkdirSync(tmpDir, { recursive: true });

    if (language === "python") {
      const file = join(tmpDir, "main.py");
      writeFileSync(file, code, "utf8");
      const result = runWithProcess(`python3 "${file}" 2>&1`, tmpDir);
      return res.json(result);
    }

    if (language === "java") {
      const file = join(tmpDir, "Main.java");
      writeFileSync(file, code, "utf8");
      const compile = runWithProcess(`javac "${file}" 2>&1`, tmpDir);
      if (!compile.success) return res.json({ success: false, error: compile.error });
      const run = runWithProcess(`java -cp "${tmpDir}" Main 2>&1`, tmpDir);
      return res.json(run);
    }

    if (language === "cpp") {
      const src = join(tmpDir, "main.cpp");
      const bin = join(tmpDir, "main");
      writeFileSync(src, code, "utf8");
      const compile = runWithProcess(`g++ -o "${bin}" "${src}" 2>&1`, tmpDir);
      if (!compile.success) return res.json({ success: false, error: compile.error });
      const run = runWithProcess(`"${bin}" 2>&1`, tmpDir);
      return res.json(run);
    }

    return res.status(400).json({ success: false, error: `Unsupported language: ${language}` });

  } catch (err) {
    console.error("Code execution error:", err);
    return res.json({ success: false, error: err.message });
  } finally {
    try { rmSync(tmpDir, { recursive: true, force: true }); } catch (_) {}
  }
};
