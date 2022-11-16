import { ReactElement } from "react";
import { Link } from "react-router-dom";
import GradientBorder from "./GradientBorder";

interface ButtonProps {
  text?: string;
  icon?: ReactElement;
  to: string;
  disabled?: boolean;
}
export default function Button(props: ButtonProps)
{
  return (
    <Link to={props.to} reloadDocument className={props.disabled ? "pointer-events-none" : "pointer-events-auto"}>
        <GradientBorder rounded>
          <button
            className="w-full h-full bg-red-900 disabled:bg-gray-800 p-7 text-white text-center hover:bg-red-800 cursor-pointer rounded-full shadow-button select-none"
            disabled={props.disabled}
          >
            {props.icon}{props.text}
          </button>
        </GradientBorder>
    </Link>
  );
}