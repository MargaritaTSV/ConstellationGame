"use client"

import Link from "next/link"

export default function ProfilePage() {
  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Amatic SC', cursive",
      }}
    >
      {/* Header */}
      <h1 className="text-6xl text-white mb-8">
        Личный кабинет
      </h1>

      {/* Placeholder content */}
      <div className="text-center mb-10">
        <p className="text-3xl text-white/60 mb-4">
          Страница в разработке
        </p>
        <p className="text-2xl text-white/40">
          Здесь будет статистика и настройки профиля
        </p>
      </div>

      {/* Return Button */}
      <Link
        href="/"
        className="text-4xl text-white hover:text-white/80 transition-colors"
      >
        Перейти к настройке игры
      </Link>
    </main>
  )
}
