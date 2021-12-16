/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
};

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    // disable: process.env.NODE_ENV === "development"
  },
});
