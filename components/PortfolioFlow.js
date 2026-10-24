import { portfolioFvFrames } from "../lib/portfolio";

export default function PortfolioFlow() {
  const frames = portfolioFvFrames();
  if (!frames.length) return null;
  const loop = [...frames, ...frames];

  return (
    <section className="folio-flow" aria-label="実績の流れ">
      <div className="folio-flow-track">
        {loop.map((frame, index) => (
          <figure className="folio-flow-card" key={`${frame.src}-${index}`}>
            <img src={frame.src} alt={index < frames.length ? frame.title : ""} />
            <figcaption>{frame.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
