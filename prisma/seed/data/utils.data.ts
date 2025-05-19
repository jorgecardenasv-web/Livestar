type Seguro = {
  hombre: {
    mensual: number;
    anual: number;
  };
  mujer: {
    mensual: number;
    anual: number;
  };
};

type HDISeguro = {
  anual: number;
  primerMes: number;
  segundoMesADoce: number;
};

const generarNumeroAleatorio = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generarPreciosSeguros = (): Record<number, Seguro> => {
  const resultado: Record<number, Seguro> = {};

  for (let edad = 0; edad <= 64; edad++) {
    const masculinoMensual = generarNumeroAleatorio(50, 200);
    const femeninoMensual = generarNumeroAleatorio(40, 150);

    resultado[edad] = {
      hombre: {
        mensual: masculinoMensual,
        anual: masculinoMensual * 12,
      },
      mujer: {
        mensual: femeninoMensual,
        anual: femeninoMensual * 12,
      },
    };
  }
  return resultado;
};

export const generarPreciosHDI = (): Record<string, HDISeguro> => {
  const resultado: Record<string, HDISeguro> = {};

  for (let edad = 0; edad <= 64; edad++) {
    const primerMes = generarNumeroAleatorio(100, 300);
    const segundoMesADoce = generarNumeroAleatorio(80, 250);

    resultado[edad.toString()] = {
      primerMes,
      segundoMesADoce,
      anual: primerMes + segundoMesADoce * 11,
    };
  }

  return resultado;
};
