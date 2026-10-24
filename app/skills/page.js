import Link from "next/link";
import { career, profile, skills } from "../../lib/content";

export const metadata = { title: "スキルシート" };

const periods = [
  ["Web", "2007年4月〜2010年3月"],
  ["モバイル", "2014年4月〜2018年3月"],
  ["業務システム", "2007年4月〜2014年3月"],
  ["EC・API", "2010年4月〜2014年3月"],
  ["AI・LLM", "2018年4月〜2022年3月"],
  ["kintone", "2022年4月〜2026年3月"],
  ["開発管理", "2022年4月〜2026年3月"]
];

export default function SkillsPage() {
  return (
    <main className="below-hero sheet-page">
      <section className="panel">
        <div className="section-head sheet-top">
          <p className="eyebrow">スキルシート</p>
          <h1>対応領域</h1>
          <p>
            実務経験は{profile.experience}（{profile.period}）です。技術はホームと同じ八領域に絞り、経験期間は職務経歴に書いた区間だけを対応させています。
          </p>
        </div>
        <div className="skill-grid">
          {skills.map(([name, body]) => (
            <article key={name} className="glass">
              <h2>{name}</h2>
              <p>{body}</p>
              {periods.find(([label]) => label === name) ? (
                <p className="meta">{periods.find(([label]) => label === name)[1]}</p>
              ) : (
                <p className="meta">期間の区切りは職務経歴には未記載</p>
              )}
            </article>
          ))}
        </div>
        <div className="section-head sheet-next">
          <p className="eyebrow">担当工程</p>
          <h2>区間ごとに書いた工程</h2>
        </div>
        <ol className="timeline">
          {career.map((item) => (
            <li key={item.years} className="glass">
              <p className="years">{item.years}</p>
              <h2>{item.area}</h2>
              <p className="meta">{item.steps}</p>
              <p>{item.tech}</p>
            </li>
          ))}
        </ol>
        <p className="more-link"><Link href="/career">職務経歴を見る</Link></p>
      </section>
    </main>
  );
}
