/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "fr"], // List of supported locales
    defaultLocale: "en", // Default locale when visiting non-prefixed paths
    localeDetection: true, // Automatically detect the user's locale
  },
};

export default nextConfig;
