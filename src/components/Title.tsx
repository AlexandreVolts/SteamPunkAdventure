interface TitleProps
{
  text: string;
}
export default function Title(props: TitleProps)
{
  return (
    <h1 className="text-4xl text-center mt-16 mb-10">
      {props.text}
    </h1>
  );
}