import { Link, NavLink } from 'react-router-dom';

// ? Icons
import {
  Calendar,
  Hand,
  MailWarning,
  Newspaper,
  Package,
  Users,
} from 'lucide-react';

// ? Components
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  UserDropdownMenu,
  useSidebar,
} from '@/components';

// ? Images
import AltaltiumLogo from '@/assets/logo-altaltium.svg';

const menuItems = [
  {
    title: 'Calendario',
    to: 'calendario',
    icon: Calendar,
  },
  {
    title: 'Inventario',
    to: 'inventario',
    icon: Package,
  },
  {
    title: 'Publicaciones',
    to: 'publicaciones',
    icon: Newspaper,
  },
  {
    title: 'Peticiones',
    to: 'peticiones',
    icon: MailWarning,
  },
  {
    title: 'Leads',
    to: 'leads',
    icon: Hand,
  },
  {
    title: 'Usuarios',
    to: 'usuarios',
    icon: Users,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="sidebar">
      <SidebarHeader className="bg-alt-green-900">
        <h1 className="sr-only">Altaltium</h1>

        {open && (
          <Link className="h-20 w-44" to="/">
            <img className="size-full" src={AltaltiumLogo} alt="Altaltium" />
          </Link>
        )}
      </SidebarHeader>
      <SidebarContent className="sidebar-content bg-alt-green-900">
        <SidebarGroup>
          <SidebarGroupLabel>Secciones</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="transition-all">
                    <NavLink to={item.to}>
                      <item.icon />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-alt-green-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserDropdownMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
