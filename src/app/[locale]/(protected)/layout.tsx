// app/layout.tsx
import SideNav from "@/features/dashboard/components/sidebar";
import React from "react";

const Sidebar = () => (
  <div className="h-full w-64 bg-white shadow-md">
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Navegación</h2>
      {/* Agrega aquí los elementos de tu barra de navegación */}
    </div>
  </div>
);

const TopBar = () => (
  <div className="w-full bg-white shadow-sm p-4">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    {/* Agrega aquí los elementos de tu barra superior */}
  </div>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <main className="grow p-6 md:overflow-y-auto md:p-12">{children}</main>
    </div>
  );
}
