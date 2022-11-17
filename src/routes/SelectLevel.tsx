import Button from "../components/Button";
import DashedLine from "../components/DashedLine";
import useStorage from "../hooks/useStorage";
import levels from "./../game/json/levels.json";

export default function SelectLevel() {
  const { allowedLevels } = useStorage();

  const generateButtons = () => Array.from({ length: levels.length }).map((_, index) => (
    <div key={index} className="flex items-center">
      <div className="w-32 h-32 rotate-x-60">
        <Button
          text={(index).toString()}
          to={`/game/${index}`}
          disabled={index >= allowedLevels}
        />
      </div>
      {index < levels.length - 1 && <DashedLine disabled={index >= allowedLevels} />}
    </div>
  ));
  return (
    <div className="flex justify-center">
      <div className="flex overflow-hidden p-5">
        {generateButtons()}
      </div>
    </div>
  );
}