const allowedOrigins = [
  "http://localhost:3000",
  "https://localhost:3000",
  "http://localhost:3001",
  "https://localhost:3001",
  "https://incredibleplaygroupfinder.ca",
  "https://ipf-web.vercel.app",
  "https://parent-resource.vercel.app",
];

export function getCorsHeaders(origin) {
  const isAllowedOrigin = allowedOrigins.includes(origin || "");

  // Warn in console if blocked (only in dev)
  if (!isAllowedOrigin && process.env.NODE_ENV === "development") {
    console.warn("⚠️ Blocked CORS request from:", origin);
  }

  return {
    "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  };
}
