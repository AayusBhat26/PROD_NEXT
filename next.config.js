/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: ["utfs.io", "uploadthing.com"],
    remotePatterns:[
      {
        protocol:'https', hostname:'uploadthing.com', pathname:'*'
      }
    ]
  },
};

module.exports = nextConfig
