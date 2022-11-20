import { ReactNode, useState } from "react";

interface TooltipProps
{
  score?: number;
  rank?: number;
  children: ReactNode;
}
export default function Tooltip(props: TooltipProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setIsMouseOver(false)}>
      <div className={`${isMouseOver ? 'animate-bounce' : ''} opacity-0 absolute text-sm bg-gray-900 py-2 w-full -top-10 rounded-full space-y-1`}>
        <div className="flex justify-center">
            {Array.from({ length: props.rank ?? 0 }).map((_, index) => {
              return (
                <img
                  src={`/assets/star_${index + 1}.png`}
                  alt=""
                  key={index}
                  className="animate-dezoom"
                  width={22}
                />
              );
            })}
          </div>
          <p className="text-yellow-500 text-center">Score: {props.score}</p>
      </div>
      <div onMouseEnter={() => setIsMouseOver(props.score !== undefined)}>
        {props.children}
      </div>
    </div>
  );
}