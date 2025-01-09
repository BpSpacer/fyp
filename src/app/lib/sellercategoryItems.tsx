import { ArrowBigDownDash } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "saraiki",
    title: "Saraiki",
    image: <ArrowBigDownDash />,
  },
  {
    id: 1,
    name: "sindhi",
    title: "Sindhi",
    image: <ArrowBigDownDash />,
  },
  {
    id: 2,
    name: "pujnabi",
    title: "Punjabi",
    image: <ArrowBigDownDash />,
  },
  {
    id: 3,
    name: "pashtun",
    title: "Pashtun",
    image: <ArrowBigDownDash />,
  },
  {
    id: 4,
    name: "balochi",
    title: "Balochi",
    image: <ArrowBigDownDash />,
  },
  {
    id: 5,
    name: "kashmiri",
    title: "Kashmiri",
    image: <ArrowBigDownDash />,
  },
];
