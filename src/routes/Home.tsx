import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home()
{
  return (
    <div className="flex justify-center">
      <div className="w-64 text-2xl">
        <Button text="Play" to="/select-level" />
      </div>
    </div>
  );
}