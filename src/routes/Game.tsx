import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import GameImages from "../components/GameImages";
import GradientBorder from "../components/GradientBorder";
import { App } from "../game/App";

export default function Game()
{
  const { level } = useParams();
  const [hasWon, setHasWon] = useState(false);
  const [score, setScore] = useState(0);
  const [rank, setRank] = useState(0);

  const isLevelValid = (level?: string): boolean => {
    const n = parseInt(level || "0");
   
    return (!isNaN(n) && n > 0 && n < 5);
  };
  const onLevelFinished = (hasWon: boolean, score: number, maxScore:number): void => {
    setHasWon(hasWon);
    setScore(score);
    setRank(~~(score / maxScore * 3));
  };

  useEffect(() => {
    if (!isLevelValid(level)) {
      return;
    }
    new App(parseInt(level!), onLevelFinished);
  }, [level, isLevelValid, onLevelFinished]);

  if (!isLevelValid(level)) {
    return (<Navigate to="/select-level" />);
  }
  return (
    <div className="flex justify-center">
      <GradientBorder>
        <canvas></canvas>
      </GradientBorder>
      <GameImages />
    </div>
  );
}