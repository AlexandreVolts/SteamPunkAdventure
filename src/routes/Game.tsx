import { useCallback, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import EndScreen from "../components/EndScreen";
import GameImages from "../components/GameImages";
import GradientBorder from "../components/GradientBorder";
import { App } from "../game/App";
import useStorage from "../hooks/useStorage";

export default function Game() {
  const { level } = useParams();
  const { data, save, allowedLevels } = useStorage();
  const [isFinished, setIsFinished] = useState(false);

  const lvl = parseInt(level ?? "-1");

  const isLevelValid = useCallback((n: number) => {
    return (!isNaN(n) && n >= 0 && n < allowedLevels);
  }, [allowedLevels]);
  const onLevelFinished = useCallback((hasWon: boolean, score: number, maxScore: number): void => {
    const rank = ~~(score / (maxScore * 3));

    save(lvl, { hasWon, score, rank });
    setIsFinished(true);
  }, [lvl, save, setIsFinished]);

  useEffect(() => {
    if (isLevelValid(lvl) && !isFinished) {
      new App(lvl, onLevelFinished);
    }
  }, [lvl, isFinished, isLevelValid, onLevelFinished]);

  if (!isLevelValid(lvl)) {
    return (<Navigate to="/select-level" />);
  }
  return (
    <div className="m-auto" style={{ width: App.WIDTH }}>
      <GradientBorder>
        <div className="relative">
          <EndScreen {...data[lvl]} level={lvl} display={isFinished} />
          <canvas></canvas>
        </div>
      </GradientBorder>
      <GameImages />
    </div>
  );
}