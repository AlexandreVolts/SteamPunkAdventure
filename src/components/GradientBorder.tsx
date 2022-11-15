import { ReactNode } from "react";

interface GradientBorderProps {
  children: ReactNode;
  rounded?: boolean;
}
export default function GradientBorder(props: GradientBorderProps) {
  const style = "w-full h-full relative rounded-sm before:shadow-light before:dark:shadow-dark bg-clip-padding before:content-[' '] before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:m-[-5px] before:z-[-1] z-0 before:bg-gradient-to-r before:from-yellow-400";
  
  return (
    <div className={style + (props.rounded ? " before:rounded-full" : "")}>
      {props.children}
    </div>
  );
}
