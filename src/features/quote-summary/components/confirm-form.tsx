"use client";

import { Badge } from "@tremor/react";
import { useState } from "react";

export const ContractForm = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <form className="mt-10">
      <Badge className="w-full mb-2">
        <div className="flex items-center space-x-2 my-4">
          <input
            type="checkbox"
            id="confirmation"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="h-4 w-4 text-[#223E99] focus:ring-[#223E99] border-gray-300 rounded"
          />
          <label className="text-sm text-gray-700">
            Confirmo que no padezco ninguna enfermedad preexistente ni me
            encuentro en estado de embarazo
          </label>
        </div>
      </Badge>

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
