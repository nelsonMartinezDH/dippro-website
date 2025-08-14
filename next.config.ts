import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: [
            'cdn.unimagdalena.edu.co',
            'www.unimagdalena.edu.co',
        ],
    },
};

export default nextConfig;
