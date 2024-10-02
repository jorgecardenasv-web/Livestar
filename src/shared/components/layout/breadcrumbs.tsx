import { prefix } from "@/shared/utils/constants";
import { Card } from "@tremor/react";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex py-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href={`${prefix}/dashboard`}
            className="inline-flex items-center text-base font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Inicio
          </a>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              {index === items.length - 1 ? (
                <span className="ml-1 text-base font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="ml-1 text-base font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  {item.label}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
