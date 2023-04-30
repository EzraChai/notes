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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Monitor, Sun, Moon, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

export default function AvatarDropdown({ session }: { session: Session }) {
  const { setTheme, theme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full">
        <Image
          className="rounded-full"
          src={session.user?.image || ""}
          width={40}
          height={40}
          alt={`${session.user.name}&apos; profile image.`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>主题</span>
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
          登出
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
