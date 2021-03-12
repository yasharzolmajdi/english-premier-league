import { PropsWithChildren } from "react";

export default function PageTitle({ children }: PropsWithChildren<{}>) {
  return <h1 className="text-center text-4xl text-gray-800">{children}</h1>;
}
