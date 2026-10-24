/**
 * Business cards cropped from the name-design sheet.
 * Shown on the portfolio page only.
 */

function card(id, title, summary) {
  const file = String(id).padStart(2, "0");
  return {
    id: `card-${file}`,
    category: "card",
    label: title,
    title,
    skills: ["名刺"],
    summary,
    images: [`/images/portfolio/card/card-${file}.png`],
    url: "",
    period: "",
    home: false,
    orbit: false,
    overview: [summary]
  };
}

export const cardItems = [
  card(1, "AI Promotion Service", "青のカーブとAiのマークを、白地の左に置いた名刺です。"),
  card(2, "KIZUNA", "黒地に金の幾何マークと金の帯を合わせた名刺です。"),
  card(3, "SORA", "生成りの紙に緑の葉を配した、食品向けの名刺です。"),
  card(4, "MINAMO", "波の線とエンボスの曲線を使った、淡いグレーの名刺です。"),
  card(5, "YAMATO", "左に文字、右に山と湖の写真を分けた名刺です。"),
  card(6, "NEXUS", "暗い地に、紫のNとネットワークの図を置いた名刺です。"),
  card(7, "HANAKO", "蓮のマークと青海波を、生成りの紙に配した名刺です。"),
  card(8, "VERDE", "深緑の地に、葉のマークと金の文字を置いた名刺です。"),
  card(9, "LUMINA", "水晶のマークと、紫から青へのグラデーションを使った名刺です。")
];
