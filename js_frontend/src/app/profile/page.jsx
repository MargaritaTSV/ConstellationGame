"use client"

import Link from "next/link"

export default function ProfilePage() {
  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: "url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h1 className="text-[135px] text-white tracking-wide mb-8">
        Личный кабинет
      </h1>

      {/* Placeholder content */}
      <div className="text-center mb-12">
        <p className="text-[50px] text-white/60 tracking-wide mb-4">
          Страница в разработке
        </p>
        <p className="text-[35px] text-white/40 tracking-wide">
          Здесь будет статистика и настройки профиля
        </p>
      </div>

      {/* Return Button */}
      <Link
        href="/"
        className="text-[80px] text-white hover:text-white/80 transition-colors tracking-wide"
      >
        Перейти к настройке игры
      </Link>
    </main>
  )
}
