import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row overflow-hidden">
      <div className="lg:w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-grow overflow-hidden">
        <div className="flex-shrink-0 p-2 md:p-4">
          <Header />
        </div>
        <main className="flex-grow overflow-y-auto py-1 md:py-3 px-4 text-tremor-content dark:text-tremor-content-subtle">
          <div className="pb-10 flex h-full flex-col gap-6">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
};
