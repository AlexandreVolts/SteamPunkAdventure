import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
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
    if (isLevelValid(level)) {
      return;
    }
    new App(parseInt(level!), onLevelFinished);
  }, []);

  if (isLevelValid(level)) {
    return (<Navigate to="/select-level" />);
  }
  return (
    <div className="flex justify-center">
      <GradientBorder>
        <canvas></canvas>
      </GradientBorder>
      <div className="hidden">
        <img id="bg-layer-1" src="assets/background/layer1.png" alt="" />
        <img id="bg-layer-2" src="assets/background/layer2.png" alt="" />
        <img id="bg-layer-3" src="assets/background/layer3.png" alt="" />
        <img id="bg-layer-4" src="assets/background/layer4.png" alt="" />

        <img id="player" src="assets/player.png" alt="" />
        <img id="projectile" src="assets/projectile.png" alt="" />

        <img id="angler" src="assets/enemies/angler.png" alt="" />
        <img id="night-angler" src="assets/enemies/night-angler.png" alt="" />
        <img id="lucky" src="assets/enemies/lucky.png" alt="" />
        <img id="hivewhale" src="assets/enemies/hivewhale.png" alt="" />
        <img id="drone" src="assets/enemies/drone.png" alt="" />

        <img id="invincible" src="assets/power-ups/invincible.png" alt="" />
        <img id="overshoot" src="assets/power-ups/overshoot.png" alt="" />

        <img id="gears" src="assets/gears.png" alt="" />
        <img id="fire-explosion" src="assets/fire-explosion.png" alt="" />
        <img id="smoke-explosion" src="assets/smoke-explosion.png" alt="" />
      </div>
    </div>
  );
}