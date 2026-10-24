import Link from "next/link";

export default function Placeholder({ title, lead, points }) {
  return (
    <main className="subpage">
      <p className="eyebrow">準備中</p>
      <h1>{title}</h1>
      <p className="lead">{lead}</p>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p>
        このページの本編は、必要な資料が揃ってから制作します。いま確認できる経歴・スキル・実績の要点はホームにまとめてあります。
      </p>
      <Link className="button solid" href="/">ホームで全体を見る</Link>
    </main>
  );
}
