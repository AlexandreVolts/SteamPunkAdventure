import { useCallback, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import EndScreen from "../components/EndScreen";
import GradientBorder from "../components/GradientBorder";
import { App } from "../game/App";
import useStorage from "../hooks/useStorage";
import LevelSave from "../types/LevelSave";
import levels from "./../game/json/levels.json";
import PoppingTexts from "../components/PoppingTexts";

export default function Game() {
  const { level } = useParams();
  const { data, save, allowedLevels } = useStorage();
  const [gameData, setGameData] = useState<LevelSave>();
  const [app, setApp] = useState<App>();
  const [isStarted, setIsStarted] = useState(false);

  const lvl = parseInt(level ?? "-1");

  const isLevelValid = useCallback((n: number) => {
    return (!isNaN(n) && n >= 0 && n < allowedLevels);
  }, [allowedLevels]);

  const start = useCallback(() => {
    setIsStarted(true);
    app?.start();
  }, [app, setIsStarted]);

  const onLevelFinished = useCallback((hasWon: boolean, score: number, maxScore: number): void => {
    const gameData = { hasWon, score, maxScore };

    save(lvl, gameData);
    setGameData(gameData);
  }, [lvl, save, setGameData]);

  useEffect(() => {
    if (isLevelValid(lvl) && !app) {
      setApp(new App(lvl, onLevelFinished));
    }
  }, [lvl, app, isLevelValid, setApp, onLevelFinished]);

  if (!isLevelValid(lvl)) {
    return (<Navigate to="/select-level" />);
  }
  return (
    <div className="m-auto" style={{ width: App.WIDTH }}>
      <GradientBorder>
        <div className="relative">
          {!isStarted &&
            <div className="absolute flex justify-center items-center w-full h-full">
              <PoppingTexts texts={["Ready ?", "Steady ?", "Go !"]} onFinished={start} />
            </div>
          }
          <EndScreen
            {...gameData!}
            bestScore={data[lvl]?.score}
            level={lvl}
            display={!!gameData}
            isLastLevel={lvl + 1 === levels.length}
          />
          <canvas className="cursor-none"></canvas>
        </div>
      </GradientBorder>
    </div>
  );
}