'use client';

import { Plan } from "../../types/plan";
import { getBooleanText, hasRealHtmlContent } from "../../utils/debug";
import { RefreshPlanButton } from "./refresh-plan-button";

export const DebugPlan = ({ plan }: { plan: Plan }) => {
  const hasHtml = Boolean(plan.additionalInfoHtml);
  const hasContent = hasRealHtmlContent(plan.additionalInfoHtml);
  
  return (
    <div className="fixed bottom-0 right-0 p-4 bg-black/80 text-white rounded-tl-lg m-4 max-w-md max-h-80 overflow-auto z-50 text-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">Debug Plan</h3>
        <RefreshPlanButton />
      </div>
      <div className="space-y-1">
        <p><span className="text-gray-400">ID:</span> {plan.id}</p>
        <p><span className="text-gray-400">additionalInfoHtml presente:</span> {getBooleanText(hasHtml)}</p>
        <p><span className="text-gray-400">Longitud del HTML:</span> {plan.additionalInfoHtml?.length || 0}</p>
        <p><span className="text-gray-400">Tiene contenido real:</span> {getBooleanText(hasContent)}</p>
        {hasHtml && (
          <>
            <details>
              <summary className="cursor-pointer text-blue-300">Ver HTML</summary>
              <pre className="mt-2 p-2 bg-gray-800 rounded text-green-300 whitespace-pre-wrap break-all">
                {plan.additionalInfoHtml}
              </pre>
            </details>
          </>
        )}
      </div>
    </div>
  );
};
