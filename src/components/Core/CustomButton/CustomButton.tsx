import { Rubik } from "next/font/google";
import React from "react";

const rubik = Rubik({ subsets: ["latin"] });

type CustomButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  color?: string;
  style?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  type = "button",
  onClick,
  color = "bg-blue-500",
  style,
}) => {
  const backgroundColorClass = color ? color : "bg-blue-500";

  return (
    <button
      type={type}
      className={`${rubik.className} text-white py-2 px-4 rounded ${style} ${backgroundColorClass} transition duration-300 ease-in-out hover:bg-blue-700`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
