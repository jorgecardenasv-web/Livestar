'use client';

import { Card, ProgressBar } from '@tremor/react';

export const CardExample = () => {
  return (
    <Card className="mx-auto dark:bg-zinc-800 dark:text-zinc-100 dark:ring-0">
      <h4 className="text-tremor-default text-zinc-600 dark:text-zinc-400">
        Sales
      </h4>
      <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        $71,465
      </p>
      <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        <span>32% of annual target</span>
        <span>$225,000</span>
      </p>
      <ProgressBar value={32} className="mt-2" />
    </Card>
  );
}