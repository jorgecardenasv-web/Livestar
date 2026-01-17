import { Navbar } from "./navbar";
import { HeaderWave } from "./header-wave";

export const HeaderSecondary = () => {
  return (
    <header className="relative w-full h-[120px] md:h-[180px] text-white mb-6 md:mb-8 transition-all duration-300">
      {/* Background with Brand Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#223E99] -z-20" />

      {/* Decorator Pattern/Curve */}
      <HeaderWave />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full">
        <Navbar />
      </div>
    </header>
  );
};
