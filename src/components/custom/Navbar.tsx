import { useLocation } from 'react-router-dom';

// ? Components
import { SidebarTrigger } from '@/components';

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex items-center gap-3 min-h-16 px-6 w-full border-b">
      <SidebarTrigger />
      {/* // TODO: ADD BREADCRUMBS! */}
      <p className="capitalize font-semibold text-base">
        {pathname.split('/')[1]}
      </p>
    </header>
  );
};
