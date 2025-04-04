/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Square } from "./Square";
export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : `Ha ganado:`;

  return (
    <section className="winner">
      <div className="text">
        <h2>
          {winnerText}
        </h2>

        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
