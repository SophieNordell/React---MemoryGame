import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
import Confetti from "react-dom-confetti";

const cardImages = [
  { src: "/bingo2.png", matched: false },
  { src: "/rusty.png", matched: false },
  { src: "/Coco.png", matched: false },
  { src: "/muffin.png", matched: false },
  { src: "/snickers.png", matched: false },
  { src: "/bluey2.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choicetwo, setChoicetwo] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(0);
    setGameStarted(true);
    setIsGameWon(false);
  };

  useEffect(() => {
    if (gameStarted) {
      // Check if all cards are matched
      const allMatched = cards.every((card) => card.matched);

      if (allMatched) {
        setIsGameWon(true);
      }
    }
  }, [cards]);

  function handleChoice(card) {
    choiceOne ? setChoicetwo(card) : setChoiceOne(card);
  }

  const confettiConfig = {
    angle: 5,
    spread: 1000,
    startVelocity: 70,
    elementCount: 90,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 0,
    width: "30px",
    height: "30px",
    colors: ["#4682b4", "#b0e0e6", "#87CEEB"],
  };

  useEffect(() => {
    if (choiceOne && choicetwo) {
      if (choiceOne.src === choicetwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choicetwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoicetwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <>
      <div className="App">
        <h1 className="bluey-title">Bluey - Memory</h1>
        {gameStarted ? null : (
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <img
              src="blueyFamily.jpg"
              alt="BlueyFamily"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}

        <button onClick={shuffleCards}>
          {isGameWon ? "Play Again" : "New Game"}
        </button>
        <div className="card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choicetwo || card.matched}
            />
          ))}
        </div>
        <Confetti
          active={isGameWon}
          config={confettiConfig}
          className="confetti-container"
        />
      </div>
    </>
  );
}

export default App;
