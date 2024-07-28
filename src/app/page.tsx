import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      {!!session ? <SignOut/> : <SignIn/>}
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
