import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {hostname: 'cdn.pixabay.com'},
      {hostname: 'thumbs.dreamstime.com'},
      {hostname: 'firebase.storage.googleapis.com'},
      {hostname: 'firebasestorage.googleapis.com'},
      {hostname: 'img.clerk.com'}
    ]
  }
};

export default nextConfig;
