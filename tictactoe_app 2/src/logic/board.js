import { WINNER_COMBOS } from "../constants";
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // Si no hay ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  // Revisamos si hay un empate
  // Si todos los cuadros están llenos y no hay ganador
  return newBoard.every((square) => square !== null);
};
