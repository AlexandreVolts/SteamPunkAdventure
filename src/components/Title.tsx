interface TitleProps
{
  text: string;
}
export default function Title(props: TitleProps)
{
  return (
    <h1 className="text-6xl text-center mt-20 mb-10">
      {props.text}
    </h1>
  );
}