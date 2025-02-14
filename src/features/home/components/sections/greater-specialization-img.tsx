import Image from "next/image";
import bgSpecializationStoryDecoratorDesktop from "@/assets/images/bg_success-story_decorator_desktop.svg";
import bgSpecializationDesktop from "@/assets/images/bg_success-story_desktop.svg";

export const GreaterSpecializationImg = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[750px] text-white my-4 md:my-8 lg:my-16">
      <div className="absolute inset-0">
        {/* Decorador adaptable */}
        <Image
          src={bgSpecializationStoryDecoratorDesktop}
          alt="Success Story Decorator"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-fill w-full h-full z-0"

        />
        {/* Imagen principal adaptable */}
        <Image
          src={bgSpecializationDesktop}
          alt="Success Story"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          className="object-contain w-full h-full z-10"
        />
      </div>
    </section>
  );
};
