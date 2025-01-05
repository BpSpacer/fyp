/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            pathname: '/**',
          },
        ],
      },
    };
    
    export default nextConfig;
    
  
  