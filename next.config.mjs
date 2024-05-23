import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["celiac-backend.oc.kian.work", "fakestoreapi.com"],
  },
};

export default withNextIntl(nextConfig);
