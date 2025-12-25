"use client";

import { useEffect, useRef, useState } from "react";

const BOX_SIZE = 50;
const BAR_HEIGHT = 30;
const INITIAL_SPEED = 5; // m/s
const SPEED_INCREMENT = 0.5; // m/s per second

export default function Animation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [boyX, setBoyX] = useState(0);
  const [obstacle, setObstacle] = useState<{ type: "box" | "bar"; x: number } | null>(null);
  const [jumping, setJumping] = useState(false);
  const [sliding, setSliding] = useState(false);

  // Toggle play/pause
  const togglePlay = () => setRunning((prev) => !prev);

  // Animation loop
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    const update = (time: number) => {
      const delta = (time - lastTime) / 1000; // seconds
      lastTime = time;

      if (running) {
        // Increase speed gradually
        setSpeed((prev) => prev + SPEED_INCREMENT * delta);

        // Move boy
        setBoyX((prev) => prev + speed * delta * 100); // scale for canvas pixels

        // Simple obstacle logic
        if (!obstacle) {
          // Spawn obstacle after boy passes 200px
          if (boyX > 200) {
            const type = Math.random() > 0.5 ? "box" : "bar";
            setObstacle({ type, x: boyX + 300 });
          }
        } else {
          // Handle obstacle interaction
          if (boyX + BOX_SIZE > obstacle.x && boyX < obstacle.x + BOX_SIZE) {
            if (obstacle.type === "box") {
              setJumping(true);
              setTimeout(() => setJumping(false), 500);
            } else {
              setSliding(true);
              setTimeout(() => setSliding(false), 500);
            }
            setObstacle(null);
          }
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, [running, speed, boyX, obstacle]);

  // Render
  return (
    <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
      {/* Pause button */}
      {running && (
        <button
          className="absolute top-4 left-4 p-2 bg-white rounded shadow"
          onClick={togglePlay}
        >
          Pause
        </button>
      )}
      {/* Play button */}
      {!running && (
        <button
          className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
          onClick={togglePlay}
        >
          ▶️
        </button>
      )}
      {/* Canvas for animation */}
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="absolute inset-0"
      />
      {/* Boy */}
      <div
        className={`absolute transition-all duration-200 ${
          jumping ? "translate-y-[-100px]" : ""
        } ${sliding ? "translate-y-[30px]" : ""}`}
        style={{
          left: `${boyX}px`,
          bottom: "50px",
          width: `${BOX_SIZE}px`,
          height: `${BOX_SIZE}px`,
          backgroundColor: "blue",
        }}
      />
      {/* Obstacle */}
      {obstacle && (
        <div
          className="absolute bg-red-500"
          style={{
            left: `${obstacle.x}px`,
            bottom: obstacle.type === "box" ? "50px" : "80px",
            width: `${BOX_SIZE}px`,
            height: obstacle.type === "box" ? `${BOX_SIZE}px` : `${BAR_HEIGHT}px`,
          }}
        />
      )}
    </div>
  );
}
