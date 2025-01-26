/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    images: {
        domains: ['lh3.googleusercontent.com']
    },
    reactStrictMode: false,
    typescript: {
        ignoreBuildErrors: true, // Ignore TypeScript errors
    },
    eslint: {
        ignoreDuringBuilds: true, // Ignore ESLint errors during the build
    },
}

export default config;
