interface DashedLineProps {
  disabled?: boolean;
}
export default function DashedLine(props: DashedLineProps) {
  if (props.disabled) {
    return (<hr className="w-32 border-2 border-teal-900 border-dashed mx-6" />)
  }
  return (<hr className="w-32 border-2 border-red-800 border-dashed mx-6" />);
}