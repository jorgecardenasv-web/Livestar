import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PaginationListAdvisors = ({ totalCount = 0 }: { totalCount: number }): JSX.Element => {
    return (
        <div className="flex items-center justify-between mx-3">
            <p className="text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content">
                Mostrando {''}
                <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">w</span>
                {' '}
                de
                <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">{' '}{totalCount}</span>
            </p>
            <div className="flex items-center gap-x-1" aria-label="Pagination">
                <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous">
                    <ChevronLeft size={20} />
                    <span className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                    <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10" aria-current="page">1</button>
                    <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
                    <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
                </div>
                <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Next">
                    <span className="sr-only">Next</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}