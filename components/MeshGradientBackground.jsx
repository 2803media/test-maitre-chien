"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MeshGradientBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-gray-950">
      {/* Blob 1 - Top Left */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 - Top Right */}
      <motion.div
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(236, 72, 153, 0.4) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Blob 3 - Bottom Left */}
      <motion.div
        className="absolute -bottom-32 -left-32 w-[550px] h-[550px] rounded-full blur-3xl opacity-45"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(239, 68, 68, 0.4) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Blob 4 - Bottom Right */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(99, 102, 241, 0.4) 50%, transparent 70%)",
        }}
        animate={{
          x: [0, -70, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 19,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Blob 5 - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(168, 85, 247, 0.4) 50%, transparent 70%)",
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Petits accents lumineux */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full blur-2xl opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] rounded-full blur-2xl opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      {/* Overlay avec grille subtile */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Overlay de protection pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/60 to-white/90 dark:from-gray-950/80 dark:via-gray-950/60 dark:to-gray-950/90 pointer-events-none" />
    </div>
  );
};

export default MeshGradientBackground;
