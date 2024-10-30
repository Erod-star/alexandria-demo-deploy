import { useState } from 'react';
import {
  useHostedPageUrls,
  useLogoutFunction,
  withAuthInfo,
  type WithAuthInfoProps,
} from '@propelauth/react';

// ? Icons
import { ArrowUpRightFromSquare, LogOut } from 'lucide-react';

// ? Components
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  LoadingSpinner,
} from '@/components';

export const UserDropdownMenu = withAuthInfo(({ user }: WithAuthInfoProps) => {
  const logout = useLogoutFunction();
  const { getAccountPageUrl } = useHostedPageUrls();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = () => {
    if (!isLoading) {
      setIsLoading(true);
      localStorage.setItem('auth-token', '');
      localStorage.setItem('provider-token', '');
      logout(true);
    }
  };

  return (
    <Menubar className="text-black bg-transparent border-none">
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer transition-all hover:bg-alt-green-400 active:bg-alt-green-400 focus:bg-alt-green-400 data-[state=open]:bg-alt-green-400">
          <Avatar>
            <AvatarImage
              src={user?.pictureUrl}
              alt={user?.email || 'usuario'}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent
          className="pt-4 md:w-[250px] lg:w-[300px] z-[250]"
          align="end"
        >
          <div className="flex py-2 px-4">
            <Avatar className="w-10 h-10 mr-3">
              <AvatarImage
                src={user?.pictureUrl}
                alt={user?.email || 'usuario'}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col justify-center">
              <p className="text-sm">{user?.email}</p>
            </div>
          </div>

          <MenubarSeparator />

          <MenubarItem className="w-full">
            <a
              target="_blank"
              className="w-full flex justify-between items-center py-1.5 px-2"
              href={getAccountPageUrl()}
            >
              <p className="mr-2.5">Administrar cuenta</p>
              <ArrowUpRightFromSquare height="0.8rem" width="0.8rem" />
            </a>
          </MenubarItem>

          <MenubarItem
            className="w-full flex justify-between py-3 px-4 cursor-pointer bg:accent-green-500 hover:bg:accent"
            disabled={isLoading}
            onClick={handleLogout}
          >
            <p className="mr-2.5">Cerrar sesión</p>
            {isLoading ? (
              <LoadingSpinner height="1rem" width="1rem" />
            ) : (
              <LogOut height="0.8rem" width="0.8rem" />
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
});
