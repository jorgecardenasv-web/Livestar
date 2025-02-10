import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { MobileMenu } from "../components/mobile-menu";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import Link from "next/link";
import { prefix } from "@/features/layout/nav-config/constants";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <div className="md:w-72 flex-shrink-0 hidden md:block">
        <ScrollArea className="h-full">
          <Sidebar />
        </ScrollArea>
      </div>

      <div className="flex gap-4 items-center md:hidden p-4">
        <MobileMenu />
        <Link
          className="flex h-14 w-full items-center rounded bg-primary p-4"
          href={`${prefix}/panel`}
        >
          <div className="w-32 text-white md:w-40">
            <h2 className="text-3xl font-bold">Livestar</h2>
          </div>
        </Link>
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-shrink-0 p-2 md:p-4">
          <Header />
        </div>
        <ScrollArea className="flex-grow">
          <main className="py-1 md:py-3 px-4 text-tremor-content dark:text-tremor-content-subtle">
            <div className="pb-10">
              <div className="flex h-full flex-col gap-6">{children}</div>
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};
