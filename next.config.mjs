// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "Permissions-Policy",
              value: "geolocation=(self)",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  