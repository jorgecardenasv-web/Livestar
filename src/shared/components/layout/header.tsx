import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 w-full">
      <div className="container mx-auto">
        <Navbar />
      </div>
    </header>
  );
};
