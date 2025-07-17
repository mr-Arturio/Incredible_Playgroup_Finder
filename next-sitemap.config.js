module.exports = {
  siteUrl: 'https://www.incredibleplaygroupfinder.ca', // Replace with your domain
  generateRobotsTxt: true,  // Automatically generates a robots.txt file
  sitemapSize: 5000,  // Split sitemap into files if your site has more than 5000 URLs
  exclude: ['/private/*'],  // Optional: exclude certain URLs from the sitemap
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.incredibleplaygroupfinder.ca/my-custom-sitemap.xml', 
    ],
  },
};
