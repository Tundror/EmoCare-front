import React, { useState } from "react"
import api from "../services/api"

const emotions = [
  { id: 1, name: "Feliz", emoji: "😊" },
  { id: 2, name: "Triste", emoji: "😢" },
  { id: 3, name: "Bravo", emoji: "😡" },
  { id: 4, name: "Surpreso", emoji: "😲" },
  { id: 5, name: "Calmo", emoji: "😌" },
]

const EmotionSelector = ({ childSelected, setView }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null)

  const handleSelectEmotion = async (id) => {
    console.log("⚡ Clicado:", id) 
    setSelectedEmotion(id)

    try {
      await api.post("/emotions", {
        child_name: childSelected,
        emotion_id: id
      })

      console.log("✅ Emoção salva com sucesso")
    } catch (error) {
      console.error("❌ Erro ao salvar emoção:", error)
    }
  }

  return (
    <div className="container">
      <h1>{childSelected}, como você está se sentindo hoje?</h1>
      <div className="emotions-grid">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            className={selectedEmotion === emotion.id ? "emotion selected" : "emotion"}
            onClick={() => handleSelectEmotion(emotion.id)}
          >
            {emotion.emoji} <br /> {emotion.name}
          </button>
        ))}
      </div>
      {selectedEmotion && (
        <p className="selected-text">
          {childSelected} escolheu: {emotions.find((e) => e.id === selectedEmotion).name}
        </p>
      )}
      <button className="back-button" onClick={() => setView("home")}>
        Voltar
      </button>
    </div>
  )
}

export default EmotionSelector
