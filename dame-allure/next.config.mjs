/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // picsum.photos serves the temporary stand-in photography used
    // throughout the site (see src/lib/placeholder.js). Remove this once
    // every placeholder has been swapped for real photography.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
};

export default nextConfig;
