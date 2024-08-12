import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('home');
  return (
    <main className="flex min-h-screen flex-col items-center gap-y-10 p-24">
      <h1>{t('title')}</h1>
    </main>
  );
}
