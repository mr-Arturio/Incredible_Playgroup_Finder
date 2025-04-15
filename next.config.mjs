import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",

});

const nextConfig = {
  async rewrites() {
    return [
      { source: "/en/LICENSE", destination: "/LICENSE" },
      { source: "/fr/LICENSE", destination: "/LICENSE" },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        port: "",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options", //prevent clickjacking attacks
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options", // prevents the browser from MIME type sniffing, which can lead to security vulnerabilities like cross-site scripting (XSS).
            value: "nosniff", // prevent  code injection attacks.
          },
          {
            key: "Referrer-Policy", //controls how much referrer information (the URL of the previous page) is sent to other websites when users click a link or navigate away from your site.
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy", //  Only allows geolocation access (i.e., retrieving the user’s location) from your own domain
            value: "geolocation=(self), camera=()", // Denies access to the camera API entirely
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type", // Ensures the service worker is interpreted correctly as JavaScript.
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control", //Prevents caching of the service worker, ensuring users always get the latest version.
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy", //Implements a strict Content Security Policy for the service worker, only allowing scripts from the same origin.
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
