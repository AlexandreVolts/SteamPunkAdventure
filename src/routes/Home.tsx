import LinkButton from "../components/LinkButton";

export default function Home()
{
  return (
    <div className="flex justify-center">
      <div className="w-64 text-2xl">
        <LinkButton text="Play" to="/select-level" />
      </div>
    </div>
  );
}