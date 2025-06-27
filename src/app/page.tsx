import Link from "next/link";


export default function Home() {
  return (
    <div className="bg-black bg-home-image">
      <main className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto h-dvh">
        <div className="flex flex-col gap-6 p-12 rounded-xl bg-black/90 w-4/5 sm:max-w-96 mx-auto text-white sm:text-2xl">
          <h1 className="text-4xl font-bold">Kan&apos;s Computer<br /> Repair Shop</h1>
          <address>
            555 Gateway Lane<br />
            Kansas City,KS 55555
          </address>
          <p>
            Open 9:00-17:00 Monday-Friday
          </p>
          <Link href="tell:55555555" className="hover:underline">55555-55555</Link>
        </div>
      </main>
    </div>
  );
}
