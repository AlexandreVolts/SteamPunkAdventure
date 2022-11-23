import { ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ButtonProps {
  text?: string;
  icon?: ReactElement;
  to: string;
  disabled?: boolean;
  visited?: boolean;
}
export default function LinkButton(props: ButtonProps)
{
  return (
    <Link to={props.to} reloadDocument className={props.disabled ? "pointer-events-none" : "pointer-events-auto"}>
      <Button {...props} />
    </Link>
  );
}