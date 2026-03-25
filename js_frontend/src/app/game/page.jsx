"use client"

import { useState, useEffect, useCallback, useRef, Suspense, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

// All 88 constellations
const allConstellations = [
  "Андромеда", "Близнецы", "Большая Медведица", "Большой Пёс", "Весы",
  "Водолей", "Возничий", "Волк", "Волопас", "Волосы Вероники",
  "Ворон", "Геркулес", "Гидра", "Голубь", "Гончие Псы",
  "Дева", "Дельфин", "Дракон", "Единорог", "Жертвенник",
  "Живописец", "Жираф", "Журавль", "Заяц", "Змееносец",
  "Змея", "Золотая Рыба", "Индеец", "Кассиопея", "Киль",
  "Кит", "Козерог", "Компас", "Корма", "Лебедь",
  "Лев", "Летучая Рыба", "Лира", "Лисичка", "Малая Медведица",
  "Малый Конь", "Малый Лев", "Малый Пёс", "Микроскоп", "Муха",
  "Насос", "Наугольник", "Овен", "Октант", "Орёл",
  "Орион", "Павлин", "Паруса", "Пегас", "Персей",
  "Печь", "Райская Птица", "Рак", "Резец", "Рыбы",
  "Рысь", "Северная Корона", "Секстант", "Сетка", "Скорпион",
  "Скульптор", "Столовая Гора", "Стрела", "Стрелец", "Телескоп",
  "Телец", "Треугольник", "Тукан", "Феникс", "Хамелеон",
  "Центавр", "Цефей", "Циркуль", "Часы", "Чаша",
  "Щит", "Эридан", "Южная Гидра", "Южная Корона", "Южная Рыба",
  "Южный Крест", "Южный Треугольник", "Ящерица"
]

// Constellation data with neighbors
const constellations = {
  "Большая Медведица": ["Малая Медведица", "Дракон", "Волопас", "Гончие Псы"],
  "Малая Медведица": ["Большая Медведица", "Дракон", "Цефей", "Жираф"],
  "Дракон": ["Большая Медведица", "Малая Медведица", "Цефей", "Лира", "Геркулес"],
  "Волопас": ["Большая Медведица", "Гончие Псы", "Дева", "Северная Корона", "Змея"],
  "Гончие Псы": ["Большая Медведица", "Волопас", "Волосы Вероники"],
  "Цефей": ["Малая Медведица", "Дракон", "Кассиопея", "Лебедь"],
  "Жираф": ["Малая Медведица", "Персей", "Возничий"],
  "Лира": ["Дракон", "Геркулес", "Лебедь", "Лисичка"],
  "Геркулес": ["Дракон", "Лира", "Северная Корона", "Змееносец", "Орёл"],
  "Дева": ["Волопас", "Волосы Вероники", "Лев", "Ворон"],
  "Северная Корона": ["Волопас", "Геркулес", "Змея"],
  "Змея": ["Волопас", "Северная Корона", "Змееносец"],
  "Кассиопея": ["Цефей", "Персей", "Андромеда"],
  "Лебедь": ["Цефей", "Лира", "Лисичка", "Пегас"],
  "Персей": ["Жираф", "Кассиопея", "Андромеда", "Возничий", "Телец"],
  "Возничий": ["Жираф", "Персей", "Телец", "Близнецы"],
  "Лисичка": ["Лира", "Лебедь", "Стрела", "Дельфин"],
  "Змееносец": ["Геркулес", "Змея", "Скорпион", "Стрелец"],
  "Орёл": ["Геркулес", "Стрела", "Дельфин", "Козерог", "Стрелец"],
  "Волосы Вероники": ["Гончие Псы", "Дева", "Лев"],
  "Лев": ["Дева", "Волосы Вероники", "Рак", "Малый Лев"],
  "Ворон": ["Дева", "Гидра", "Чаша"],
  "Андромеда": ["Кассиопея", "Персей", "Пегас", "Треугольник"],
  "Пегас": ["Лебедь", "Андромеда", "Водолей", "Рыбы"],
  "Телец": ["Персей", "Возничий", "Орион", "Овен"],
  "Близнецы": ["Возничий", "Рак", "Орион", "Малый Пёс"],
  "Стрела": ["Лисичка", "Орёл", "Дельфин"],
  "Дельфин": ["Лисичка", "Орёл", "Стрела", "Водолей"],
  "Скорпион": ["Змееносец", "Стрелец", "Весы"],
  "Стрелец": ["Змееносец", "Орёл", "Скорпион", "Козерог"],
  "Козерог": ["Орёл", "Стрелец", "Водолей"],
  "Рак": ["Лев", "Близнецы", "Гидра"],
  "Малый Лев": ["Лев", "Большая Медведица"],
  "Гидра": ["Ворон", "Чаша", "Рак", "Секстант"],
  "Чаша": ["Ворон", "Гидра"],
  "Треугольник": ["Андромеда", "Овен", "Рыбы"],
  "Водолей": ["Пегас", "Дельфин", "Козерог", "Рыбы", "Кит"],
  "Рыбы": ["Пегас", "Треугольник", "Водолей", "Овен", "Кит"],
  "Орион": ["Телец", "Близнецы", "Единорог", "Заяц"],
  "Овен": ["Телец", "Треугольник", "Рыбы", "Кит"],
  "Малый Пёс": ["Близнецы", "Единорог", "Гидра"],
  "Весы": ["Скорпион", "Дева", "Змееносец"],
  "Секстант": ["Гидра", "Лев"],
  "Кит": ["Водолей", "Рыбы", "Овен", "Эридан"],
  "Единорог": ["Орион", "Малый Пёс", "Большой Пёс"],
  "Заяц": ["Орион", "Большой Пёс", "Эридан"],
  "Эридан": ["Кит", "Заяц", "Орион"],
  "Большой Пёс": ["Единорог", "Заяц"],
}

const allConstellationNames = Object.keys(constellations)

function getRandomConstellation() {
  return allConstellationNames[Math.floor(Math.random() * allConstellationNames.length)]
}

function getTargetConstellation(start) {
  let target = getRandomConstellation()
  while (target === start) {
    target = getRandomConstellation()
  }
  return target
}

// Star Spinner Component
function StarSpinner() {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <div className="star-spinner">
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 24 24" 
          fill="white" 
          className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
        >
          <polygon points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9" />
        </svg>
      </div>
    </div>
  )
}

// Grid-based constellation background
function ConstellationBackground({ 
  usedConstellations, 
  onSelect, 
  isPlayerTurn,
  showUsed
}) {
  const gridPositions = useMemo(() => {
    const positions = []
    const cols = 8
    const rows = 11
    
    const isExcluded = (col, row) => {
      if (row <= 1 && col >= 6) return true
      if (row >= 9 && col <= 2) return true
      if (row >= 9 && col >= 5) return true
      if (row >= 2 && row <= 8 && col >= 2 && col <= 5) return true
      return false
    }
    
    const seed = 54321
    const random = (i) => {
      const x = Math.sin(seed + i * 7777) * 10000
      return x - Math.floor(x)
    }
    
    let idx = 0
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!isExcluded(col, row) && idx < allConstellations.length) {
          positions.push({
            col,
            row,
            rotation: (random(idx) > 0.5 ? 1 : -1) * (10 + random(idx + 100) * 30),
          })
          idx++
        }
      }
    }
    
    while (positions.length < allConstellations.length) {
      const i = positions.length
      positions.push({
        col: i % cols,
        row: Math.floor(i / cols),
        rotation: (random(i) > 0.5 ? 1 : -1) * (10 + random(i + 100) * 30),
      })
    }
    
    return positions
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 p-4">
      <div className="relative w-full h-full">
        {allConstellations.map((name, i) => {
          const isUsed = usedConstellations.has(name)
          const pos = gridPositions[i]
          
          const left = `${(pos.col / 7) * 90 + 5}%`
          const top = `${(pos.row / 10) * 90 + 5}%`
          
          return (
            <button
              key={name}
              onClick={() => {
                if (isPlayerTurn && !isUsed) {
                  onSelect(name)
                }
              }}
              disabled={!isPlayerTurn || isUsed}
              className={`absolute text-lg transition-all duration-300 pointer-events-auto whitespace-nowrap ${
                isUsed && showUsed
                  ? "text-amber-500/50"
                  : isUsed
                  ? "text-white/20"
                  : "text-white/30 hover:text-white/60 cursor-pointer"
              }`}
              style={{
                left,
                top,
                transform: `rotate(${pos.rotation}deg)`,
                fontFamily: "'Amatic SC', cursive",
              }}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function GameContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputRef = useRef(null)
  
  const lives = parseInt(searchParams.get("lives") || "3")
  const difficulty = searchParams.get("difficulty") || "medium"
  const inputMethod = searchParams.get("inputMethod") || "type"
  
  const [input, setInput] = useState("")
  const [feedback, setFeedback] = useState(null)
  const [gameState, setGameState] = useState(null)
  const [autocomplete, setAutocomplete] = useState(null)
  const [checkResult, setCheckResult] = useState(null)
  const [isAiThinking, setIsAiThinking] = useState(false)

  // Initialize game
  useEffect(() => {
    const start = getRandomConstellation()
    const target = getTargetConstellation(start)
    setGameState({
      startConstellation: start,
      targetConstellation: target,
      currentConstellation: start,
      usedConstellations: new Set([start]),
      lives: lives,
      maxLives: lives,
      isPlayerTurn: true,
      gameStatus: "playing",
      endReason: "",
      moves: [],
      difficulty: difficulty,
      inputMethod: inputMethod,
    })
  }, [lives, difficulty, inputMethod])

  // Autocomplete logic - works for ANY constellation from all 88
  useEffect(() => {
    if (!input.trim() || !gameState) {
      setAutocomplete(null)
      return
    }
    
    const inputLower = input.toLowerCase()
    // Search through ALL 88 constellations
    const matches = allConstellations.filter(c => 
      c.toLowerCase().startsWith(inputLower)
    )
    
    // Only show autocomplete when there's exactly one match
    if (matches.length === 1 && matches[0].toLowerCase() !== inputLower) {
      setAutocomplete(matches[0])
    } else {
      setAutocomplete(null)
    }
  }, [input, gameState])

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && autocomplete) {
      e.preventDefault()
      setInput(autocomplete)
      setAutocomplete(null)
    }
  }

  const showFeedback = useCallback((type) => {
    setFeedback(type)
    setTimeout(() => setFeedback(null), 400)
  }, [])

  const getValidMoves = useCallback((current, used) => {
    const neighbors = constellations[current] || []
    return neighbors.filter((n) => !used.has(n))
  }, [])

  const checkIfUsed = useCallback(() => {
    if (!gameState || !input.trim()) {
      setCheckResult(null)
      return
    }
    
    const guess = input.trim()
    if (gameState.usedConstellations.has(guess)) {
      setCheckResult("used")
    } else {
      setCheckResult("unused")
    }
    
    setTimeout(() => setCheckResult(null), 2000)
  }, [gameState, input])

  const makeAIMove = useCallback((state) => {
    setIsAiThinking(true)
    setTimeout(() => {
      const validMoves = getValidMoves(state.currentConstellation, state.usedConstellations)
      
      if (validMoves.length === 0) {
        setIsAiThinking(false)
        setGameState((prev) => prev ? {
          ...prev,
          gameStatus: "won",
          endReason: "У ИИ закончились допустимые ходы",
        } : null)
        return
      }

      let aiMove

      if (state.difficulty === "easy") {
        aiMove = validMoves[Math.floor(Math.random() * validMoves.length)]
      } else if (state.difficulty === "hard") {
        const moveToTarget = validMoves.find(m => m === state.targetConstellation)
        if (moveToTarget) {
          aiMove = moveToTarget
        } else {
          aiMove = validMoves.reduce((best, move) => {
            const newUsed = new Set(state.usedConstellations)
            newUsed.add(move)
            const playerOptions = getValidMoves(move, newUsed).length
            const bestUsed = new Set(state.usedConstellations)
            bestUsed.add(best)
            const bestOptions = getValidMoves(best, bestUsed).length
            return playerOptions < bestOptions ? move : best
          }, validMoves[0])
        }
      } else {
        if (Math.random() > 0.5) {
          const moveToTarget = validMoves.find(m => m === state.targetConstellation)
          aiMove = moveToTarget || validMoves[Math.floor(Math.random() * validMoves.length)]
        } else {
          aiMove = validMoves[Math.floor(Math.random() * validMoves.length)]
        }
      }

      const newUsed = new Set(state.usedConstellations)
      newUsed.add(aiMove)

      setIsAiThinking(false)

      if (aiMove === state.targetConstellation) {
        setGameState((prev) => prev ? {
          ...prev,
          currentConstellation: aiMove,
          usedConstellations: newUsed,
          moves: [...prev.moves, { player: "ai", constellation: aiMove }],
          gameStatus: "lost",
          endReason: "ИИ достиг конечного созвездия",
        } : null)
      } else {
        setGameState((prev) => prev ? {
          ...prev,
          currentConstellation: aiMove,
          usedConstellations: newUsed,
          moves: [...prev.moves, { player: "ai", constellation: aiMove }],
          isPlayerTurn: true,
        } : null)
      }
    }, 1500)
  }, [getValidMoves])

  const submitMove = useCallback((guess) => {
    if (!gameState || !gameState.isPlayerTurn || gameState.gameStatus !== "playing") return

    setInput("")
    setAutocomplete(null)

    if (!constellations[guess]) {
      showFeedback("error")
      const newLives = gameState.lives - 1
      if (newLives <= 0) {
        setGameState((prev) => prev ? {
          ...prev,
          lives: 0,
          gameStatus: "lost",
          endReason: "Закончились жизни",
        } : null)
      } else {
        setGameState((prev) => prev ? { ...prev, lives: newLives } : null)
      }
      return
    }

    if (gameState.usedConstellations.has(guess)) {
      showFeedback("error")
      const newLives = gameState.lives - 1
      if (newLives <= 0) {
        setGameState((prev) => prev ? {
          ...prev,
          lives: 0,
          gameStatus: "lost",
          endReason: "Закончились жизни",
        } : null)
      } else {
        setGameState((prev) => prev ? { ...prev, lives: newLives } : null)
      }
      return
    }

    const neighbors = constellations[gameState.currentConstellation] || []
    if (!neighbors.includes(guess)) {
      showFeedback("error")
      const newLives = gameState.lives - 1
      if (newLives <= 0) {
        setGameState((prev) => prev ? {
          ...prev,
          lives: 0,
          gameStatus: "lost",
          endReason: "Закончились жизни",
        } : null)
      } else {
        setGameState((prev) => prev ? { ...prev, lives: newLives } : null)
      }
      return
    }

    showFeedback("success")
    const newUsed = new Set(gameState.usedConstellations)
    newUsed.add(guess)

    if (guess === gameState.targetConstellation) {
      setGameState((prev) => prev ? {
        ...prev,
        currentConstellation: guess,
        usedConstellations: newUsed,
        moves: [...prev.moves, { player: "user", constellation: guess }],
        gameStatus: "won",
        endReason: "Вы достигли конечного созвездия",
      } : null)
    } else {
      const newState = {
        ...gameState,
        currentConstellation: guess,
        usedConstellations: newUsed,
        moves: [...gameState.moves, { player: "user", constellation: guess }],
        isPlayerTurn: false,
      }
      setGameState(newState)
      makeAIMove(newState)
    }
  }, [gameState, showFeedback, makeAIMove])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    submitMove(input.trim())
  }, [input, submitMove])

  const handleSelectConstellation = useCallback((name) => {
    setInput(name)
  }, [])

  const handleEndGame = useCallback(() => {
    if (gameState) {
      setGameState((prev) => prev ? {
        ...prev,
        gameStatus: "lost",
        endReason: "Игра завершена досрочно",
      } : null)
    }
  }, [gameState])

  useEffect(() => {
    if (gameState?.gameStatus !== "playing" && gameState?.gameStatus) {
      const timeout = setTimeout(() => {
        const params = new URLSearchParams({
          result: gameState.gameStatus,
          reason: gameState.endReason,
          start: gameState.startConstellation,
          target: gameState.targetConstellation,
        })
        router.push(`/result?${params.toString()}`)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [gameState, router])

  if (!gameState) {
    return (
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
    )
  }

  const validMoves = getValidMoves(gameState.currentConstellation, gameState.usedConstellations)
  const showNeighbors = gameState.difficulty === "easy"
  const showSelectBackground = inputMethod === "select"

  const gameParams = `lives=${lives}&difficulty=${difficulty}&inputMethod=${inputMethod}`
  const returnUrl = `/game?${gameParams}`

  return (
    <main
      className={`min-h-screen w-full flex flex-col items-center justify-center px-8 py-8 transition-colors duration-300 relative ${
        feedback === "success"
          ? "bg-green-950/30"
          : feedback === "error"
          ? "bg-red-950/30"
          : ""
      }`}
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/bg-stars.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        fontFamily: "'Amatic SC', cursive",
      }}
    >
      {/* Constellation background for select mode */}
      {showSelectBackground && (
        <ConstellationBackground
          usedConstellations={gameState.usedConstellations}
          onSelect={handleSelectConstellation}
          isPlayerTurn={gameState.isPlayerTurn}
          showUsed={true}
        />
      )}

      {/* Rules button - top right */}
      <Link
        href={`/rules?returnTo=${encodeURIComponent(returnUrl)}`}
        className="fixed top-6 right-8 text-2xl text-white/80 hover:text-white transition-colors z-50"
      >
        Правила
      </Link>

      {/* Header with start and target */}
      <div className="w-full max-w-4xl flex justify-between items-start mb-8 px-2 relative z-10">
        <div className="text-left">
          <p className="text-xl text-white/60 mb-1">Старт</p>
          <p className="text-4xl text-white">{gameState.startConstellation}</p>
        </div>
        <div className="text-right">
          <p className="text-xl text-white/60 mb-1">Финиш</p>
          <p className="text-4xl text-white">{gameState.targetConstellation}</p>
        </div>
      </div>

      {/* Current constellation */}
      <div className="text-center mb-6 relative z-10">
        <p className="text-xl text-white/60 mb-2">
          Текущее созвездие
        </p>
        <p className="text-6xl text-white">
          {gameState.currentConstellation}
        </p>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-white/20 mb-6 relative z-10" />

      {/* Turn indicator with star spinner */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <p className="text-3xl text-white/80">
          {gameState.isPlayerTurn ? "Ваш ход" : "Ход ИИ..."}
        </p>
        {isAiThinking && <StarSpinner />}
      </div>

      {/* Input with inline autocomplete - CENTERED */}
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-4 relative z-10">
        <div className="relative flex justify-center">
          {/* Autocomplete suggestion displayed inline */}
          {autocomplete && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-3xl text-transparent">
                {input}
              </span>
              <span className="text-3xl text-white/30">
                {autocomplete.slice(input.length)}
              </span>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Введите созвездие..."
            disabled={!gameState.isPlayerTurn || gameState.gameStatus !== "playing"}
            className="w-full bg-transparent border-b-2 border-white/30 text-white text-3xl py-2 text-center placeholder:text-white/30 focus:outline-none focus:border-white/60 transition-colors disabled:opacity-50"
            style={{ fontFamily: "'Amatic SC', cursive" }}
          />
        </div>
        {autocomplete && (
          <p className="text-lg text-white/50 mt-2 text-center">
            Tab для автодополнения
          </p>
        )}
      </form>

      {/* Check if used button */}
      <button
        onClick={checkIfUsed}
        disabled={!input.trim()}
        className={`text-xl mb-6 transition-all duration-200 relative z-10 ${
          checkResult === "used"
            ? "text-amber-500"
            : "text-white/60 hover:text-white disabled:opacity-30"
        }`}
      >
        {checkResult === "used" ? "Уже названо" : checkResult === "unused" ? "Ещё не названо" : "Проверить"}
      </button>

      {/* Hints - available neighbors (only on easy) */}
      {showNeighbors && (
        <div className="mb-8 text-center relative z-10">
          <p className="text-xl text-white/60 mb-2">Доступные соседи</p>
          <div className="flex flex-wrap justify-center gap-3">
            {validMoves.map((move) => (
              <button
                key={move}
                onClick={() => setInput(move)}
                className="text-2xl text-white/70 hover:text-white transition-colors"
              >
                {move}
              </button>
            ))}
            {validMoves.length === 0 && (
              <p className="text-xl text-white/40">Нет доступных ходов</p>
            )}
          </div>
        </div>
      )}

      {/* Hard mode indicator */}
      {gameState.difficulty === "hard" && (
        <div className="mb-8 text-center relative z-10">
          <p className="text-lg text-white/40">
            ИИ играет с максимальной точностью
          </p>
        </div>
      )}

      {/* Lives - bottom left - TEXT ONLY, no circles */}
      <div className="fixed bottom-6 left-8 z-50">
        <p className="text-2xl text-white/80">
          Жизни: {gameState.lives}
        </p>
      </div>

      {/* End game button - bottom right */}
      <button
        onClick={handleEndGame}
        className="fixed bottom-6 right-8 text-2xl text-white/80 hover:text-white transition-colors z-50"
      >
        Завершить
      </button>
    </main>
  )
}

export default function GamePage() {
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
      <GameContent />
    </Suspense>
  )
}
