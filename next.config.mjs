const legacyPages = [
  "about",
  "contact",
  "services",
  "interior-painting",
  "exterior-painting",
  "Plastering",
  "Drywall",
  "Facade-Renovation",
  "appartment-renovation",
  "spray-painting",
  "color-and-material",
  "projects",
  "property-value-preservation",
  "partners"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  turbopack: {
    root: import.meta.dirname
  },
  webpack(config) {
    const allowIntentionalGlobalSelectors = (rule) => {
      rule.oneOf?.forEach(allowIntentionalGlobalSelectors);
      for (const loader of Array.isArray(rule.use) ? rule.use : []) {
        if (loader?.options?.modules?.mode === "pure") loader.options.modules.mode = "local";
      }
    };
    config.module.rules.forEach(allowIntentionalGlobalSelectors);
    return config;
  },
  async redirects() {
    return legacyPages.map((page) => ({
      source: `/${page}.html`,
      destination: `/${page}`,
      permanent: true
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/legacy/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" }
        ]
      },
      {
        source: "/vendor/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      },
      {
        source: "/customer/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" }
        ]
      },
      {
        source: "/admin/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" }
        ]
      }
    ];
  }
};

export default nextConfig;
