"use server";

import { createQuoteAction } from "./create-quote";

// Dispara la creación de la cotización leyendo cookies existentes (prospect, selectedPlan)
// y redirige automáticamente al resumen con el quoteId cuando termina.
export async function startQuoteCreation(_: FormData) {
  // No redirigir desde el servidor; borrar cookies y devolver el id
  return await createQuoteAction(
    { medicalData: [] },
    { deleteCookies: true, disableRedirect: true }
  );
}