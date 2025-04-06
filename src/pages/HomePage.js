import React, { useState } from "react"

const childrenList = ["Ana", "Bruno", "Carla", "Diego", "Elisa"]

const HomePage = ({ setChildSelected, setView }) => {
  const [selectedChild, setSelectedChild] = useState("")

  return (
    <div className="container">
      <h1>Escolha a criança</h1>
      <select
        value={selectedChild}
        onChange={(e) => setSelectedChild(e.target.value)}
        className="select-child"
      >
        <option value="">Selecione...</option>
        {childrenList.map((child, index) => (
          <option key={index} value={child}>{child}</option>
        ))}
      </select>
      <button
        className="start-button"
        onClick={() => setChildSelected(selectedChild)}
        disabled={!selectedChild}
      >
        Continuar
      </button>
      <button className="history-button" onClick={() => setView("history")}>
        Ver Histórico
      </button>
    </div>
  )
}

export default HomePage
