"use client";

import { useState } from "react";

const colors = ["white", "yellow", "orange", "green", "blue", "red", "black"];

export default function GameBoard() {
  const [grid, setGrid] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [selected, setSelected] = useState<{ row: number; col: number } | null>(null);
  const [score, setScore] = useState(0);

  const handleCellClick = (row: number, col: number) => {
    const cell = grid[row][col];
    if (!cell) return;

    if (!selected) {
      setSelected({ row, col });
      return;
    }

    const { row: selRow, col: selCol } = selected;
    const selectedCell = grid[selRow][selCol];

    if (selectedCell === cell && !(selRow === row && selCol === col)) {
      // Merge
      const idx = colors.indexOf(cell);
      let nextColor: string | "" = "";
      let points = 0;
      switch (cell) {
        case "white":
          nextColor = "yellow";
          points = 10;
          break;
        case "yellow":
          nextColor = "orange";
          points = 20;
          break;
        case "orange":
          nextColor = "red";
          points = 30;
          break;
        case "green":
          nextColor = "blue";
          points = 40;
          break;
        case "blue":
          nextColor = "red";
          points = 50;
          break;
        case "red":
          nextColor = "black";
          points = 60;
          break;
        case "black":
          nextColor = "";
          points = 100;
          break;
      }
      const newGrid = grid.map(r => [...r]);
      newGrid[row][col] = nextColor;
      newGrid[selRow][selCol] = "";
      setGrid(newGrid);
      setScore(prev => prev + points);
      setSelected(null);
      if (newGrid.flat().every(c => !c)) {
        alert("Level complete!");
      }
    } else {
      // Select new cell
      setSelected({ row, col });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl">Score: {score}</div>
      <div className="grid grid-cols-5 gap-2 p-4">
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                cell ? "border-2 border-black" : ""
              }`}
              style={{ backgroundColor: cell || "#d1d5db" }}
              onClick={() => handleCellClick(rIdx, cIdx)}
            >
              {cell && <span className="text-white font-bold">{cell}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
