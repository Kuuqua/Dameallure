/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // placehold.co serves the temporary stand-in imagery used throughout
    // the site (see src/lib/placeholder.js). Remove this once every
    // placeholder has been swapped for real photography.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
