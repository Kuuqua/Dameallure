/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // loremflickr.com serves the temporary stand-in photography used
    // throughout the site (see src/lib/placeholder.js) — keyword-matched
    // so placeholders are at least contextually relevant. Remove this
    // once every placeholder has been swapped for real photography.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
