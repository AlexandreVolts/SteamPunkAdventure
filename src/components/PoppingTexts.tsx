import { useEffect } from "react";
import useAutomaticCounter from "../hooks/useAutomaticCounter";

interface PoppingTextsProps
{
  texts: string[];
  duration?: number;
  onFinished: () => void;
}
export default function PoppingTexts(props: PoppingTextsProps)
{
  const max = 5000;
  const counter = useAutomaticCounter(max);
  const current = ~~(counter / max * props.texts.length);
  const { onFinished } = props;

  useEffect(() => {
    if (max === counter)
      onFinished();
  }, [max, counter, onFinished]);

  return (
    <>
      {props.texts.map((text, index) => {
        return (current === index && <p className="text-white text-3xl animate-dezoom select-none" key={index}>{text}</p>);
      })}
    </>
  );
}