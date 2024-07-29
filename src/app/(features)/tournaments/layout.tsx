import Link from "next/link";

export default function TournamentLayout() {
  return (
    <section className="mx-auto my-0 max-w-screen-xl">
      <h1 className="font-semibold text-lg">Tournaments</h1>
      <hr className="border-0 h-px bg-slate-300"/>
      <nav className="flex justify-between items-center text-slate-500">
        <div className="flex gap-2">
          <Link href='/tournaments/browse'>Browse</Link>
          <Link href='/tournaments/my'>My tournaments</Link>
        </div>
        <Link href='/tournaments/create'>
          <button className="p-2 rounded-md shadow-sm bg-teal-500 text-white">Create</button>
        </Link>
      </nav>
    </section>
  )
}