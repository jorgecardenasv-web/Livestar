import React from "react";
import "./medical-expenses.css";

interface CardMedicalProps {
  text: string;
}

export const CardMedical: React.FC<CardMedicalProps> = ({ text }) => {
  return (
    <div className="card flex flex-col max-w-[400px] min-w-[400px]  h-[250px] w-[100%] flex-1 items-center gap-4 p-4">
      <div id="circle"></div>
      <p className="text-lg texto-slate text-center">{text}</p>
    </div>
  );
};
