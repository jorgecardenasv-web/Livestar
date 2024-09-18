import { SuccessStoryCard } from "./success-story-card";
import { SuccessCardCarousel } from "./carousel";

import SuccessBgImageDesktop from "@/assets/home/bg_success-story_desktop.svg";
import SuccessBgImageMobile from "@/assets/home/bg_success-story_mobile.svg";
import SuccessImageDesktop from '@/assets/home/success-story_desktop.png'
import SuccessImageMobile from '@/assets/home/success-story_mobile.png'

import CaseOne from "@/assets/home/case_one_success_story.png";
import CaseTwo from "@/assets/home/case_two_success_story.png";
import CaseThree from "@/assets/home/case_three_success_story.png";
import Image from "next/image";

const SuccessStories = [
  {
    text: "Covid",
    image: CaseOne,
  },
  {
    text: "Leucemia linfoblástica",
    image: CaseTwo,
  },
  {
    text: "Cáncer de esófago",
    image: CaseThree,
  },
];

export const SuccessStory = () => {
  return (
    <section className="relative w-full h-[750px] text-white my-24">
      <div className="absolute inset-0">
        <Image
          src={SuccessBgImageMobile}
          alt="Success Story Mobile"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover lg:hidden"
          priority
        />
        <Image
          src={SuccessBgImageDesktop}
          alt="Success Story Desktop"
          fill
          sizes="100vw"
          className="object-cover hidden lg:block"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 absolute inset-0 h-screen md:h-full">
        <h2 className="text-4xl font-bold mt-24 md:my-16 text-center">
          Conoce algunos casos éxito
        </h2>
        <div className="grid">
          <div className="hidden lg:flex flex-wrap gap-x-24 justify-center">
            {SuccessStories.map((story) => (
              <SuccessStoryCard
                key={story.text}
                text={story.text}
                image={story.image}
              />
            ))}
          </div>
        </div>
        <div className="lg:hidden">
          <SuccessCardCarousel items={SuccessStories} />
        </div>
      </div>
    </section>
  );
};
