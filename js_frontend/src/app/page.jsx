"use client"

import { useState } from "react"
import Link from "next/link"

const presetModes = [
  { id: "easy", label: "Легкий", description: "5 жизней, подсказки." },
  { id: "normal", label: "Средний", description: "3 жизни, подсказки" },
  { id: "hard", label: "Сложный", description: "1 жизнь." },
]

const difficultyChoices = [
  { id: "easy", label: "да" },
  { id: "medium", label: "нет" },
]

const inputMethodChoices = [
  { id: "type", label: "вручную" },
  { id: "select", label: "из списка" },
]

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState("normal")
  const [customSettings, setCustomSettings] = useState({
    lives: 3,
    difficulty: "medium",
    inputMethod: "type",
  })

  const getGameSettings = () => {
    if (selectedMode === "custom") {
      return {
        lives: customSettings.lives,
        difficulty: customSettings.difficulty,
        inputMethod: customSettings.inputMethod,
      }
    }

    const presets = {
      easy: { lives: 5, difficulty: "easy", inputMethod: "type" },
      normal: { lives: 3, difficulty: "medium", inputMethod: "type" },
      hard: { lives: 1, difficulty: "hard", inputMethod: "type" },
    }

    return presets[selectedMode]
  }

  const settings = getGameSettings()
  const gameUrl = `/game?lives=${settings.lives}&difficulty=${settings.difficulty}&inputMethod=${settings.inputMethod}`
  const isCustom = selectedMode === "custom"

  const presetClass = (isSelected) =>
    `origin-left text-left uppercase transition-all duration-200 hover:scale-110 hover:text-white ${
      isSelected
        ? "text-white underline decoration-2 underline-offset-8 scale-110"
        : "text-white"
    }`

  const optionClass = (isSelected) =>
    `origin-left uppercase tracking-[0.08em] text-zinc-400 transition-all duration-200 hover:scale-110 hover:text-zinc-200 ${
      isSelected ? "underline decoration-2 underline-offset-8 text-zinc-300" : ""
    }`

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-8 py-6 md:px-14 md:py-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col">
        <div className="mt-2 flex items-end justify-between gap-8">
          <div className="text-4xl text-zinc-300 md:text-5xl">
            *User*
          </div>

          <h1 className="translate-y-1 text-center text-6xl uppercase tracking-[0.22em] text-foreground md:text-7xl">
            Созвездия
          </h1>

          <Link
            href="/rules"
            className="translate-y-1 text-4xl uppercase tracking-[0.18em] text-zinc-300 transition-all duration-200 hover:scale-110 hover:text-white md:text-5xl"
          >
            Правила
          </Link>
        </div>

        <div className="mt-16 grid flex-1 gap-12 md:mt-20 md:grid-cols-[1fr_1.15fr] md:gap-20">
          <section>
            <h2 className="mb-4 text-5xl font-bold uppercase tracking-[0.18em] text-foreground">
              Режим игры
            </h2>
            <div className="mb-8 h-px w-full bg-foreground/20" />

            <div className="flex flex-col gap-8">
              {presetModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className="grid grid-cols-[auto_auto_1fr] items-baseline gap-4"
                >
                  <span
                    className={`text-3xl text-zinc-300 transition-all duration-200 ${
                      selectedMode === mode.id ? "rotate-[-90deg] opacity-100" : "opacity-0"
                    }`}
                  >
                    ✓
                  </span>
                  <span className={`text-5xl font-bold tracking-[0.14em] ${presetClass(selectedMode === mode.id)}`}>
                    {mode.label}
                  </span>
                  <span className="text-4xl tracking-[0.08em] text-zinc-400">
                    {mode.description}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section>
            <button
              onClick={() => setSelectedMode("custom")}
              className="mb-4 text-left text-white"
            >
              <span
                className={`text-5xl font-bold uppercase tracking-[0.18em] ${
                  isCustom ? "underline decoration-2 underline-offset-8" : ""
                }`}
              >
                Индивидуальная настройка
              </span>
            </button>
            <div className="mb-8 h-px w-full bg-foreground/20" />

            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                <p className="text-4xl tracking-[0.08em] text-zinc-400">
                  Жизни
                </p>
                <div className="flex flex-wrap gap-8">
                  {[1, 3, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setSelectedMode("custom")
                        setCustomSettings((prev) => ({ ...prev, lives: num }))
                      }}
                      className={`text-4xl ${optionClass(isCustom && customSettings.lives === num)}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                <p className="text-4xl tracking-[0.08em] text-zinc-400">
                  Способ ввода
                </p>
                <div className="flex flex-wrap gap-8">
                  {inputMethodChoices.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setSelectedMode("custom")
                        setCustomSettings((prev) => ({ ...prev, inputMethod: method.id }))
                      }}
                      className={`text-4xl ${optionClass(isCustom && customSettings.inputMethod === method.id)}`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                <p className="text-4xl tracking-[0.08em] text-zinc-400">
                  Подсказки
                </p>
                <div className="flex flex-wrap gap-8">
                  {difficultyChoices.map((diff) => (
                    <button
                      key={diff.id}
                      onClick={() => {
                        setSelectedMode("custom")
                        setCustomSettings((prev) => ({ ...prev, difficulty: diff.id }))
                      }}
                      className={`text-4xl ${optionClass(isCustom && customSettings.difficulty === diff.id)}`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="pointer-events-none fixed bottom-8 right-8 flex flex-col items-end gap-6 md:bottom-10 md:right-14">
          <Link
            href={gameUrl}
            className="pointer-events-auto origin-right text-5xl uppercase tracking-[0.18em] text-foreground transition-all duration-200 hover:scale-110 hover:text-white md:text-6xl"
          >
            Начать
          </Link>
        </div>
      </div>
    </main>
  )
}
