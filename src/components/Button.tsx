import GradientBorder from "./GradientBorder";

interface ButtonProps
{
  text: string;
}
export default function Button(props: ButtonProps)
{
  return (
    <GradientBorder>
      <div className="bg-red-900 p-7 text-white text-center hover:bg-red-800 cursor-pointer">
        {props.text}
      </div>
    </GradientBorder>
  );
}