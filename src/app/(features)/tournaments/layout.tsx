'use client'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function TournamentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const tournamentsPath = pathname.split('/').pop()
  
  return (
    <>
      <nav className="sticky top-0 z-10 flex flex-col justify-between items-center py-2 bg-background text-slate-500 mb-2">
        <h1 className="font-light text-lg my-2">Tournaments</h1>
        <Tabs defaultValue={tournamentsPath}>
          <TabsList className="space-x-1">
            <TabsTrigger asChild value="my">
              <Link href='/tournaments/my'>My brackets</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="browse">
              <Link href='/tournaments/browse'>Browse</Link>
            </TabsTrigger>
            <TabsTrigger asChild value="create">
              <Link href='/tournaments/create'>Create</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>  
      </nav>
      {children}
    </>
  )
}