"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RulesContent() {
  const searchParams = useSearchParams()
  const returnTo = searchParams.get("returnTo")

  return (
    <main 
      className="min-h-screen w-full flex flex-col items-center justify-center px-8 py-8 relative"
      style={{
        backgroundImage: "url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Back button - top right */}
      <Link
        href={returnTo || "/"}
        className="fixed top-6 right-8 text-[40px] text-white/80 hover:text-white transition-colors tracking-wide z-50"
      >
        Назад
      </Link>

      <header className="text-center mb-10">
        <h1 className="text-[135px] text-white tracking-wide mb-4">
          Правила
        </h1>
        <div className="w-24 h-px bg-white/30 mx-auto" />
      </header>

      <div className="max-w-3xl text-center flex flex-col gap-8">
        <section>
          <h2 className="text-[70px] text-white tracking-wide mb-2">
            Цель игры
          </h2>
          <p className="text-[35px] text-white/70 leading-relaxed tracking-wide">
            Дойти от начального созвездия до конечного, перемещаясь только по соседним созвездиям.
            Побеждает тот, кто первым достигнет финишного созвездия.
          </p>
        </section>

        <div className="w-20 h-px bg-white/20 mx-auto" />

        <section>
          <h2 className="text-[70px] text-white tracking-wide mb-2">
            Ход игры
          </h2>
          <p className="text-[35px] text-white/70 leading-relaxed tracking-wide">
            Вы и ИИ по очереди называете созвездия. Каждое названное созвездие должно быть
            соседним с текущим и ещё не использованным в этой партии.
          </p>
        </section>

        <div className="w-20 h-px bg-white/20 mx-auto" />

        <section>
          <h2 className="text-[70px] text-white tracking-wide mb-2">
            Ошибки
          </h2>
          <p className="text-[35px] text-white/70 leading-relaxed tracking-wide">
            При неверном ходе (несоседнее созвездие, уже использованное или несуществующее)
            вы теряете одну жизнь. Когда жизни заканчиваются — игра проиграна.
          </p>
        </section>

        <div className="w-20 h-px bg-white/20 mx-auto" />

        <section>
          <h2 className="text-[70px] text-white tracking-wide mb-2">
            Победа и поражение
          </h2>
          <p className="text-[35px] text-white/70 leading-relaxed tracking-wide">
            Игра завершается, когда кто-то достигает конечного созвездия, у одной из сторон
            не остаётся допустимых ходов, или когда вы решите завершить игру досрочно.
          </p>
        </section>
      </div>
    </main>
  )
}

export default function RulesPage() {
  return (
    <Suspense fallback={
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
    }>
      <RulesContent />
    </Suspense>
  )
}
