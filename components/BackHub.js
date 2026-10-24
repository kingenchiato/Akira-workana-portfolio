export default function BackHub({ label, onBack }) {
  return (
    <button type="button" className="back-dock" onClick={onBack}>
      <span className="back-dock-orbit" aria-hidden="true" />
      <span className="back-dock-arrow" aria-hidden="true">
        ↙
      </span>
      <span className="back-dock-copy">
        <em>Return</em>
        <strong>{label}</strong>
      </span>
    </button>
  );
}
