import React from "react";

type CustomButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  color?: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  type = "button",
  onClick,
  color = "bg-blue-500",
}) => {
  const backgroundColorClass = color ? color : "bg-blue-500";

  return (
    <button
      type={type}
      className={`text-white py-2 px-4 rounded ${backgroundColorClass} transition duration-300 ease-in-out hover:bg-blue-700`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
