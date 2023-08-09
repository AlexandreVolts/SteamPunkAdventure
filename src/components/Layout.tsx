import { ReactNode } from "react"
import Title from "./Title";

interface LayoutProps
{
  children: ReactNode;
  hideTitle?: boolean;
}
export default function Layout(props: LayoutProps)
{
  return (
    <div className="flex items-stretch min-h-screen bg-layer2 bg-fixed bg-no-repeat bg-contain bg-bottom bg-blue-500 font-steam-punk">
      <div className="w-full">
        {hideTitle ? <></> : <Title text={document.title} />}
        {props.children}
      </div>
    </div>
  )
}
