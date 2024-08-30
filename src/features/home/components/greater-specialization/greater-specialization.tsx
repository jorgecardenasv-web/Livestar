import styles from "./greater-specialization.module.css";

export const GreaterSpecialization = () => {
  return (
    <section className={styles.specializationContainer}>
      <h2 className="text-[40px] font-bold text-center md:text-lef text-wrap">
        ¿NECESITAS MAYOR ESPECIALIZACIÓN?
      </h2>
      <p className="text-lg text-center md:text-left">
        Queremos resolver personalmente tus necesidades para marcar la
        diferencia.
      </p>
      <button className={styles.buttonCustom}>
        <span className="text-gradiant font-bold">Quiero saber más</span>
      </button>
    </section>
  );
};
