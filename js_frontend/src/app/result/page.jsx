"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ResultContent() {
  const searchParams = useSearchParams()
  
  const result = searchParams.get("result") || "lost"
  const reason = searchParams.get("reason") || "Неизвестная причина"
  const start = searchParams.get("start") || "—"
  const target = searchParams.get("target") || "—"

  const isWon = result === "won"

  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center px-8 py-8"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Amatic SC', cursive",
      }}
    >
      {/* Start and Target */}
      <div className="w-full max-w-3xl flex justify-between items-start mb-10">
        <div className="text-left">
          <p className="text-2xl text-white/60 mb-1">Старт</p>
          <p className="text-4xl text-white">{start}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-white/60 mb-1">Финиш</p>
          <p className="text-4xl text-white">{target}</p>
        </div>
      </div>

      {/* Result */}
      <div className="text-center mb-8">
        <h1 className="text-7xl text-white mb-4">
          {isWon ? "Победа" : "Поражение"}
        </h1>
        <div className="w-24 h-px bg-white/30 mx-auto mb-4" />
        <p className="text-2xl text-white/60">{reason}</p>
      </div>

      {/* Star map placeholder */}
      <div className="w-full max-w-xl aspect-video border border-white/20 flex items-center justify-center mb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5">
          {[
            { top: 10, left: 15, opacity: 0.4 },
            { top: 25, left: 80, opacity: 0.6 },
            { top: 40, left: 30, opacity: 0.3 },
            { top: 55, left: 65, opacity: 0.5 },
            { top: 70, left: 20, opacity: 0.7 },
            { top: 85, left: 75, opacity: 0.4 },
            { top: 15, left: 50, opacity: 0.5 },
            { top: 35, left: 90, opacity: 0.3 },
            { top: 60, left: 45, opacity: 0.6 },
            { top: 80, left: 55, opacity: 0.4 },
          ].map((star, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>
        <p className="text-2xl text-white/40 z-10">
          Визуализация маршрута
        </p>
      </div>

      {/* Back to main */}
      <Link
        href="/"
        className="text-4xl text-white hover:text-white/80 transition-colors"
      >
        На главную
      </Link>
    </main>
  )
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <main 
          className="min-h-screen w-full flex items-center justify-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            fontFamily: "'Amatic SC', cursive",
          }}
        >
          <p className="text-3xl text-white/60">Загрузка...</p>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
