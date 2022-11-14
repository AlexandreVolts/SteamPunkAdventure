import { useEffect, useState } from "react";
import Button from "../components/Button";
import DashedLine from "../components/DashedLine";
import levels from "./../game/json/levels.json";

export default function SelectLevel() {
  const [allowedLevels, setAllowedLevels] = useState(1);

  useEffect(() => {

  }, []);
  const generateButtons = () => Array.from({ length: levels.length }).map((_, index) => (
    <>
      <div className="w-32 h-32 rotate-x-60">
        <Button
          text={(index + 1).toString()}
          to={`/game/${index + 1}`}
          disabled={index >= allowedLevels}
          key={index}
        />
      </div>
      {index < levels.length - 1 && <DashedLine disabled={index >= allowedLevels - 1} />}
    </>
  ));
  return (
    <div className="flex justify-center">
      <div className="flex p-20 overflow-hidden items-center">
        {generateButtons()}
      </div>
    </div>
  );
}