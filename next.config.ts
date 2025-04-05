import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {hostname: 'cdn.pixabay.com'},
      {hostname: 'thumbs.dreamstime.com'}
    ]
  }
};

export default nextConfig;
