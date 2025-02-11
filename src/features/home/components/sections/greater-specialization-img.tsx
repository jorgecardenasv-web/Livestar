import Image from "next/image";
import bgSpecializationStoryDesktopImg from "@/assets/images/bg_specialization_story_desktop_img.svg";
import bgSpecializationMobileImg from "@/assets/images/bg_specialization_mobile_img.svg";

export const GreaterSpecializationImg = () => {
  return (
    <section className="relative w-full h-screen text-white my-16">
      <div className="absolute inset-0">
        <Image
          src={bgSpecializationMobileImg}
          alt="Coverage Mobile"
          fill
          sizes="(max-width: 640px) 90vw, 100vw"
          className="object-cover lg:hidden"
          priority
        />
        <Image
          src={bgSpecializationStoryDesktopImg}
          alt="Coverage Desktop"
          fill
          sizes="100vw"
          className="object-cover hidden lg:block"
          priority
          />
      </div>
    </section>
  );
};
