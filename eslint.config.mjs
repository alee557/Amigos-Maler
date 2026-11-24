import nextConfig from "eslint-config-next";

const config = [{ ignores: [".next*/**"] }, ...nextConfig];

export default config;
