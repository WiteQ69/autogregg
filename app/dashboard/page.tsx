import Link from "next/link"
export default function Dashboard() {
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Link className="underline" href="/admin/page">Panel admina</Link>
    </main>
  )
}
