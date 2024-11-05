// ? Components
import { SidebarTrigger } from '@/components';

export const Navbar = () => {
  return (
    <header className="flex items-center gap-3 min-h-16 px-6 w-full border-b">
      <SidebarTrigger />
      <p>TODO: ADD BREADCRUMBS!</p>
    </header>
  );
};
