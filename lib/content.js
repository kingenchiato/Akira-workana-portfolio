export const profile = {
  name: "荒木 秀樹",
  kana: "あらき ひでき",
  kanaKata: "アラキ ヒデキ",
  role: "フルスタック開発者",
  gender: "男性",
  birthday: "1984年4月18日",
  experience: "約19年",
  period: "2007年4月〜2026年3月",
  summary:
    "Webサイト制作、業務システム、AI活用、モバイルアプリまで、企画・設計・実装・改善を一貫して対応するフルスタック開発者です。フロントエンド、バックエンド、データベース、API連携、外部サービス連携まで含め、利用者の操作性と公開後の管理・保守性を両立する設計を重視しています。"
};

export const nav = [
  { href: "/", label: "ホーム", note: "全体の案内と経歴・スキルの要点" },
  { href: "/portfolio", label: "ポートフォリオ", note: "開発実績の領域と画面" },
  { href: "/career", label: "職務経歴", note: "2007年からの期間と担当" },
  { href: "/skills", label: "スキルシート", note: "技術・工程・経験期間" },
  { href: "/about", label: "自己紹介", note: "人物・学歴・開発の姿勢" },
  { href: "/voices", label: "お客様の声", note: "評価の原文を掲載する場所" },
  { href: "/learn", label: "学び", note: "日本のIT、これから、AIの考え方" },
  { href: "/knowledge", label: "一般知識", note: "専門用語をかみ砕いた解説" },
  { href: "/help", label: "ヘルプ", note: "このサイトの見方" }
];

export const projects = [
  {
    title: "勤怠管理アプリ",
    image: "/images/project-attendance.jpg",
    tech: "Flutter／iOS／Android",
    point: "UI・機能設計から実装まで。業務フローに沿った画面構成。"
  },
  {
    title: "暗号資産データ分析",
    image: "/images/project-crypto.jpg",
    tech: "データ取得／集計／可視化",
    point: "取得、集計、分析、可視化を含むダッシュボード。"
  },
  {
    title: "予約・スタッフ管理",
    image: "/images/project-reserve.jpg",
    tech: "業務システム／データ管理",
    point: "予約、スタッフ、顧客情報を扱う業務画面の設計と実装。"
  },
  {
    title: "CRM・顧客管理",
    image: "/images/project-crm.jpg",
    tech: "CRM／管理画面",
    point: "顧客情報の一元管理、検索・編集、管理画面。"
  },
  {
    title: "Android CTI連携",
    image: "/images/project-cti.jpg",
    tech: "Android／システム連携",
    point: "Android側と業務システムを連携させる機能。"
  },
  {
    title: "管理画面付きWeb",
    image: "/images/project-admin.jpg",
    tech: "Web／管理画面",
    point: "利用者画面と管理者画面を含むサービス全体。"
  },
  {
    title: "EC・外部サービス連携",
    image: "/images/project-ec.jpg",
    tech: "REST API／決済／通知",
    point: "REST API、決済、通知などを含むシステム間連携。"
  },
  {
    title: "AI・LLM業務支援",
    image: "/images/project-ai.jpg",
    tech: "RAG／要約／自動化",
    point: "抽出、要約、分類、分析支援、自動化の業務組込み。"
  }
];

export const praises = [
  "目的から整理する",
  "非エンジニアにも伝わる",
  "運用まで見据える",
  "小さく始めて伸ばす",
  "画面の外まで設計する",
  "引き継げる形で納品する"
];

export const stages = [
  {
    rank: "Regular",
    ja: "レギュラー",
    years: "2007",
    title: "出発点",
    image: "/images/badge-regular.png",
    wide: false,
    text: "Web制作の実務に入った出発点です。画面と管理機能の土台をここで築きました。"
  },
  {
    rank: "Bronze",
    ja: "ブロンズ",
    years: "2007–2010",
    title: "Webの土台",
    image: "/images/badge-bronze.png",
    wide: false,
    text: "Webサイト、管理画面、業務システム。WordPress、HTML/CSS、JavaScriptで、予約・顧客・スタッフの情報を扱う画面と管理機能を整備。"
  },
  {
    rank: "Silver",
    ja: "シルバー",
    years: "2010–2014",
    title: "業務と連携",
    image: "/images/badge-silver.png",
    wide: false,
    text: "予約・顧客管理、CRM、EC。業務フローに沿ったデータ管理と、REST API・外部サービスとの連携。"
  },
  {
    rank: "Gold",
    ja: "ゴールド",
    years: "2014–2022",
    title: "モバイルとAI",
    image: "/images/badge-gold.png",
    wide: false,
    text: "FlutterによるiOS／Android、Android連携、勤怠管理。その後、RAG、抽出、要約、分類、分析支援、自動化を既存業務へ組込み。"
  },
  {
    rank: "Certified",
    ja: "認定ランサー",
    years: "2022–現在",
    title: "一貫した改善",
    image: "/images/badge-certified.png",
    wide: true,
    text: "既存システムの改善、機能追加、外部API、kintoneを含むデータ・権限・連携。保守と引継ぎまで見据えて対応。"
  }
];

export const career = [
  {
    years: "2007年4月〜2010年3月",
    area: "Webサイト・業務システム",
    body: "Webサイト、管理画面、業務システムの設計・実装。予約、顧客、スタッフなどの情報を扱う画面を構築し、運用しやすい管理機能を整備。",
    tech: "WordPress、HTML/CSS、JavaScript",
    steps: "要件整理／画面設計／実装／テスト"
  },
  {
    years: "2010年4月〜2014年3月",
    area: "予約・CRM・EC関連",
    body: "予約・顧客管理、CRM、EC関連機能の開発。業務フローに沿ったデータ管理と画面設計を行い、外部サービスとの連携にも対応。",
    tech: "REST API、データベース、外部サービス",
    steps: "設計／実装／連携テスト"
  },
  {
    years: "2014年4月〜2018年3月",
    area: "モバイル・連携システム",
    body: "FlutterによるモバイルアプリやAndroid連携、管理画面を伴うWebサービス。勤怠管理アプリではUI・機能設計から実装まで対応。",
    tech: "Flutter、iOS／Android、Android連携",
    steps: "UI設計／機能設計／実装／テスト"
  },
  {
    years: "2018年4月〜2022年3月",
    area: "AI・データ活用",
    body: "AI・LLMを活用したRAG、データ抽出、要約、分類、分析支援、自動化。既存業務への組込みと運用方法まで考慮して設計。",
    tech: "AI／LLM、RAG、データ処理、API",
    steps: "要件整理／設計／実装／検証"
  },
  {
    years: "2022年4月〜2026年3月",
    area: "業務改善・総合開発",
    body: "既存システムの改善、新機能追加、外部API連携、業務アプリ領域の設計・カスタマイズ。kintoneを含む日本企業向けの業務環境を意識したデータ・権限・連携設計。",
    tech: "kintone、JavaScript、REST API、Git／GitHub",
    steps: "設計／実装／テスト／改善／引継ぎ"
  }
];

export const skills = [
  ["Web", "WordPress、HTML/CSS、JavaScript、レスポンシブ対応、サイト設計・改善"],
  ["UI / UX", "Figmaによる画面設計、情報設計、スマートフォンを含む操作性"],
  ["モバイル", "Flutter、iOS／Android、Android連携"],
  ["業務システム", "予約・スタッフ管理、顧客管理、CRM、勤怠管理、管理画面"],
  ["EC・API", "REST API、外部サービス、決済、通知、データベース"],
  ["AI・LLM", "RAG、データ抽出、要約、分類、分析支援、自動化、既存業務への組込み"],
  ["kintone", "アプリ構成、フィールド・レコード設計、権限、JavaScriptカスタマイズ、REST API"],
  ["開発管理", "Git／GitHub、検証環境、バックアップ、セキュリティ、引継ぎを意識した納品"]
];

export const strengths = [
  "要件をそのまま実装するのではなく、目的、利用者、業務フロー、公開後の管理方法を整理してから設計します。",
  "画面だけでなく、データ構造、権限管理、例外処理、API、セキュリティまで含めて全体を考えます。",
  "非エンジニアの方にも判断しやすい言葉で説明し、途中経過を共有して認識のずれを早い段階で直します。",
  "Git／GitHubで変更履歴を管理し、検証環境で確認したうえで納品します。保守性と引継ぎを意識します。",
  "小規模な改修から新規開発まで、予算と納期を考慮し、初期開発と将来追加する機能を分けて提案します。"
];

export const education = [
  ["1991年4月〜1997年3月", "小学校", "三玉小学校"],
  ["1997年4月〜2000年3月", "中学校", "山鹿中学校"],
  ["2003年4月〜2007年3月21日", "大学", "立命館大学 理工学部 情報工学科"]
];

export const pages = {
  portfolio: {
    title: "ポートフォリオ",
    lead: "開発実績を、領域ごとに画面と担当範囲で見るページです。",
    points: [
      "勤怠管理、暗号資産の分析ダッシュボード、予約・スタッフ管理、CRM",
      "Android CTI連携、管理画面付きWeb、EC・外部サービス連携",
      "AI・LLMの業務組込み、kintone業務アプリ"
    ]
  },
  career: {
    title: "職務経歴",
    lead: "2007年4月から2026年3月までの担当領域と工程を、期間ごとに見るページです。",
    points: ["Webと業務システムの立ち上げ", "予約・CRM・EC", "モバイルと連携", "AI・データ活用", "業務改善とkintone"]
  },
  skills: {
    title: "スキルシート",
    lead: "技術、経験期間、担当工程を一覧で確認するページです。",
    points: ["Web、UI/UX、モバイル", "業務システム、EC・API", "AI・LLM、kintone、開発管理"]
  },
  about: {
    title: "自己紹介",
    lead: "熊本県山鹿市を拠点にする開発者としての経歴、学歴、仕事の進め方をまとめるページです。",
    points: ["立命館大学 理工学部 情報工学科", "要件整理から運用支援まで"]
  },
  voices: {
    title: "お客様の声",
    lead: "クライアントからいただいた評価の原文を掲載するページです。",
    points: ["いま公開できる原文の資料はまだありません", "ホームに流れている言葉は、対応姿勢を短く示したものです", "原文が揃い次第、このページに掲載します"]
  },
  learn: {
    title: "学び",
    lead: "ITに詳しくない方が、日本のITのいま、これからの流れ、AIの考え方を掴むためのページです。",
    points: ["業界の現状", "今後の潮流", "AI・LLMを業務に入れるときの考え方", "プロフィールのスキルが、どの課題に効くか"]
  },
  knowledge: {
    title: "一般知識",
    lead: "ポートフォリオに出てくる言葉を、日常の業務に引きよせて説明するページです。",
    points: ["API、権限、RAG、kintoneなどの用語", "発注前に揃えるとよい情報", "初期開発と追加開発の分け方"]
  },
  help: {
    title: "ヘルプ",
    lead: "このポートフォリオのメニューと、各ページで何が分かるかを案内するページです。",
    points: ["ホームが全体の案内図です", "各メニューは同じ見出しで下層ページへ続きます", "ログインは不要です"]
  }
};
