import { HeaderAdvisors } from "@/features/advisors/components/header-advisors";
import { getAdvisors } from "@/features/advisors/actions/get-advisors";
import { Advisor } from '@/features/advisors/types/advisor';
import { ListAdvisors } from "@/features/advisors/components/list-advisors";


export default async function Advisors(): Promise<JSX.Element> {
    const advisors: Advisor[] = await getAdvisors();

    return (
        <div className="flex h-full flex-col gap-5">
            <HeaderAdvisors />
            <ListAdvisors advisors={advisors} />
        </div>
    );
}
