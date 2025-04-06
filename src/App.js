import React, { useState, useEffect } from "react"
import HomePage from "./pages/HomePage"
import EmotionSelector from "./pages/EmotionSelector"
import HistoryPage from "./pages/HistoryPage"
import "./styles/App.css"

export default function App() {
  const [childSelected, setChildSelected] = useState(null)
  const [view, setView] = useState("home") // "home", "emotion", "history"

  useEffect(() => {
    const savedChild = localStorage.getItem("lastSelectedChild")
    if (savedChild) {
      setChildSelected(savedChild)
    }
  }, [])

  const handleChildSelection = (child) => {
    setChildSelected(child)
    localStorage.setItem("lastSelectedChild", child)
    setView("emotion")
  }

  return (
    <div className="app-container">
      {view === "home" && <HomePage setChildSelected={handleChildSelection} setView={setView} />}
      {view === "emotion" && <EmotionSelector childSelected={childSelected} setChildSelected={setChildSelected} setView={setView} />}
      {view === "history" && <HistoryPage setView={setView} />}
    </div>
  )
}
