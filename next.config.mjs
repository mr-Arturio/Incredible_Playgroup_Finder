const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',  // leave empty for default port
        pathname: '/media/**',  // this allows all images under the /media/ path
      },
    ],
  },
};

export default nextConfig;