/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://cfulruffxneijmcvpclz.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmdWxydWZmeG5laWptY3ZwY2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMTE4MDAsImV4cCI6MjA0OTU4NzgwMH0.NeyDg6C8yeFfdHMFXrVVdkurO-9K-hon0E98yAWG-V0',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

module.exports = nextConfig;
