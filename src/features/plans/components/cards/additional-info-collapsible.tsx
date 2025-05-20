"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AdditionalInfoCollapsibleProps {
  additionalInfoHtml: string;
}

const AdditionalInfoCollapsible: React.FC<AdditionalInfoCollapsibleProps> = ({ additionalInfoHtml }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleExpand}
        className="flex items-center justify-between w-full text-left text-base font-semibold text-sky-600 hover:text-sky-700 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 bg-sky-500 rounded-full"></div>
          <span>Información Adicional</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-sky-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-sky-500" />
        )}
      </button>

      <div
        className={`mt-2 overflow-hidden ${isExpanded ? 'block' : 'hidden'}`}
      >
        <div className="bg-blue-50/30 rounded-lg p-2.5 overflow-hidden">
          <div
            className="prose prose-sm max-w-none w-full break-words overflow-wrap-anywhere
              leading-normal text-sm text-gray-700
              prose-headings:text-sky-600 prose-headings:break-words prose-headings:hyphens-auto
              prose-h1:text-base prose-h1:font-semibold prose-h1:mt-2 prose-h1:mb-1 prose-h1:leading-tight
              prose-h2:text-sm prose-h2:font-medium prose-h2:mt-1.5 prose-h2:mb-1 prose-h2:leading-tight
              prose-p:my-0.5 prose-p:leading-normal prose-p:break-words prose-p:hyphens-auto
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:break-words prose-a:inline-block prose-a:max-w-full
              prose-strong:text-gray-700 prose-strong:font-medium
              prose-ul:pl-4 prose-ul:list-disc prose-ul:my-0.5 prose-ul:space-y-0
              prose-ol:pl-4 prose-ol:list-decimal prose-ol:my-0.5 prose-ol:space-y-0
              prose-li:my-0 prose-li:leading-tight prose-li:mb-0 prose-li:break-words
              prose-li>prose-p:my-0 prose-li>prose-p:leading-normal
              [&_ul>li::marker]:text-sky-500 [&_ul>li]:my-0.5 
              [&_ol>li]:my-0.5 [&_*]:break-words [&_*]:hyphens-auto
              [&_img]:max-w-full [&_img]:h-auto [&_table]:table-fixed [&_table]:w-full
              [&_td]:break-words [&_th]:break-words [&_td]:p-1 [&_th]:p-1
              [&_pre]:overflow-x-auto [&_pre]:max-w-full [&_code]:break-words"
            dangerouslySetInnerHTML={{ __html: additionalInfoHtml }}
          />
        </div>
      </div>
    </>
  );
};

export default AdditionalInfoCollapsible;
