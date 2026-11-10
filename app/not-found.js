import Link from "next/link";

export default function NotFound() {
  return (
    <main className="missing">
      <p className="kicker">404</p>
      <h1 className="serif">This page is not on the map.</h1>
      <p>The portfolio is still here.</p>
      <Link href="/">Back to the portfolio</Link>
    </main>
  );
}
