'use client'

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { sourceSerif4 } from "@/shared/utils/font";

export const LightModeLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return <div className={`light bg-white text-black ${sourceSerif4.variable}`}>{children}</div>;
};
