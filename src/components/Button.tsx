import { Link } from "react-router-dom";
import GradientBorder from "./GradientBorder";

interface ButtonProps
{
  text: string;
  to: string;
  disabled?: boolean;
}
export default function Button(props: ButtonProps)
{
  return (
    <Link to={props.to}>
      <GradientBorder>
        <button
          className="bg-red-900 disabled:bg-gray-800 p-7 text-white text-center hover:bg-red-800 cursor-pointer"
          disabled={props.disabled}
        >
          {props.text}
        </button>
      </GradientBorder>
    </Link>
  );
}