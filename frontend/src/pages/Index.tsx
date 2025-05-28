
import { useState } from "react";
import { Sidebar } from "../components/Sidebar.tsx";
import { JiraTestGenerator } from "../components/JiraTestGenerator.tsx";
import { SidebarProvider } from "../components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-3">
                Generador de Pruebas Jira
              </h1>
              <p className="text-lg text-slate-600">
                Genera automáticamente baterías de pruebas basadas en criterios de aceptación de Jira
              </p>
            </div>
            <JiraTestGenerator />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
