import { career, education, nav, profile, projects, skills, stages, strengths } from "./content";

function includes(text, words) {
  const lower = text.toLowerCase();
  return words.some((word) => text.includes(word) || lower.includes(word.toLowerCase()));
}

export function answerQuestion(raw) {
  const text = raw.trim();
  if (!text) return "質問を入力してください。";

  if (includes(text, ["こんにちは", "こんばんは", "はじめまして", "よろしく"])) {
    return "こんにちは。荒木秀樹のポートフォリオについて、経歴・スキル・所在地・サイトの見方をお答えします。載っていないことは、その旨をお伝えします。";
  }
  if (includes(text, ["メール", "電話", "連絡先", "phone", "mail", "e-mail"])) {
    return "メールアドレスと電話番号は、このサイトには掲載していません。";
  }
  if (includes(text, ["お客様の声", "推薦", "口コミ", "評判", "クライアントの声"])) {
    return "お客様からいただいた評価の原文は、まだ掲載していません。ホームに流れる言葉は対応姿勢であり、実在の推薦文ではありません。原文は「お客様の声」の資料が揃ってから掲載します。";
  }
  if (includes(text, ["会社", "所属", "勤務先", "企業名", "社名"])) {
    return "所属先の名称は公開資料では伏せています。フルスタック開発者として、2007年4月1日から2026年3月31日まで担当した経歴を掲載しています。";
  }
  if (includes(text, ["名前", "氏名", "だれ", "誰", "なまえ"])) {
    return `${profile.name}（${profile.kana}／${profile.kanaKata}）です。${profile.role}で、実務経験は${profile.experience}（${profile.period}）です。`;
  }
  if (includes(text, ["歳", "年齢", "生年月日", "誕生日", "性別"])) {
    return `生年月日は${profile.birthday}、性別は${profile.gender}です。年齢の表記は時期で変わるため、生年月日をご確認ください。`;
  }
  if (includes(text, ["住所", "どこ", "所在", "駅", "山鹿", "熊本", "地図", "郵便"])) {
    return "活動の拠点は熊本県山鹿市です。番地や郵便番号、駅名は掲載していません。";
  }
  if (includes(text, ["学歴", "大学", "学校", "立命館"])) {
    return education.map(([years, kind, school]) => `${years} ${kind} ${school}`).join(" / ");
  }
  if (includes(text, ["歩き方", "メニュー", "ページ", "見方", "ヘルプ", "どこを見"])) {
    return `メニューは次のとおりです。${nav.map((item) => `${item.label}（${item.note}）`).join("、")}。ログインは不要です。下層ページの本編は準備中で、要点はホームにまとめています。`;
  }
  if (includes(text, ["強み", "スタイル", "進め方", "方針", "コミュニケーション"])) {
    return strengths.join("");
  }

  const project = projects.find((item) => text.includes(item.title) || item.title.split("・").some((part) => part.length > 1 && text.includes(part)));
  if (project) {
    return `${project.title}：${project.point} 技術・領域は${project.tech}です。画面は納品物のスクリーンショットではなく、実績領域のビジュアルです。`;
  }

  const skill = skills.find(([name, body]) => text.includes(name) || body.split("、").some((part) => part.length > 2 && text.includes(part)));
  if (skill) return `${skill[0]}：${skill[1]}`;

  const stage = stages.find((item) => text.includes(item.ja) || text.toLowerCase().includes(item.rank.toLowerCase()));
  if (stage) return `${stage.ja}（${stage.years}）${stage.title}。${stage.text} バッジは経験の積み上げを示す表現で、公的な資格番号ではありません。`;

  const job = career.find((item) => text.includes(item.years.slice(0, 4)) || text.includes(item.area));
  if (job) return `${job.years} ${job.area}。${job.body} 技術は${job.tech}、工程は${job.steps}です。`;

  if (includes(text, ["スキル", "技術", "できること", "対応", "言語"])) {
    return skills.map(([name, body]) => `${name}：${body}`).join(" / ");
  }
  if (includes(text, ["経歴", "職務", "キャリア", "経験"])) {
    return `${profile.summary} 期間の内訳は、${career.map((item) => `${item.years}は${item.area}`).join("、")}です。`;
  }
  if (includes(text, ["実績", "作品", "ポートフォリオ"])) {
    return `主な実績領域は、${projects.map((item) => item.title).join("、")}、それにkintone業務アプリです。`;
  }

  return "このサイトに載っている情報だけではお答えできません。ホームの「サイトの歩き方」から、職務経歴・スキルシート・自己紹介をご確認ください。メールアドレス、電話番号、お客様の声の原文、所属企業名は掲載していません。";
}
