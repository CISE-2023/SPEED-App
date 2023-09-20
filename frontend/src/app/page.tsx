import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Software Practice Empirical Evidence Database (SPEED)</h1>
      <br />

      <h2>[ENSE701 Group 5107]</h2>
      <br />

      <h2>[Initial App Setup]</h2>
      <br />

      <ul className="header">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Search">Article Search</Link>
        </li>
        <li>
          <Link href="/Submit">Article Submission</Link>
        </li>
        <li>
          <Link href="/Moderation">Article Moderation Page</Link>
        </li>
        <li>
          <Link href="/Analysis">Article Analysis</Link>
        </li>
      </ul>

      <div className="content"></div>
    </div>
  );
}