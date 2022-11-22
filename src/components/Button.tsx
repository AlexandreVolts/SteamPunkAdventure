import { ReactElement } from "react";
import { Link } from "react-router-dom";
import GradientBorder from "./GradientBorder";

interface ButtonProps {
  text?: string;
  icon?: ReactElement;
  to: string;
  disabled?: boolean;
  visited?: boolean;
}
export default function Button(props: ButtonProps)
{
  return (
    <Link to={props.to} reloadDocument className={props.disabled ? "pointer-events-none" : "pointer-events-auto"}>
        <GradientBorder rounded>
          <button
            className={`w-full h-full ${props.visited ? 'bg-blue-900 hover:animate-blue-shine' : 'bg-red-900 hover:animate-red-shine'} disabled:bg-gray-800 p-7 text-white text-center cursor-pointer rounded-full shadow-button select-none`}
            disabled={props.disabled}
          >
            {props.icon}{props.text}
          </button>
        </GradientBorder>
    </Link>
  );
}