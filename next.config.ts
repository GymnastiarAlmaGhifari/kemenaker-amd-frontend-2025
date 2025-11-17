import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.dummyjson.com"],
  },
  turbopack: {}, // <── ini wajib biar error hilang
};

// matikan eslint dibawah ini untuk any
/* eslint-disable @typescript-eslint/no-explicit-any */
export default withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
})(config as any);
