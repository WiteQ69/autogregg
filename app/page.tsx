import Link from "next/link"
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/catalog');
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">AutoGregg</h1>
      <p className="text-zinc-600">Witaj w panelu – przejdź do katalogu lub panelu admina.</p>
      <div className="flex gap-3">
        <Link className="underline" href="/catalog">Katalog</Link>
        <Link className="underline" href="/admin/page">Panel admina</Link>
      </div>
    </main>
  )
}
