import Button from "../components/Button";
import DashedLine from "../components/DashedLine";
import Tooltip from "../components/Tooltip";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import useStorage from "../hooks/useStorage";
import levels from "./../game/json/levels.json";

export default function SelectLevel() {
  const { data, allowedLevels } = useStorage();
  const ref = useHorizontalScroll() as any;

  const generateButtons = () => levels.map((level, index) => {
    const rank = ~~(data[index]?.score / data[index]?.maxScore * 3);

    return (
      <div key={index} className="flex items-center">
        <Tooltip score={data[index]?.score} rank={rank} name={level.name}>
          <div className="w-32 h-32 rotate-x-60">
            <Button
              text={(index + 1).toString()}
              to={`/game/${index}`}
              disabled={index >= allowedLevels}
              visited={index + 1 !== allowedLevels}
            />
          </div>
        </Tooltip>
        {index < levels.length - 1 && <DashedLine disabled={index >= allowedLevels - 1} />}
      </div>
    );
  });
  return (
    <div className="flex justify-center">
      <div ref={ref} className="flex overflow-auto w-3/4 pl-24 pt-32">
        {generateButtons()}
      </div>
    </div>
  );
}