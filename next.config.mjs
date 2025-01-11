/** @type {import('next').NextConfig} */
const nextConfig = {
    // eslint: {
    //   ignoreDuringBuilds: true,
    // },
    images: {
        domains: [
          'utfs.io',
          'lh3.googleusercontent.com',
          'gravatar.com',
          'xc6ppplfpy.ufs.sh', 
        ],
    },
  };
  
  export default nextConfig;