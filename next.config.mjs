/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // agar GitHub login bhi use kare kabhi
      },
      {
        protocol: "https",
        hostname: "www.svgrepo.com", // fallback image ke liye
      },
    ],
  },
};

export default nextConfig;
