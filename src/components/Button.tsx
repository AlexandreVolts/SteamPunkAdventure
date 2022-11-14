import { Link } from "react-router-dom";
import GradientBorder from "./GradientBorder";

interface ButtonProps {
  text: string;
  to: string;
  disabled?: boolean;
}
export default function Button(props: ButtonProps)
{
  return (
    <Link to={props.to} className={props.disabled ? "pointer-events-none" : "pointer-events-auto"}>
      <GradientBorder>
        <button
          className="w-full h-full bg-red-900 disabled:bg-gray-800 p-7 text-white text-center hover:bg-red-800 cursor-pointer rounded-full shadow-button select-none"
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </GradientBorder>
    </Link>
  );
}