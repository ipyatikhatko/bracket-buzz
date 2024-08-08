
import { signOut } from "@/auth"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">
        Sign out
        <LogOutIcon/>
      </Button>
    </form>
  )
} 