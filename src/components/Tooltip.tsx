import { ReactNode, useState } from "react";

interface TooltipProps {
  name: string;
  score?: number;
  rank?: number;
  children: ReactNode;
}
export default function Tooltip(props: TooltipProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsMouseOver(false)}>
      <div className={`${isMouseOver ? 'animate-bounce' : ''} opacity-0 absolute text-sm bg-blue-900 p-3 w-[200%] -left-1/2 -top-20 rounded-full space-y-2 shadow-button`}>
        <p className="text-white text-center">{props.name}</p>
        {props.score && <p className="text-yellow-500 text-center text-xs">Score: {props.score}</p>}
        <div className="flex justify-center">
          {Array.from({ length: props.rank ?? 0 }).map((_, index) => {
            return (
              <img
                src={`/assets/star_${index + 1}.png`}
                alt=""
                key={index}
                className="animate-dezoom"
                width={20}
              />
            );
          })}
        </div>
      </div>
      <div onMouseEnter={() => setIsMouseOver(true)}>
        {props.children}
      </div>
    </div>
  );
}