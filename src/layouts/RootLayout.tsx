import { Outlet } from 'react-router-dom';

// ? Components
import { AppSidebar, Navbar, SidebarProvider } from '@/components';

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full  h-screen overflow-auto">
        <Navbar />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}
