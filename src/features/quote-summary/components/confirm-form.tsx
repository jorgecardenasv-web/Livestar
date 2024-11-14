"use client";

import { useState } from "react";
import { handleContractNow } from "../actions/create-quote";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { AlertCircle } from "lucide-react";

export const ContractForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <form className="mt-10" action={handleContractNow}>
      <Alert variant="important" className="mb-4">
        <AlertCircle className="h-4 w-4" color="#ca8a04" />
        <AlertTitle>¡Importante!</AlertTitle>
        <AlertDescription>
          <div className="flex items-center space-x-2 my-4">
            <input
              type="checkbox"
              id="confirmation"
              checked={isConfirmed}
              onChange={(e) => setIsConfirmed(e.target.checked)}
              className="h-4 w-4 text-[#223E99] focus:ring-[#223E99] border-gray-300 rounded"
            />
            <label htmlFor="confirmation">
              Confirmo que no padezco ninguna enfermedad preexistente ni me
              encuentro en estado de embarazo
            </label>
          </div>
        </AlertDescription>
      </Alert>

      <button
        type="submit"
        disabled={!isConfirmed}
        className="w-full bg-[#223E99] text-white py-3 rounded font-bold text-base sm:text-lg hover:bg-primary transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Contratar ahora
      </button>
    </form>
  );
};
