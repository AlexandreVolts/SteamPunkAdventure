import { IoMdFastforward, IoMdHome, IoMdRefresh } from "react-icons/io"
import LevelSave from "../types/LevelSave";
import Button from "./Button";

interface EndScreenProps extends LevelSave
{
  display: boolean;
  level?: number;
}
export default function EndScreen(props: EndScreenProps)
{
  return (
    <div className={`flex items-center justify-center flex-col space-y-24 absolute bg-black/75 w-full h-full transition-all duration-1000 ${props.display ? 'opacity-1' : 'opacity-0 invisible'}`}>
      <div className="space-y-10">
        <h2 className={`font-bold text-4xl ${props.hasWon ? "text-yellow-500" : "text-red-500"}`}>
          {props.hasWon ? "Mission accomplished!" : "Mission failed..."}
        </h2>
        <p className="text-white text-xl text-center">Score: {props.score}</p>
      </div>
      <ul className="flex space-x-32">
        <li className={props.display ? "animate-fade-in-delay-1 opacity-0" : ""}>
          <Button icon={<IoMdHome color="rgb(220, 220, 50)" size="5rem" title="home" />} to="/select-level" />
        </li>
        {props.hasWon && <li className={props.display ? "animate-fade-in-delay-2 opacity-0" : ""}>
          <Button icon={<IoMdFastforward color="rgb(220, 220, 50)" size="5rem" title="next level" />} to={`/game/${(props.level || 0) + 1}`} />
        </li>}
        <li className={props.display ? "animate-fade-in-delay-3 opacity-0" : ""}>
          <Button icon={<IoMdRefresh color="rgb(220, 220, 50)" size="5rem" title="retry" />} to={`/game/${props.level}`} />
        </li>
      </ul>
    </div>
  );
}