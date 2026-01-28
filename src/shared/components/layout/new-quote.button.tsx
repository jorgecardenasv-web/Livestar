import { deleteProspectQuote } from "@/features/plans/actions/set-cookies";
import { cn } from "@/shared/utils/cn";

interface NewQuoteButtonProps {
  className?: string;
}

export function NewQuoteButton({ className }: NewQuoteButtonProps) {
  return (
    <form action={deleteProspectQuote}>
      <button
        className={cn(
          "whitespace-nowrap px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#009bd5] transition-all duration-200 font-medium text-sm lg:text-base shadow-sm flex items-center gap-2",
          className
        )}
      >
        <span>Nueva cotización</span>
      </button>
    </form>
  );
}
