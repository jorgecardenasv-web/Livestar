import { Header } from "../components/header";
import SideNav from "../components/sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex block h-screen">
      <div className="lg:w-64 flex-shrink-0">
        <SideNav />
      </div>
      <div className="grow flex flex-col overflow-hidden gap-8 py-4 px-4">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};
