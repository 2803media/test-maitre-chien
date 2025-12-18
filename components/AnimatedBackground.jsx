"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [points, setPoints] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial setup
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    // Generate initial points
    const initialPoints = Array(15)
      .fill(0)
      .map(() => ({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 3 + 1,
      }));
    setPoints(initialPoints);

    // Animate points slightly over time
    const interval = setInterval(() => {
      setPoints((prevPoints) =>
        prevPoints.map((p) => ({
          ...p,
          x: Math.max(
            0.05,
            Math.min(0.95, p.x + (Math.random() * 0.02 - 0.01))
          ),
          y: Math.max(
            0.05,
            Math.min(0.95, p.y + (Math.random() * 0.02 - 0.01))
          ),
        }))
      );
    }, 100);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      clearInterval(interval);
    };
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        {/* Lines connecting points */}
        {points.map((point, i) =>
          points.slice(i + 1).map((otherPoint, j) => {
            const distance = Math.sqrt(
              Math.pow(point.x - otherPoint.x, 2) +
                Math.pow(point.y - otherPoint.y, 2)
            );

            // Only draw lines between points that are close to each other
            if (distance < 0.3) {
              return (
                <line
                  key={`${i}-${j}`}
                  x1={point.x * dimensions.width}
                  y1={point.y * dimensions.height}
                  x2={otherPoint.x * dimensions.width}
                  y2={otherPoint.y * dimensions.height}
                  className="stroke-indigo-200 dark:stroke-indigo-900/30"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                />
              );
            }
            return null;
          })
        )}

        {/* Points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x * dimensions.width}
            cy={point.y * dimensions.height}
            r={point.size}
            className="fill-indigo-400/70 dark:fill-indigo-500/70"
            animate={{
              r: [point.size, point.size * 1.5, point.size],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </svg>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-white/20 to-indigo-50/20 dark:from-gray-900/20 dark:to-indigo-900/20 pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;
