import type { NextConfig } from "next";

// Static export. Every AgApps site is a static site: `next build` emits a
// plain `out/` directory that Railway (Railpack) serves with Caddy, so the
// origin container can sleep (Railway Serverless) when idle and cost the
// owner nothing while nobody is visiting. This only works if the site makes
// NO server-side or runtime outbound calls (that would keep it awake / break
// the export) - see AGENTS.md "Static site - hard constraints".
const nextConfig: NextConfig = {
  output: "export",
  // The Next.js image optimizer runs server-side and makes outbound calls,
  // which defeats both the static export and the sleep. Mandatory - and any
  // <Image> added later must stay unoptimized.
  images: { unoptimized: true },
  // Emit /about/index.html instead of /about.html so Caddy serves clean URLs.
  trailingSlash: true,
};

export default nextConfig;
