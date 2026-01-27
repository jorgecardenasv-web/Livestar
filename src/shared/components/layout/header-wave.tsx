import React from "react";

export const HeaderWave = ({ className }: { className?: string }) => {
  return (
    <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[130px] scale-x-[-1] left-[-1px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 614 1728 190.5"
        preserveAspectRatio="none"
      >
        <path
          opacity=".2"
          d="M-1 614c429.617 99.888 409.5 143.558 1730 143.558V804.5H-1V614Z"
          fill="#fff"
        />
        <path
          opacity=".4"
          d="M0 639c429.617 99.888 409.5 118.558 1730 118.558V804.5H0V639Z"
          fill="#fff"
        />
        <path
          d="M-2 670.5c430.114 91.16 659.475 91.16 1732 91.16v42.84H-2v-134Z"
          fill="#fff"
        />
      </svg>
    </div>
  );
};
