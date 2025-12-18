/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  // Optionnel : ajoutez un préfixe de base si le site est déployé dans un sous-dossier
  // basePath: '/mon-sous-dossier',
  // Optionnel : activez la compression gzip pour les exports statiques
  // compress: true,
  // Optionnel : désactivez les images optimisées si vous n'en utilisez pas
  images: {
    unoptimized: true,
  },
  // Optionnel : spécifiez le dossier de sortie
  distDir: "out",
};

module.exports = nextConfig;
