import React, { useEffect, useState } from "react";
import api from "../services/api";

const emotionsMap = {
  1: "Feliz 😊",
  2: "Triste 😢",
  3: "Bravo 😡",
  4: "Surpreso 😲",
  5: "Calmo 😌",
};

const HistoryPage = ({ setView }) => {
  const [latestByChild, setLatestByChild] = useState([]);
  const [selectedEmotionFilter, setSelectedEmotionFilter] = useState("all");

  useEffect(() => {
    async function fetchLatestEmotions() {
      try {
        const res = await api.get("/emotions");

        // Agrupar por criança e pegar o registro mais recente
        const grouped = {};
        res.data.forEach((entry) => {
          const { child_name } = entry;
          if (
            !grouped[child_name] ||
            new Date(entry.created_at) >
              new Date(grouped[child_name].created_at)
          ) {
            grouped[child_name] = entry;
          }
        });

        // Converter objeto em array
        const result = Object.values(grouped);
        setLatestByChild(result);
      } catch (err) {
        console.error("Erro ao buscar histórico:", err);
      }
    }

    fetchLatestEmotions();
  }, []);

  return (
    <div className="container">
      <h1>Última Emoção por Criança</h1>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="filter">Filtrar por emoção: </label>
        <select
          id="filter"
          value={selectedEmotionFilter}
          onChange={(e) => setSelectedEmotionFilter(e.target.value)}
          className="select-child"
        >
          <option value="all">Todas</option>
          <option value="1">Feliz 😊</option>
          <option value="2">Triste 😢</option>
          <option value="3">Bravo 😡</option>
          <option value="4">Surpreso 😲</option>
          <option value="5">Calmo 😌</option>
        </select>
      </div>

      <ul className="history-list">
        {latestByChild.length > 0 ? (
          latestByChild
            .filter(
              (entry) =>
                selectedEmotionFilter === "all" ||
                entry.emotion_id === parseInt(selectedEmotionFilter)
            )
            .map((entry, index) => (
              <li key={index} className="history-item">
                <strong>{entry.child_name}</strong> —{" "}
                {emotionsMap[entry.emotion_id]}
                <br />
                <small>
                  {new Date(entry.created_at).toLocaleString("pt-BR")}
                </small>
              </li>
            ))
        ) : (
          <p>Nenhum registro encontrado.</p>
        )}
      </ul>
      <button className="back-button" onClick={() => setView("home")}>
        Voltar
      </button>
    </div>
  );
};

export default HistoryPage;
