import { ReactNode } from "react";
import GradientBorder from "./GradientBorder";

interface ButtonProps
{
  text?: string;
  visited?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
export default function Button(props: ButtonProps) {
  return (
    <GradientBorder rounded>
      <button
        className={`w-full h-full ${props.visited ? 'bg-blue-900 hover:animate-blue-shine' : 'bg-red-900 hover:animate-red-shine'} disabled:bg-gray-800 p-7 text-white text-center cursor-pointer rounded-full shadow-button select-none`}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.icon}{props.text}
      </button>
    </GradientBorder>
  );
}