import { useState } from 'react';
import {
  useHostedPageUrls,
  useLogoutFunction,
  withAuthInfo,
  type WithAuthInfoProps,
} from '@propelauth/react';

// ? Icons
import { ArrowUpRightFromSquare, ChevronsUpDown, LogOut } from 'lucide-react';

// ? Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  SidebarMenuButton,
  LoadingSpinner,
} from '@/components';

// ? Hooks
import { useLocalStorage } from '@/hooks';

export const UserDropdownMenu = withAuthInfo(({ user }: WithAuthInfoProps) => {
  const logout = useLogoutFunction();
  const { getAccountPageUrl } = useHostedPageUrls();

  const { clearAllItems } = useLocalStorage();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    if (!isLoading) {
      setIsLoading(true);
      clearAllItems();
      logout(true);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="transition-all p-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8">
            <AvatarImage
              src={user?.pictureUrl}
              alt={user?.email || 'usuario'}
            />
            <AvatarFallback>{user?.email[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            {user?.firstName && user?.lastName && (
              <>
                <span className="truncate font-semibold">
                  {user.firstName} {user.lastName}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="top"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage
                src={user?.pictureUrl}
                alt={user?.email || 'usuario'}
              />
              <AvatarFallback>{user?.email[0] || 'U'}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              {user?.firstName && user?.lastName && (
                <>
                  <span className="truncate font-semibold">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </>
              )}
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <a
            target="_blank"
            className="w-full flex justify-between items-center py-1.5 px-2 text-xs"
            href={getAccountPageUrl()}
          >
            <p className="mr-2.5">Administrar cuenta</p>
            <ArrowUpRightFromSquare height="0.8rem" width="0.8rem" />
          </a>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="w-full flex justify-between py-3 px-4 cursor-pointer text-xs bg:accent-green-500 hover:bg:accent"
          disabled={isLoading}
          onClick={handleLogout}
        >
          <p className="mr-2.5">Cerrar sesión</p>
          {isLoading ? (
            <LoadingSpinner height="1rem" width="1rem" />
          ) : (
            <LogOut height="0.8rem" width="0.8rem" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
