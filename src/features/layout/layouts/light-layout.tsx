'use client'

import { useEffect } from "react";
import { useTheme } from "next-themes";

export const LightModeLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return <div className="light bg-white text-black">{children}</div>;
};
