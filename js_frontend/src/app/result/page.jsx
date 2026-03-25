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
        backgroundImage: "url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Start and Target */}
      <div className="w-full max-w-4xl flex justify-between items-start mb-12">
        <div className="text-left">
          <p className="text-[40px] text-white/60 tracking-wide mb-2">Старт</p>
          <p className="text-[70px] text-white tracking-wide">{start}</p>
        </div>
        <div className="text-right">
          <p className="text-[40px] text-white/60 tracking-wide mb-2">Финиш</p>
          <p className="text-[70px] text-white tracking-wide">{target}</p>
        </div>
      </div>

      {/* Result */}
      <div className="text-center mb-8">
        <h1 className="text-[135px] text-white tracking-wide mb-4">
          {isWon ? "Победа" : "Поражение"}
        </h1>
        <div className="w-24 h-px bg-white/30 mx-auto mb-4" />
        <p className="text-[40px] text-white/60 tracking-wide">{reason}</p>
      </div>

      {/* Star map placeholder */}
      <div className="w-full max-w-2xl aspect-video border border-white/20 flex items-center justify-center mb-12 relative overflow-hidden">
        {/* Starry background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/5">
          {/* Decorative stars */}
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
            { top: 20, left: 35, opacity: 0.5 },
            { top: 45, left: 10, opacity: 0.7 },
            { top: 65, left: 85, opacity: 0.3 },
            { top: 90, left: 40, opacity: 0.5 },
            { top: 30, left: 70, opacity: 0.4 },
            { top: 50, left: 25, opacity: 0.6 },
            { top: 75, left: 60, opacity: 0.3 },
            { top: 5, left: 95, opacity: 0.5 },
            { top: 95, left: 5, opacity: 0.4 },
            { top: 48, left: 52, opacity: 0.6 },
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
        <p className="text-[35px] text-white/40 tracking-wide z-10">
          Визуализация маршрута
        </p>
      </div>

      {/* Divider */}
      <div className="w-32 h-px bg-white/20 mb-8" />

      {/* Back to main */}
      <Link
        href="/"
        className="text-[80px] text-white hover:text-white/80 transition-colors tracking-wide"
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
            backgroundImage: "url('/bg-stars.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-[50px] text-white/60 tracking-wide">Загрузка...</p>
        </main>
      }
    >
      <ResultContent />
    </Suspense>
  )
}
