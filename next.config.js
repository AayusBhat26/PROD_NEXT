/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commnonjs utf-8-validate",
      bufferutil: "commnonjs bufferutil",
    });
    return config;
  },
  images: {
    domains: ["utfs.io", "uploadthing.com"],
  },
};

module.exports = nextConfig;
