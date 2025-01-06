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
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'gravatar.com',
          pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;