"use client";

import { useState } from "react";

export default function GameBoard() {
  // Placeholder for the balloon merge game.
  // The actual game logic will be added later.
  const [grid, setGrid] = useState<string[][]>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  return (
    <div className="grid grid-cols-5 gap-2 p-4">
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => (
          <div
            key={`${rIdx}-${cIdx}`}
            className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
          >
            {cell}
          </div>
        ))
      )}
    </div>
  );
}
