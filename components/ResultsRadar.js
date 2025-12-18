"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { User, Dog } from "lucide-react";
import { useState, useEffect } from "react";

export default function ResultsRadar({ results, onRestart }) {
  const { axisResults, overallScore, interpretation } = results;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prepare data for radar chart
  const chartData = axisResults.map((result) => ({
    axis: result.axis,
    Maître: result.master,
    Chien: result.dog,
  }));

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 75) return "text-lime-600 dark:text-lime-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (score >= 45) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 90) return "from-green-500 to-emerald-600";
    if (score >= 75) return "from-lime-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    if (score >= 45) return "from-orange-500 to-red-500";
    return "from-red-500 to-pink-600";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      <div className="max-w-5xl w-full animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Résultats du Test
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez votre compatibilité avec votre chien
          </p>
        </div>

        {/* Overall score */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Score de Compatibilité
            </h2>
            <div
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getScoreBg(overallScore)} shadow-xl`}
            >
              <span className="text-5xl font-bold text-white">
                {overallScore}%
              </span>
            </div>
          </div>
          <p className="text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {interpretation}
          </p>
        </div>

        {/* Radar chart */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6 text-center">
            Profil de Personnalité
          </h3>
          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-4 md:p-8 shadow-inner">
            <ResponsiveContainer width="100%" height={isMobile ? 400 : 550}>
              <RadarChart
                data={chartData}
                margin={
                  isMobile
                    ? { top: 30, right: 30, bottom: 30, left: 30 }
                    : { top: 60, right: 120, bottom: 60, left: 120 }
                }
              >
                <defs>
                  <linearGradient
                    id="masterGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#a5b4fc" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.4} />
                  </linearGradient>
                  <linearGradient id="dogGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f9a8d4" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#f472b6" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <PolarGrid
                  stroke="currentColor"
                  className="text-gray-300 dark:text-gray-500"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={({ payload, x, y, textAnchor, cx, cy }) => {
                    const offset = isMobile ? 12 : 25;
                    const angle = Math.atan2(y - cy, x - cx);
                    const xWithOffset = x + Math.cos(angle) * offset;
                    const yWithOffset = y + Math.sin(angle) * offset;

                    return (
                      <g transform={`translate(${xWithOffset},${yWithOffset})`}>
                        <text
                          x={0}
                          y={0}
                          textAnchor={textAnchor}
                          className="fill-gray-700 dark:fill-gray-200"
                          style={{
                            fontSize: isMobile ? "11px" : "14px",
                            fontWeight: 600,
                            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                          }}
                        >
                          {payload.value}
                        </text>
                      </g>
                    );
                  }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  tick={({ payload, x, y }) => (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      className="fill-gray-500 dark:fill-gray-400"
                      style={{
                        fontSize: isMobile ? "9px" : "11px",
                        fontWeight: 500,
                      }}
                    >
                      {payload.value}
                    </text>
                  )}
                  tickCount={6}
                  stroke="currentColor"
                  className="text-gray-300 dark:text-gray-600"
                />
                <Radar
                  name="Maître"
                  dataKey="Maître"
                  stroke="#818cf8"
                  fill="url(#masterGradient)"
                  strokeWidth={isMobile ? 2.5 : 3}
                  dot={{
                    fill: "#818cf8",
                    r: isMobile ? 3.5 : 5,
                    strokeWidth: isMobile ? 1.5 : 2.5,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: isMobile ? 5 : 7,
                    strokeWidth: isMobile ? 2 : 3,
                  }}
                />
                <Radar
                  name="Chien"
                  dataKey="Chien"
                  stroke="#f472b6"
                  fill="url(#dogGradient)"
                  strokeWidth={isMobile ? 2.5 : 3}
                  dot={{
                    fill: "#f472b6",
                    r: isMobile ? 3.5 : 5,
                    strokeWidth: isMobile ? 1.5 : 2.5,
                    stroke: "#fff",
                  }}
                  activeDot={{
                    r: isMobile ? 5 : 7,
                    strokeWidth: isMobile ? 2 : 3,
                  }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: isMobile ? "20px" : "32px",
                    fontSize: isMobile ? "13px" : "15px",
                    fontWeight: 700,
                  }}
                  iconType="circle"
                  iconSize={isMobile ? 10 : 14}
                  formatter={(value) => (
                    <span className="text-gray-700 dark:text-gray-200">
                      {value}
                    </span>
                  )}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed scores */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
            Détails par Axe
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {axisResults.map((result, index) => (
              <div
                key={result.axis}
                className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  {result.axis}
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Maître
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {result.master}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dog className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Chien
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-100">
                      {result.dog}%
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        Similarité
                      </span>
                      <span
                        className={`font-bold ${getScoreColor(result.similarity)}`}
                      >
                        {result.similarity}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restart button */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Recommencer le Test
          </button>
        </div>
      </div>
    </div>
  );
}
