import Link from "next/link";
import { career, profile } from "../../lib/content";

export const metadata = { title: "職務経歴" };

export default function CareerPage() {
  return (
    <main className="below-hero sheet-page">
      <section className="panel">
        <div className="section-head sheet-top">
          <p className="eyebrow">職務経歴</p>
          <h1>{profile.period}</h1>
          <p>
            フルスタック開発者として、要件整理から運用支援までを担当してきました。所属先の名称は公開していません。期間ごとの担当領域だけをまとめています。
          </p>
        </div>
        <ol className="timeline">
          {career.map((item) => (
            <li key={item.years} className="glass">
              <p className="years">{item.years}</p>
              <h2>{item.area}</h2>
              <p>{item.body}</p>
              <p className="meta">{item.tech}</p>
              <p className="meta">{item.steps}</p>
            </li>
          ))}
        </ol>
        <p className="more-link"><Link href="/">ホームへ戻る</Link></p>
      </section>
    </main>
  );
}
