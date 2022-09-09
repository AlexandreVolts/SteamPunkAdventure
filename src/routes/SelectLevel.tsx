import { useEffect, useState } from "react";
import Button from "../components/Button";
import levels from "./../game/json/levels.json";

export default function SelectLevel()
{
  const [allowedLevels, setAllowedLevels] = useState(1);
  
  useEffect(() => {
    
  }, []);
  return (
    <div className="flex">
      {Array.from({length: levels.length}).map((_, index) => {
        return (
          <Button
            text={(index + 1).toString()}
            to={`/game/${index + 1}`}
            disabled={index >= allowedLevels}
            key={index}
          />
        );
      })}
    </div>
  );
}