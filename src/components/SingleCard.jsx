import "./singleCard.css";

export default function singleCard({ card, handleChoice, flipped }) {
  function handleClick() {
    handleChoice(card);
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" alt="card front" width={70} src={card.src} />
        <img
          className="back"
          onClick={handleClick}
          src="/background.png"
          alt="card cover"
        />
      </div>
    </div>
  );
}
