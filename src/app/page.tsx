import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-4 text-4xl">Home</h1>
      <Link href="/profile">Visit Profile page</Link>
    </div>
  )
}
