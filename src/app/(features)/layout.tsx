import { auth } from "@/auth";
import { ModeToggle } from "@/components/mode-toggle";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { ReactNode } from "react";

export default async function FeaturesLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <>
      <nav className="h-[56px] bg-nav text-nav-foreground">
        <div className="h-full max-w-screen-xl px-2 mx-auto my-0 flex justify-between items-center md:px-4">
          <h3 className="font-bold text-lg">BracketBuzz</h3>
          <div className="flex items-center gap-2">
            <ModeToggle/>
            {!!session ? <SignOut/> : <SignIn/>}
          </div>
        </div>
      </nav>
      <main className="flex flex-col px-2 md:px-4 max-w-screen-xl mx-auto my-0">
        {children}
      </main>
    </>
  );
}