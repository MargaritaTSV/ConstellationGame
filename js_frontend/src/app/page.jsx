"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState("medium")
  const [customSettings, setCustomSettings] = useState({
    lives: 3,
    inputMethod: "type",
    hints: true,
  })
  const [showLogin, setShowLogin] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [playerName, setPlayerName] = useState("Имя игрока")

  const presetModes = [
    { id: "easy", label: "Лёгкий", description: "5 жизней, подсказки" },
    { id: "medium", label: "Средний", description: "3 жизни, подсказки" },
    { id: "hard", label: "Сложный", description: "1 жизнь" },
  ]

  const getGameSettings = () => {
    if (selectedMode === "custom") {
      return {
        lives: customSettings.lives,
        difficulty: customSettings.hints ? "easy" : "medium",
        inputMethod: customSettings.inputMethod,
      }
    }
    
    const presets = {
      easy: { lives: 5, difficulty: "easy", inputMethod: "type" },
      medium: { lives: 3, difficulty: "easy", inputMethod: "type" },
      hard: { lives: 1, difficulty: "hard", inputMethod: "type" },
    }
    return presets[selectedMode]
  }

  const settings = getGameSettings()
  const gameUrl = `/game?lives=${settings.lives}&difficulty=${settings.difficulty}&inputMethod=${settings.inputMethod}`

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username.trim()) {
      setPlayerName(loginData.username)
      router.push("/profile")
    }
    setShowLogin(false)
  }

  return (
    <main 
      className="min-h-screen w-full flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        aspectRatio: "1910/820",
        minHeight: "100vh",
      }}
    >
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="bg-[#0a1628]/95 border border-white/10 p-8 max-w-md w-full mx-4">
            <h2 className="text-[50px] text-white text-center mb-6 tracking-wide">Вход</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Логин"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-transparent border-b border-white/30 text-white text-[28px] py-2 px-1 tracking-wide placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
              <input
                type="password"
                placeholder="Пароль"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-transparent border-b border-white/30 text-white text-[28px] py-2 px-1 tracking-wide placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-[28px] text-white/60 hover:text-white transition-colors tracking-wide"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="text-[28px] text-white hover:text-white/80 transition-colors tracking-wide"
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Row */}
      <div className="flex justify-between items-start px-8 py-6">
        {/* Player Name - clickable */}
        <button
          onClick={() => setShowLogin(true)}
          className="text-[40px] text-white/80 hover:text-white transition-colors tracking-wide"
        >
          *{playerName}*
        </button>

        {/* Title */}
        <h1 className="text-[135px] text-white tracking-wide leading-none">
          Созвездия
        </h1>

        {/* Rules Link */}
        <Link
          href="/rules"
          className="text-[40px] text-white/80 hover:text-white transition-colors tracking-wide"
        >
          Правила
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex px-8 pb-8">
        {/* Left Column - Game Mode */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[80px] text-white/90 tracking-wide mb-4 italic">
            Режим Игры
          </h2>
          
          <div className="flex flex-col gap-2">
            {presetModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedMode(mode.id)}
                className={`text-left transition-all duration-200 flex items-baseline gap-3 group ${
                  selectedMode === mode.id
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                <span className="text-[70px] tracking-wide uppercase">
                  {selectedMode === mode.id && (
                    <span className="inline-block mr-2 transform -rotate-90">&gt;</span>
                  )}
                  {mode.label}
                </span>
                <span className="text-[40px] text-white/50 tracking-wide">
                  {mode.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Custom Settings */}
        <div className="flex-1 flex flex-col items-end">
          <button
            onClick={() => setSelectedMode("custom")}
            className={`text-[80px] tracking-wide mb-4 italic transition-colors text-right ${
              selectedMode === "custom"
                ? "text-white"
                : "text-white/90 hover:text-white"
            }`}
          >
            {selectedMode === "custom" && (
              <span className="inline-block mr-2 transform -rotate-90">&gt;</span>
            )}
            Индивидуальная Настройка
          </button>

          {/* Lives Selection */}
          <div className="flex items-baseline gap-6 mb-4">
            <span className="text-[70px] text-white/90 tracking-wide">Жизни</span>
            <div className="flex gap-4">
              {[1, 3, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedMode("custom")
                    setCustomSettings((prev) => ({ ...prev, lives: num }))
                  }}
                  className={`text-[70px] tracking-wide transition-all duration-200 ${
                    selectedMode === "custom" && customSettings.lives === num
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Input Method Selection */}
          <div className="flex items-baseline gap-4 mb-4">
            <span className="text-[70px] text-white/90 tracking-wide">Способ ввода</span>
            <div className="flex gap-4">
              {[
                { id: "type", label: "вручную" },
                { id: "select", label: "из списка" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setSelectedMode("custom")
                    setCustomSettings((prev) => ({ ...prev, inputMethod: method.id }))
                  }}
                  className={`text-[70px] tracking-wide transition-all duration-200 ${
                    selectedMode === "custom" && customSettings.inputMethod === method.id
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hints Selection */}
          <div className="flex items-baseline gap-4">
            <span className="text-[70px] text-white/90 tracking-wide">Подсказки</span>
            <div className="flex gap-4">
              {[
                { value: true, label: "да" },
                { value: false, label: "нет" },
              ].map((option) => (
                <button
                  key={String(option.value)}
                  onClick={() => {
                    setSelectedMode("custom")
                    setCustomSettings((prev) => ({ ...prev, hints: option.value }))
                  }}
                  className={`text-[70px] tracking-wide transition-all duration-200 ${
                    selectedMode === "custom" && customSettings.hints === option.value
                      ? "text-white"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Start Button - Bottom Right */}
      <div className="absolute bottom-8 right-8">
        <Link
          href={gameUrl}
          className="text-[80px] text-white hover:text-white/80 transition-colors tracking-wide uppercase"
        >
          Начать
        </Link>
      </div>
    </main>
  )
}
