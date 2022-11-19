import { useRef, useEffect } from "react";

export function useHorizontalScroll()
{
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = ref.current;

    if (!el)
      return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 3,
        behavior: "smooth",
      });
    };
    el.addEventListener("wheel", onWheel);
    return (() => el.removeEventListener("wheel", onWheel));
  }, []);
  return (ref);
}