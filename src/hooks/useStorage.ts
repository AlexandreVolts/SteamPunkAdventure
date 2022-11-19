import { useState } from "react";
import LevelSave from "../types/LevelSave";

export default function useStorage() {
  const [data, setData] = useState<LevelSave[]>(JSON.parse(localStorage.getItem("save") || '[]'));

  const computeAllowedLevels = () => {
    const lvl = data[data.length - 1];

    return (data.length + (!lvl || lvl.hasWon ? 1 : 0));
  };
  const save = (level: number, levelSave: LevelSave) => {
    const cpy = [...data];
    const currentData = { ...cpy[level] };
    const isDataExisting = currentData.score !== undefined;

    if (isDataExisting) {
      currentData.hasWon = currentData.hasWon || levelSave.hasWon;
      currentData.score = Math.max(currentData.score, levelSave.score);
      currentData.maxScore = Math.max(currentData.maxScore, levelSave.maxScore);
    }
    cpy[level] = isDataExisting ? currentData : levelSave;
    localStorage.setItem("save", JSON.stringify(cpy));
    setData(cpy);
  };

  return ({ save, data, allowedLevels: computeAllowedLevels() });
}