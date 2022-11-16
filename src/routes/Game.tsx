import { useCallback, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import EndScreen from "../components/EndScreen";
import GameImages from "../components/GameImages";
import GradientBorder from "../components/GradientBorder";
import { App } from "../game/App";

export default function Game() {
  const { level } = useParams();
  const [hasWon, setHasWon] = useState<boolean>();
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);

  const isLevelValid = useCallback((level?: string): boolean => {
    const n = parseInt(level || "0");

    return (!isNaN(n) && n > 0 && n < 5);
  }, []);
  const onLevelFinished = useCallback((hasWon: boolean, score: number, maxScore: number): void => {
    setHasWon(hasWon);
    setScore(score);
    setRank(~~(score / maxScore * 3));
  }, [setHasWon, setScore, setRank]);

  useEffect(() => {
    if (isLevelValid(level)) {
      new App(parseInt(level!), onLevelFinished);
    }
  }, [level, isLevelValid, onLevelFinished]);

  if (!isLevelValid(level)) {
    return (<Navigate to="/select-level" />);
  }
  return (
    <div className="m-auto" style={{ width: App.WIDTH }}>
      <GradientBorder>
        <div className="relative">
          <EndScreen score={score} hasWon={hasWon} rank={rank} level={parseInt(level!)} />
          <canvas></canvas>
        </div>
      </GradientBorder>
      <GameImages />
    </div>
  );
}