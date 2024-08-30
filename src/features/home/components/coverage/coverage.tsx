import styles from "./coverage.module.css";

export const Coverage = () => {
  return (
    <section className={styles.coverageContainer}>
      <div className="flex flex-col justify-start w-full gap-y-6 text-container p-6 relative z-20 sm:w-full md:w-full md:p-10 lg:w-full xl:w-2/4 lg:top-[-61px] md:top-0">
        <h2 className="text-5xl font-bold w-full sm:w-[100%] md:w-[65%]">
          Cobertura médica amplia a precios más bajos.
        </h2>
        <p className="text-xl sm:w-[100%] md:w-[65%]">
          Protege tus finanzas, tu salud y la de tu familia contra accidentes y
          enfermedades
        </p>
        <button className={`${styles.buttonCoverage} sw-20 text-lg`}>
          ver más
        </button>
      </div>
    </section>
  );
};
