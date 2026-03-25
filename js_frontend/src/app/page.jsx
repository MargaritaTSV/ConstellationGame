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
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        fontFamily: "'Amatic SC', cursive",
      }}
    >
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div 
            className="bg-[#0a1628]/95 border border-white/10 p-8 max-w-md w-full mx-4"
            style={{ fontFamily: "'Amatic SC', cursive" }}
          >
            <h2 className="text-4xl text-white text-center mb-6">Вход</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Логин"
                value={loginData.username}
                onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                className="bg-transparent border-b border-white/30 text-white text-2xl py-2 px-1 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              />
              <input
                type="password"
                placeholder="Пароль"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="bg-transparent border-b border-white/30 text-white text-2xl py-2 px-1 placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="text-2xl text-white/60 hover:text-white transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="text-2xl text-white hover:text-white/80 transition-colors"
                >
                  Войти
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header Row */}
      <div className="flex justify-between items-start px-8 pt-6">
        {/* Player Name - clickable */}
        <button
          onClick={() => setShowLogin(true)}
          className="text-2xl text-white/80 hover:text-white transition-colors"
        >
          *{playerName}*
        </button>

        {/* Title */}
        <h1 className="text-7xl text-white leading-none">
          Созвездия
        </h1>

        {/* Rules Link */}
        <Link
          href="/rules"
          className="text-2xl text-white/80 hover:text-white transition-colors"
        >
          Правила
        </Link>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex-1 flex px-8 pt-8 pb-6">
        {/* Left Column - Game Mode */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-4xl text-white/90 mb-6 italic">
            Режим Игры
          </h2>
          
          <div className="flex flex-col gap-1">
            {/* Easy mode */}
            <button
              onClick={() => setSelectedMode("easy")}
              className={`text-left transition-all duration-200 flex items-baseline gap-2 ${
                selectedMode === "easy" ? "text-white" : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className="text-3xl lowercase italic">
                лёгкий
              </span>
              <span className="text-xl text-white/50 italic">
                5 жизней, подсказки
              </span>
            </button>

            {/* Medium mode */}
            <button
              onClick={() => setSelectedMode("medium")}
              className={`text-left transition-all duration-200 flex items-baseline gap-2 ${
                selectedMode === "medium" ? "text-white" : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className="text-3xl lowercase italic">
                средний
              </span>
              <span className="text-xl text-white/50 italic">
                3 жизни, подсказки
              </span>
            </button>

            {/* Hard mode */}
            <button
              onClick={() => setSelectedMode("hard")}
              className={`text-left transition-all duration-200 flex items-baseline gap-2 ${
                selectedMode === "hard" ? "text-white" : "text-white/60 hover:text-white/80"
              }`}
            >
              <span className="text-3xl lowercase italic">
                сложный
              </span>
              <span className="text-xl text-white/50 italic">
                1 жизнь
              </span>
            </button>
          </div>
        </div>

        {/* Right Column - Custom Settings */}
        <div className="flex-1 flex flex-col items-end">
          <button
            onClick={() => setSelectedMode("custom")}
            className={`text-4xl mb-6 italic transition-colors text-right ${
              selectedMode === "custom" ? "text-white" : "text-white/90 hover:text-white"
            }`}
          >
            Индивидуальная Настройка
          </button>

          {/* Lives Selection */}
          <div className="flex items-baseline gap-8 mb-3">
            <span className="text-3xl text-white/90">Жизни</span>
            <div className="flex gap-4">
              {[1, 3, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    setSelectedMode("custom")
                    setCustomSettings((prev) => ({ ...prev, lives: num }))
                  }}
                  className={`text-3xl transition-all duration-200 ${
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
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-3xl text-white/90">Способ ввода</span>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedMode("custom")
                  setCustomSettings((prev) => ({ ...prev, inputMethod: "type" }))
                }}
                className={`text-3xl transition-all duration-200 ${
                  selectedMode === "custom" && customSettings.inputMethod === "type"
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                вручную
              </button>
              <button
                onClick={() => {
                  setSelectedMode("custom")
                  setCustomSettings((prev) => ({ ...prev, inputMethod: "select" }))
                }}
                className={`text-3xl transition-all duration-200 ${
                  selectedMode === "custom" && customSettings.inputMethod === "select"
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                из списка
              </button>
            </div>
          </div>

          {/* Hints Selection */}
          <div className="flex items-baseline gap-4">
            <span className="text-3xl text-white/90">подсказки</span>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedMode("custom")
                  setCustomSettings((prev) => ({ ...prev, hints: true }))
                }}
                className={`text-3xl transition-all duration-200 ${
                  selectedMode === "custom" && customSettings.hints === true
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                да
              </button>
              <button
                onClick={() => {
                  setSelectedMode("custom")
                  setCustomSettings((prev) => ({ ...prev, hints: false }))
                }}
                className={`text-3xl transition-all duration-200 ${
                  selectedMode === "custom" && customSettings.hints === false
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                нет
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button - Bottom Right */}
      <div className="absolute bottom-6 right-8">
        <Link
          href={gameUrl}
          className="text-4xl text-white hover:text-white/80 transition-colors lowercase"
        >
          начать
        </Link>
      </div>
    </main>
  )
}
