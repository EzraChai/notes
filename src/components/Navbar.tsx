import { signIn, signOut, useSession } from "next-auth/react";
import AvatarDropdown from "./AvatarDropdown";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div className="fixed w-full ">
      <div className="mx-auto flex max-w-5xl items-center justify-between py-4 ">
        <div className="text-xl font-bold tracking-wide ">笔记.</div>
        {session ? (
          <AvatarDropdown session={session} />
        ) : (
          <Button
            variant={"ghost"}
            onClick={!session ? () => void signIn() : undefined}
          >
            {"登录"}
          </Button>
        )}
      </div>
      <hr />
    </div>
  );
}
