import { Session } from "next-auth";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Monitor, Sun, Moon, Check, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

export default function AvatarDropdown({ session }: { session: Session }) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full">
        <Image
          className="rounded-full"
          src={session.user?.image || ""}
          width={40}
          height={40}
          alt={`${session.user.name}&apos; profile image.`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[220px]">
        <DropdownMenuLabel className="flex items-center  gap-3">
          <Image
            className="rounded-full"
            src={session.user?.image || ""}
            width={40}
            height={40}
            alt={`${session.user.name}&apos; profile image.`}
          />
          <div className="flex flex-col">
            <p className="text-primary">{session.user?.name}</p>
            <p className="text-xs">{session.user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>
              {resolvedTheme === "dark" && (
                <Moon className=" mr-2 inline-flex" width={16} />
              )}
              {resolvedTheme === "light" && (
                <Sun className=" mr-2 inline-flex" width={16} />
              )}
              主题
            </span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <span>
                  <Moon className=" mr-1 inline-flex" width={16} /> 夜晚
                </span>
                {theme === "dark" && (
                  <DropdownMenuShortcut>
                    <Check width={16} className="inline-flex" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <span>
                  <Sun className=" mr-2 inline-flex" width={16} />
                  白天
                </span>
                {theme === "light" && (
                  <DropdownMenuShortcut>
                    <Check width={16} className="inline-flex" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <span>
                  <Monitor className=" mr-1 inline-flex" width={16} /> 系统
                </span>
                {theme === "system" && (
                  <DropdownMenuShortcut>
                    <Check width={16} className="inline-flex" />
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="focus:bg-destructive"
          onClick={() => signOut()}
        >
          <LogOut width={16} className="flex-inline mr-2" /> 登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
