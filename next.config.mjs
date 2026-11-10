/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: false },
      { source: "/voices", destination: "/#reviews", permanent: false },
      { source: "/skills", destination: "/#skills", permanent: false },
      { source: "/career", destination: "/#journey", permanent: false },
      { source: "/learn", destination: "/", permanent: false },
      { source: "/knowledge", destination: "/", permanent: false },
      { source: "/help", destination: "/#faq", permanent: false },
      { source: "/portfolio", destination: "/projects", permanent: false }
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
