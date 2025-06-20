import { deleteProspectQuote } from "@/features/plans/actions/set-cookies";

export function NewQuoteButton() {
  return (
    <form action={deleteProspectQuote}>
      <button className="whitespace-nowrap px-3 lg:px-4 xl:px-6 py-2 bg-[#223E99] text-white rounded-md hover:bg-[#1b327d] transition-colors font-medium text-sm lg:text-base">
        Nueva cotización
      </button>
    </form>
  )
}