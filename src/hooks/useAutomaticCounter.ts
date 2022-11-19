import { useEffect, useState } from "react";

export default function useAutomaticCounter(counter: number)
{
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= counter)
      return;
    const timeout = setInterval(() => {
      if (isNaN(current)) {
        setCurrent(0);
        return;
      }
      setCurrent(Math.min(current + 350, counter));
    }, 50);

    return (() => clearTimeout(timeout));
  }, [current, setCurrent, counter]);

  return (current);
}