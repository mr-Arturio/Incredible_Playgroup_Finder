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
        port: "", // leave empty for default port
        pathname: "/media/**", // this allows all images under the /media/ path
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
    ];
  },
};

export default nextConfig;
