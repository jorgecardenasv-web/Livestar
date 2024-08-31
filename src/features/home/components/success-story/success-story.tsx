import { SuccessStoryCard } from "./success-story-card";
import Carousel from "./carousel";

import styles from "./success-story.module.css";

import CaseOne from "@/assets/home/case_one_success_story.png";
import CaseTwo from "@/assets/home/case_two_success_story.png";
import CaseThree from "@/assets/home/case_three_success_story.png";

const cases = [
  {
    text: "Covid",
    image: CaseOne,
    caseName: "Caso 1",
  },
  {
    text: "Leucemia linfoblástica",
    image: CaseTwo,
    caseName: "Caso 2",
  },
  {
    text: "Cáncer de esófago",
    image: CaseThree,
    caseName: "Caso 3",
  },
];

export const SuccessStory = () => {
  return (
    <section className={styles.successStoryContainer}>
      <div className="flex flex-col mt-36 lg:mt-24 items-center w-full gap-y-8 lg:gap-y-28 text-center h-full">
        <h2 className="text-4xl font-bold">Conoce algunos casos éxito</h2>
        <div className="hidden lg:flex flex-wrap gap-x-24">
          {cases.map((caseCard) => (
            <SuccessStoryCard
              key={caseCard.caseName}
              text={caseCard.text}
              image={caseCard.image}
              caseName={caseCard.caseName}
            />
          ))}
        </div>
        <div className="lg:hidden">
          <Carousel items={cases} />
        </div>
      </div>
    </section>
  );
};
