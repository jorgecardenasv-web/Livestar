import React from "react";

export const InfoCard = ({
  icon,
  title,
  value,
  useHtml,
  htmlElement
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  useHtml?: boolean
  htmlElement?: React.ReactElement;
}) => {
  return (
    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm flex items-center space-x-3">
      <div className="bg-sky-100 p-1.5 sm:p-2 rounded-lg text-sky-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-sky-600 font-semibold uppercase">{title}</p>
        <div className="flex">
        <p className="text-base sm:text-lg font-bold text-[#223E99]">{value}</p>
        {useHtml && (<span>{htmlElement}</span>)}
        </div>
      </div>
    </div>
  );
};
