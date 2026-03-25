"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RulesContent() {
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo")

  return (
    <main 
      className="min-h-screen w-full flex flex-col px-8 py-6"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Amatic SC', cursive",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <Link
          href={returnTo || "/"}
          className="text-2xl text-white/80 hover:text-white transition-colors"
        >
          Назад
        </Link>
        <h1 className="text-6xl text-white">Правила</h1>
        <div className="w-16" />
      </div>

      {/* Rules Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto">
        <div className="space-y-6 text-white/90">
          <section>
            <h2 className="text-4xl text-white mb-3">Цель игры</h2>
            <p className="text-2xl text-white/70 leading-relaxed">
              Дойдите от начального созвездия до конечного, перемещаясь 
              по соседним созвездиям. Первый, кто достигнет цели - побеждает.
            </p>
          </section>

          <section>
            <h2 className="text-4xl text-white mb-3">Как играть</h2>
            <ul className="text-2xl text-white/70 space-y-2 leading-relaxed">
              <li>Введите название соседнего созвездия</li>
              <li>Каждое созвездие можно использовать только один раз</li>
              <li>Неверный ход отнимает одну жизнь</li>
              <li>Игра заканчивается, когда кто-то достигает цели или у вас заканчиваются жизни</li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl text-white mb-3">Режимы</h2>
            <ul className="text-2xl text-white/70 space-y-2 leading-relaxed">
              <li><span className="text-white">Лёгкий</span> - 5 жизней, показываются доступные соседи</li>
              <li><span className="text-white">Средний</span> - 3 жизни, показываются доступные соседи</li>
              <li><span className="text-white">Сложный</span> - 1 жизнь, ИИ играет на максимуме</li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl text-white mb-3">Подсказки</h2>
            <ul className="text-2xl text-white/70 space-y-2 leading-relaxed">
              <li>Нажмите Tab для автодополнения названия созвездия</li>
              <li>Используйте кнопку &quot;Проверить&quot; чтобы узнать, было ли созвездие уже названо</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}

export default function RulesPage() {
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
      <RulesContent />
    </Suspense>
  )
}
