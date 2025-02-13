import { deleteProspectQuote } from "@/features/plans/actions/set-cookies";

export function NewQuoteButton() {
  return (
    <form action={deleteProspectQuote}>
      <button className="px-4 lg:px-6 py-2 bg-[#223E99] text-white rounded-md hover:bg-opacity-90 transition-colors font-medium text-sm lg:text-base">
        Nueva cotización
      </button>
    </form>
  )
}