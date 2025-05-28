
import { Home, Settings, FileText, Bug, TestTube } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Generador", url: "/", icon: TestTube },
  { title: "Pruebas", url: "/tests", icon: FileText },
  { title: "Reportes", url: "/reports", icon: Bug },
  { title: "Configuración", url: "/settings", icon: Settings },
];

export function Sidebar() {
  const { state } = useSidebar();

  return (
    <SidebarComponent className={state === 'collapsed' ? "w-14" : "w-64"}>
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TestTube className="w-4 h-4 text-white" />
            </div>
            {state !== 'collapsed' && (
              <div>
                <h2 className="font-bold text-slate-800">Jira Tests</h2>
                <p className="text-xs text-slate-500">Test Generator</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-medium">
            {state !== 'collapsed' && "Navegación"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? "bg-blue-50 text-blue-700 font-medium"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}
