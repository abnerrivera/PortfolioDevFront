// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**', // Permite todas las rutas bajo /u/
      },
    ],
  },
};

export default nextConfig;