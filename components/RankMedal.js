export default function RankMedal({ stage }) {
  return (
    <li className={stage.wide ? "badge badge-certified" : "badge"}>
      <img src={stage.image} alt={`${stage.ja}のバッジ`} />
      <p>
        <strong>{stage.ja}</strong>
        <small>{stage.years}</small>
      </p>
    </li>
  );
}
