import React from 'react';
import '../styles/StatCards.css';

const cards = [
  { label: "Number", value: "150GB", color: "orange" },
  { label: "Revenue", value: "$1,345", color: "green" },
  { label: "Errors", value: "23", color: "red" },
  { label: "Followers", value: "+45K", color: "blue" },
];

function StatCards() {
  return (
    <div className="stat-cards">
      {cards.map((card, index) => (
        <div className="card" key={index} style={{ borderColor: card.color }}>
          <h4 style={{ color: card.color }}>{card.label}</h4>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
