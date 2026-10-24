import PortfolioCatalog from "../../components/PortfolioCatalog";
import PortfolioFlow from "../../components/PortfolioFlow";
import { pages } from "../../lib/content";

export const metadata = { title: pages.portfolio.title };

export default function Page() {
  return (
    <main className="below-hero sheet-page">
      <PortfolioFlow />
      <section className="panel">
        <div className="section-head sheet-top">
          <p className="eyebrow">ポートフォリオ</p>
          <h1>{pages.portfolio.title}</h1>
          <p>
            {pages.portfolio.lead}
            カードを開くと、画面と内容を確認できます。
          </p>
        </div>
        <PortfolioCatalog />
      </section>
    </main>
  );
}
