export const LANGS = [
  { id: "en", label: "EN" },
  { id: "ja", label: "日本語" },
  { id: "pt", label: "PT" }
];

const skillGroups = {
  en: [
    ["Languages", "The languages the work is written in."],
    ["Interfaces", "Screens, layout, and the sites people actually open."],
    ["Mobile", "Phone and tablet products, including the stores they ship to."],
    ["Backend and data", "APIs, databases, and the records behind the screen."],
    ["Business tools", "The systems an operation lives in day to day."],
    ["AI and language", "Assistants and text, tied to a real workflow."],
    ["Games and 3D", "Interactive space, from interface to a modeled world."]
  ],
  ja: [
    ["言語", "実装に使っている言語です。"],
    ["画面", "人が実際に開くサイトと、そのレイアウトです。"],
    ["モバイル", "電話とタブレット向けの製品です。"],
    ["基盤とデータ", "API、データベース、画面の奥の記録です。"],
    ["業務の道具", "毎日の運用が乗っている仕組みです。"],
    ["AIと言語", "実際の作業の流れにつながった支援です。"],
    ["ゲームと3D", "画面から空間までを含むインタラクティブな仕事です。"]
  ],
  pt: [
    ["Linguagens", "As linguagens em que o trabalho é escrito."],
    ["Interfaces", "Telas, layout e os sites que as pessoas abrem."],
    ["Mobile", "Produtos de telefone e tablet."],
    ["Backend e dados", "APIs, bancos e os registros atrás da tela."],
    ["Ferramentas de negócio", "Os sistemas em que a operação vive todo dia."],
    ["IA e linguagem", "Assistentes e texto, presos a um fluxo real."],
    ["Jogos e 3D", "Espaço interativo, da interface ao mundo modelado."]
  ]
};

export const SKILL_GROUP_IDS = [
  ["javascript", "python", "php", "html", "css3", "dart", "kotlin", "swift"],
  ["react", "rwd", "wordpress"],
  ["flutter", "android"],
  ["rest", "mysql", "database", "firebase"],
  ["crm", "sysprog", "excel"],
  ["nlp", "chatbot"],
  ["unity", "blender", "anim3d"]
];

export function skillGroupMeta(lang) {
  return skillGroups[lang] || skillGroups.en;
}

const copy = {
  en: {
    metaTitle: "Araki Hideki · Systems, web, and mobile",
    metaDescription:
      "Portfolio of Araki Hideki, a full-stack developer in Kumamoto. Business systems, web and mobile products, APIs, and automation since 2007.",
    skip: "Skip to content",
    nav: [
      ["about", "About"],
      ["journey", "Journey"],
      ["skills", "Skills"],
      ["projects", "Work"],
      ["services", "Services"],
      ["faq", "FAQ"]
    ],
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    brandRole: "Systems · Web · Mobile · AI",
    heroKicker: "Hello, I’m",
    heroName: "Araki Hideki",
    heroSub: "荒木 秀樹",
    heroRole: "Business systems · Web and mobile · AI and automation · APIs",
    heroBody:
      "I design and build software that has to survive real use: the screen, the workflow behind it, the integrations, and the handover. Based in Yamaga, Kumamoto, working with teams in Japan and abroad since 2007.",
    pills: ["Business systems", "Web and mobile", "AI and automation", "APIs and data"],
    slider: {
      prev: "Previous photo",
      next: "Next photo",
      portraits: "Photos",
      dot: (n) => `Show photo ${n}`
    },
    aboutKicker: "Profile",
    aboutTitle: "I build software around systems, workflows, and products.",
    aboutLead:
      "I’m a Japanese full-stack developer. The work covers business systems, websites, mobile apps, automation, and the APIs that connect them. I came through information science at Ritsumeikan University, then nineteen years of delivery — including full-stack work at TIS Inc. from 2018 to 2025.",
    aboutMore:
      "Clients tend to mention communication and ownership. I write so a person who does not code can decide, and I leave the project in a state the next person can run. Microsoft certification and results in domestic programming contests sit behind that, not in front of it.",
    aboutPills: ["Systems", "Web", "Mobile", "AI", "APIs", "Commerce", "UI", "kintone"],
    stats: [
      ["19 yrs", "Professional practice, from 2007"],
      ["2018–25", "Full-stack engineer, TIS Inc."],
      ["3", "Japanese, English, and French"],
      ["Senior", "From brief through handover"]
    ],
    approachKicker: "How I approach the work",
    approach: [
      "I treat a product as one system: the interface, the workflow, the data, the permissions, and the operations that keep it alive after launch.",
      "The stack follows the problem. The aim stays the same — software that is clear to maintain, honest about failures, and useful on a Tuesday afternoon."
    ],
    journeyKicker: "Background",
    journeyTitle: "A long practice, kept in one line.",
    journeyLead: "The years sit on the center line. Each step is the work that followed, from university through independent practice.",
    journey: [
      ["2003 — 2007", "Education", "Information science", "Ritsumeikan University, College of Science and Engineering. The foundation in computing before the professional work."],
      ["2007 — 2014", "Web and operations", "Sites, bookings, CRM", "Websites, admin screens, reservations, customer records, and commerce. WordPress, HTML, CSS, JavaScript, REST, and databases."],
      ["2014 — 2018", "Mobile", "Apps and connections", "Flutter on iOS and Android, plus Android integrations. Attendance and other daily tools, from interface through implementation."],
      ["2018 — 2025", "TIS Inc.", "Full-stack delivery", "Web applications, business systems, and mobile, with Python, JavaScript, PHP, and SQL. AI-assisted extraction, summary, and automation joined the same delivery."],
      ["2025 — now", "Independent", "Improvement and care", "Existing systems, new features, external APIs, and kintone. The work includes the handover, not only the first release."]
    ],
    skillsKicker: "Capabilities",
    skillsTitle: "A practical range, with the years attached.",
    skillsLead: "Arc length is years of use, grouped by the kind of work. A longer arc is a longer practice, not a score.",
    skillsNoteKicker: "How to read this",
    skillsNote: "Nothing here is a logo wall. The label is the range I have actually used on delivery: 10 years or more, 5 to 10, or 3 to 5.",
    projectsKicker: "Selected work",
    projectsTitle: "Software built for a real operation.",
    projectsLead: "A selection across systems, apps, sites, games, and automation. Open a piece for the notes.",
    projectsNoteKicker: "Disciplines",
    projectsNote: "Filter the shelf. Logos and cards are separate from the software.",
    filters: [
      ["software", "All work"],
      ["system", "Systems"],
      ["app", "Apps"],
      ["web", "Web"],
      ["game", "Games"],
      ["python", "Python and data"],
      ["logo", "Logos"],
      ["card", "Cards"]
    ],
    moreSkills: (n) => `+${n}`,
    openWork: "Open",
    showMore: "Show all work",
    showLess: "Show less",
    empty: "Nothing in this group yet.",
    live: "Live site",
    caseTitle: "Project notes",
    caseStory: "What it is",
    caseProblem: "The constraint",
    caseResponse: "What I did",
    caseOriginal: "Full notes in Japanese",
    servicesKicker: "Services",
    servicesTitle: "Engagements I take from the first sketch to the running system.",
    services: [
      ["01", "Business systems", "Reservations, attendance, inventory, CRM, and the admin desk around them.", ["One record the whole team can trust", "Permissions, states, and exceptions included"], "Operations"],
      ["02", "Web products", "Corporate sites, shops, and web apps with a first view that explains itself.", ["Responsive layout", "A path from arrival to inquiry or purchase"], "Sites"],
      ["03", "Mobile apps", "Flutter across iOS and Android, plus Android integrations.", ["A daily task finished in a few taps", "The same data as the system behind it"], "iOS · Android"],
      ["04", "AI and automation", "Extraction, summary, classification, and replies, wired into work people already do.", ["A human can still see and take over", "Python, APIs, and existing tools"], "Workflows"],
      ["05", "APIs and data", "REST, databases, payments, and the joins between products.", ["Contracts that the next developer can read", "PostgreSQL, MySQL, Firebase"], "Integrations"],
      ["06", "Commerce", "Catalogs, checkout, and the operational side of an online shop.", ["PayPay, cards, and order state", "A store a person can run after launch"], "Payments"],
      ["07", "Interface design", "Figma and implementation, with the hard part being what to leave out.", ["Hierarchy before decoration", "Screens a non-designer can keep using"], "UI"],
      ["08", "After delivery", "Fixes, the next feature, and a handover that does not depend on me staying.", ["Git history and a place to verify", "kintone and existing systems welcome"], "Care"]
    ],
    voicesKicker: "Clients",
    voicesTitle: "Notes from the work.",
    voicesLead: "Five-star notes from the work, with an approximate fee and how each engagement was shared.",
    voicesMore: "Show more",
    voicesLess: "Show fewer",
    faqKicker: "Questions",
    faqTitle: "Things people usually ask.",
    faqAsideKicker: "Something else",
    faqAside: "If it is not here, send it through the inquiry below. A rough scope is enough to start.",
    faq: [
      ["Who is Araki Hideki?", "A full-stack developer in Yamaga, Kumamoto. Information science at Ritsumeikan University, professional work since 2007, and full-stack delivery at TIS Inc. from 2018 to 2025. Japanese is native. English is advanced. French is intermediate."],
      ["What do you take on?", "Business systems, websites, mobile apps, APIs, commerce, and automation. Also identity work: logos and cards, kept separate from the software on this page."],
      ["Do you join an existing system?", "Yes. A large part of recent work is improvement: new features, external APIs, kintone, and making the current system easier to operate."],
      ["Do you use AI on real work?", "Yes, where it earns a place — retrieval, extraction, summary, classification, and assisted replies. The person operating the business still needs to see what happened."],
      ["Which languages and tools?", "JavaScript, Python, PHP, Dart and Flutter, SQL, React, WordPress, REST, Firebase, and kintone are the core. Unity and Blender when the work is spatial. I pick the tool for the job."],
      ["How does a project start?", "With the purpose, who uses it, and what must be true after launch. I would rather split a first release from later features than pretend everything ships on day one."],
      ["Can we work remotely?", "Yes. The practice already includes clients outside Japan. I write in Japanese, English, and, when useful, French."]
    ],
    contactKicker: "Next step",
    contactTitle: "If the fit is right, the first step can stay small.",
    contactBody: "Write the goal, the timing, and what already exists. I answer with a clear first slice — what to build now, and what can wait.",
    contactChips: ["A clear scope", "Integrations named", "Something you can run"],
    form: {
      name: "Name",
      email: "Email",
      kind: "Project",
      budget: "Scale",
      message: "About the project",
      namePh: "Your name",
      emailPh: "you@company.com",
      messagePh: "Goal, timing, and links if you have them.",
      kinds: ["Web application", "Mobile app", "Business system", "AI and automation", "Not sure yet"],
      budgets: ["Not decided", "A focused first release", "A longer partnership"],
      submit: "Copy inquiry",
      hint: "Nothing is stored on a server. The note is copied so you can paste it into Workana.",
      copied: "Copied. Paste it into your Workana message.",
      ready: "Your inquiry is ready. Copy it from the box if the clipboard was blocked.",
      invalid: "Please add a name, a valid email, and a short note.",
      copyAgain: "Copy again"
    },
    footerBlurb: "I design and build business systems, web and mobile products, and the APIs behind them.",
    footerExplore: "Explore",
    footerConnect: "Connect",
    rights: "© 2026 Araki Hideki. All rights reserved.",
    top: "Back to top",
    missingTitle: "This page is not on the map.",
    missingBody: "The portfolio is still here.",
    missingLink: "Back to the portfolio"
  },
  ja: {
    metaTitle: "荒木 秀樹 · 業務システム、Web、モバイル",
    metaDescription:
      "熊本のフルスタック開発者、荒木秀樹のポートフォリオ。2007年から、業務システム、Web、モバイル、API、自動化を手がけています。",
    skip: "本文へ進む",
    nav: [
      ["about", "プロフィール"],
      ["journey", "経歴"],
      ["skills", "スキル"],
      ["projects", "実績"],
      ["services", "サービス"],
      ["faq", "FAQ"]
    ],
    contact: "相談する",
    menu: "メニュー",
    close: "閉じる",
    brandRole: "業務システム · Web · モバイル · AI",
    heroKicker: "こんにちは",
    heroName: "荒木 秀樹",
    heroSub: "Araki Hideki",
    heroRole: "業務システム · Webとモバイル · AIと自動化 · API",
    heroBody:
      "画面、その奥の業務、外部との連携、引き渡しまでを一つの仕事として設計し、実装しています。熊本県山鹿市を拠点に、2007年から日本と海外のチームと仕事をしています。",
    pills: ["業務システム", "Webとモバイル", "AIと自動化", "APIとデータ"],
    slider: {
      prev: "前の写真",
      next: "次の写真",
      portraits: "写真",
      dot: (n) => `写真 ${n} を表示`
    },
    aboutKicker: "プロフィール",
    aboutTitle: "仕組みと、仕事の流れと、製品に沿ってソフトウェアを作ります。",
    aboutLead:
      "日本のフルスタック開発者です。業務システム、Web、モバイル、自動化、それらをつなぐAPIを扱います。立命館大学 理工学部 情報工学科を経て、2007年から実務を続け、2018年から2025年まではTIS株式会社でフルスタックの開発を担当しました。",
    aboutMore:
      "評価していただくことが多いのは、説明の仕方と、最後まで持つことです。コードを書かない方でも判断できる言葉で進め、次の人が運用できる形で渡します。Microsoft認定と、国内のプログラミング競技での成績は、その後ろにあるものです。",
    aboutPills: ["業務システム", "Web", "モバイル", "AI", "API", "EC", "UI", "kintone"],
    stats: [
      ["19年", "2007年からの実務"],
      ["2018–25", "TIS株式会社でフルスタック"],
      ["3", "日本語、英語、フランス語"],
      ["一貫", "要件から引き渡しまで"]
    ],
    approachKicker: "進め方",
    approach: [
      "製品を一つの系として見ます。画面、業務の流れ、データ、権限、そして公開後にそれを生かし続ける運用です。",
      "技術はその問題に合わせます。目指すものは変わりません。保守でき、失敗が隠れておらず、火曜の午後にも使えるソフトウェアです。"
    ],
    journeyKicker: "経歴",
    journeyTitle: "一本の実務として、長く続けてきました。",
    journeyLead: "大学の情報工学から、Web、業務システム、モバイル、自動化へと続きます。",
    journey: [
      ["2003 — 2007", "学歴", "情報工学", "立命館大学 理工学部 情報工学科。実務の前の、計算とソフトウェアの基礎です。"],
      ["2007 — 2014", "Webと業務", "サイト、予約、CRM", "Webサイト、管理画面、予約、顧客、EC。WordPress、HTML、CSS、JavaScript、REST、データベース。"],
      ["2014 — 2018", "モバイル", "アプリと連携", "FlutterによるiOSとAndroid、Android連携。勤怠など、毎日使う道具を画面から実装まで。"],
      ["2018 — 2025", "TIS株式会社", "フルスタック", "Web、業務システム、モバイルをPython、JavaScript、PHP、SQLで開発。抽出、要約、自動化も同じ納品の中に含めました。"],
      ["2025 — 現在", "独立", "改善と保守", "既存システムの改善、機能追加、外部API、kintone。最初のリリースだけでなく、引き渡しまでを仕事に含めています。"]
    ],
    skillsKicker: "スキル",
    skillsTitle: "使ってきた年数を、そのまま置いています。",
    skillsLead: "棒の長さは点数ではなく、実務の年数です。長いほど、長く使っています。",
    skillsNoteKicker: "見方",
    skillsNote: "ロゴを並べた壁ではありません。表示しているのは納品で使った年数の幅です。10年以上、5〜10年、3〜5年。",
    projectsKicker: "実績",
    projectsTitle: "実際の運用を想定して組んだソフトウェア。",
    projectsLead: "業務システム、アプリ、サイト、ゲーム、自動化から選んでいます。開くと記録が読めます。",
    projectsNoteKicker: "領域",
    projectsNote: "棚を絞り込めます。ロゴと名刺は、ソフトウェアとは分けてあります。",
    filters: [
      ["software", "すべて"],
      ["system", "システム"],
      ["app", "アプリ"],
      ["web", "Web"],
      ["game", "ゲーム"],
      ["python", "Python・データ"],
      ["logo", "ロゴ"],
      ["card", "名刺"]
    ],
    moreSkills: (n) => `+${n}`,
    openWork: "開く",
    showMore: "すべて表示",
    showLess: "少なく表示",
    empty: "この区分には、まだ作品がありません。",
    live: "公開サイト",
    caseTitle: "プロジェクトの記録",
    caseStory: "概要",
    caseProblem: "制約",
    caseResponse: "対応",
    caseOriginal: "日本語の全文",
    servicesKicker: "サービス",
    servicesTitle: "最初のスケッチから、動く仕組みまでを引き受けます。",
    services: [
      ["01", "業務システム", "予約、勤怠、在庫、CRM、そしてその周りの管理画面です。", ["チーム全員が同じ記録を見られる", "権限、状態、例外まで含める"], "運用"],
      ["02", "Webプロダクト", "コーポレートサイト、店舗、最初の画面で内容が分かるWebアプリです。", ["画面幅に沿ったレイアウト", "訪問から問い合わせ、購入までの道"], "サイト"],
      ["03", "モバイルアプリ", "FlutterでiOSとAndroid、必要ならAndroid連携です。", ["毎日の操作が少ない手数で終わる", "背後のシステムと同じデータ"], "iOS · Android"],
      ["04", "AIと自動化", "抽出、要約、分類、返信を、すでに行っている仕事の中へ入れます。", ["人が内容を見て引き継げる", "Python、API、今ある道具"], "ワークフロー"],
      ["05", "APIとデータ", "REST、データベース、決済、製品と製品のあいだです。", ["次の開発者が読める契約", "PostgreSQL、MySQL、Firebase"], "連携"],
      ["06", "商取引", "カタログ、会計、そして公開後に店を回す側の画面です。", ["PayPay、カード、注文の状態", "公開後に自分で回せる店"], "決済"],
      ["07", "画面の設計", "Figmaと実装。難しいのは、何を置かないかです。", ["装飾の前に階層", "デザイナー以外が使い続けられる画面"], "UI"],
      ["08", "納品のあと", "修正、次の機能、私がいなくても回る引き渡しです。", ["Gitの履歴と、確認できる場所", "kintoneや既存システムも対象"], "保守"]
    ],
    voicesKicker: "クライアント",
    voicesTitle: "仕事のあとにもらった言葉です。",
    voicesLead: "短いコメントを置いています。下に、対象の仕事の名前があります。",
    voicesMore: "もっと見る",
    voicesLess: "少なく見る",
    faqKicker: "質問",
    faqTitle: "よく聞かれることです。",
    faqAsideKicker: "それ以外",
    faqAside: "ここに無いことは、下の欄からどうぞ。範囲が粗くても、最初の一歩には足ります。",
    faq: [
      ["荒木秀樹とは", "熊本県山鹿市のフルスタック開発者です。立命館大学 理工学部 情報工学科を経て、2007年から実務、2018年から2025年まではTIS株式会社でフルスタックの開発を担当しました。日本語が母語、英語は上級、フランス語は中級です。"],
      ["どんな仕事を受けますか", "業務システム、Web、モバイル、API、EC、自動化です。ロゴと名刺も作ります。このページではソフトウェアと分けて置いています。"],
      ["今あるシステムにも入れますか", "はい。近ごろの仕事の多くは改善です。機能追加、外部API、kintone、そして今の仕組みを運用しやすくすることです。"],
      ["AIは実際の仕事に使いますか", "はい。場所を選んで使います。検索、抽出、要約、分類、返信の補助です。事業を回す人が、何が起きたかを見られることが条件です。"],
      ["言語と道具は", "中心はJavaScript、Python、PHP、DartとFlutter、SQL、React、WordPress、REST、Firebase、kintoneです。空間の仕事ではUnityとBlender。案件に合うものを選びます。"],
      ["プロジェクトはどう始まりますか", "目的、使う人、公開後に成り立っていなければならないことから始めます。初日に全部を載せるより、最初のリリースと後の機能を分けます。"],
      ["リモートでも頼めますか", "はい。日本の外のクライアントとも仕事をしています。日本語と英語、必要ならフランス語で書けます。"]
    ],
    contactKicker: "次の一歩",
    contactTitle: "合いそうなら、最初の一歩は小さくて構いません。",
    contactBody: "目的、時期、今あるものを書いてください。今作るものと、後でよいものを分けて返します。",
    contactChips: ["範囲が明確", "連携先が分かる", "自分で回せる"],
    form: {
      name: "お名前",
      email: "メール",
      kind: "プロジェクト",
      budget: "規模",
      message: "内容",
      namePh: "お名前",
      emailPh: "you@company.com",
      messagePh: "目的、時期、参考になるリンク。",
      kinds: ["Webアプリケーション", "モバイルアプリ", "業務システム", "AIと自動化", "まだ決めていない"],
      budgets: ["未定", "最初のリリースに絞る", "長く伴走する"],
      submit: "問い合わせをコピー",
      hint: "サーバには保存しません。Workanaへ貼れるように、文章をコピーします。",
      copied: "コピーしました。Workanaのメッセージへ貼ってください。",
      ready: "文章ができました。クリップボードが使えない場合は、下の欄からコピーしてください。",
      invalid: "お名前、正しいメール、短い内容を入れてください。",
      copyAgain: "もう一度コピー"
    },
    footerBlurb: "業務システム、Web、モバイル、そして背後のAPIを設計し、実装しています。",
    footerExplore: "案内",
    footerConnect: "連絡",
    rights: "© 2026 荒木 秀樹. All rights reserved.",
    top: "先頭へ",
    missingTitle: "このページはありません。",
    missingBody: "ポートフォリオ自体はここにあります。",
    missingLink: "ポートフォリオへ戻る"
  },
  pt: {
    metaTitle: "Araki Hideki · Sistemas, web e mobile",
    metaDescription:
      "Portfólio de Araki Hideki, desenvolvedor full-stack em Kumamoto. Sistemas, web, mobile, APIs e automação desde 2007.",
    skip: "Ir ao conteúdo",
    nav: [
      ["about", "Perfil"],
      ["journey", "Trajetória"],
      ["skills", "Skills"],
      ["projects", "Trabalhos"],
      ["services", "Serviços"],
      ["faq", "FAQ"]
    ],
    contact: "Contato",
    menu: "Menu",
    close: "Fechar",
    brandRole: "Sistemas · Web · Mobile · IA",
    heroKicker: "Olá, eu sou",
    heroName: "Araki Hideki",
    heroSub: "荒木 秀樹",
    heroRole: "Sistemas de negócio · Web e mobile · IA e automação · APIs",
    heroBody:
      "Desenho e construo software que precisa aguentar o uso real: a tela, o fluxo por trás, as integrações e a entrega. Em Yamaga, Kumamoto, com equipes no Japão e fora dele desde 2007.",
    pills: ["Sistemas de negócio", "Web e mobile", "IA e automação", "APIs e dados"],
    slider: {
      prev: "Foto anterior",
      next: "Próxima foto",
      portraits: "Fotos",
      dot: (n) => `Mostrar foto ${n}`
    },
    aboutKicker: "Perfil",
    aboutTitle: "Faço software em volta de sistemas, fluxos e produtos.",
    aboutLead:
      "Sou um desenvolvedor full-stack japonês. O trabalho cobre sistemas de negócio, sites, apps, automação e as APIs que ligam tudo isso. Formação em ciência da informação na Universidade Ritsumeikan e dezenove anos de entrega — incluindo full-stack na TIS Inc. de 2018 a 2025.",
    aboutMore:
      "O que os clientes costumam citar é a comunicação e o cuidado até o fim. Escrevo para que alguém que não programa consiga decidir, e deixo o projeto num estado em que a próxima pessoa consegue operar. A certificação Microsoft e os resultados em competições nacionais ficam atrás disso, não na frente.",
    aboutPills: ["Sistemas", "Web", "Mobile", "IA", "APIs", "Comércio", "UI", "kintone"],
    stats: [
      ["19 anos", "Prática profissional, desde 2007"],
      ["2018–25", "Engenheiro full-stack, TIS Inc."],
      ["3", "Japonês, inglês e francês"],
      ["Sênior", "Do briefing à entrega"]
    ],
    approachKicker: "Como eu conduzo",
    approach: [
      "Trato o produto como um sistema só: a interface, o fluxo, os dados, as permissões e a operação que o mantém vivo depois do lançamento.",
      "A stack segue o problema. O objetivo não muda — software claro de manter, honesto sobre falhas e útil numa tarde de terça."
    ],
    journeyKicker: "Trajetória",
    journeyTitle: "Uma prática longa, numa linha só.",
    journeyLead: "A formação, e depois uma sequência contínua de web, sistemas, mobile e automação.",
    journey: [
      ["2003 — 2007", "Formação", "Ciência da informação", "Universidade Ritsumeikan, Faculdade de Ciência e Engenharia. A base em computação antes do trabalho profissional."],
      ["2007 — 2014", "Web e operação", "Sites, reservas, CRM", "Sites, painéis, reservas, clientes e comércio. WordPress, HTML, CSS, JavaScript, REST e bancos."],
      ["2014 — 2018", "Mobile", "Apps e ligações", "Flutter em iOS e Android, além de integrações Android. Ponto e outras ferramentas diárias, da interface à implementação."],
      ["2018 — 2025", "TIS Inc.", "Entrega full-stack", "Aplicações web, sistemas e mobile, com Python, JavaScript, PHP e SQL. Extração, resumo e automação com IA entraram na mesma entrega."],
      ["2025 — agora", "Independente", "Melhoria e cuidado", "Sistemas existentes, funções novas, APIs externas e kintone. O trabalho inclui a passagem, não só o primeiro release."]
    ],
    skillsKicker: "Competências",
    skillsTitle: "Um alcance prático, com os anos ao lado.",
    skillsLead: "Cada barra é tempo de uso, não uma nota. A barra mais longa é a prática mais longa.",
    skillsNoteKicker: "Como ler",
    skillsNote: "Isto não é uma parede de logos. O rótulo é o intervalo que usei de fato na entrega: 10 anos ou mais, 5 a 10, ou 3 a 5.",
    projectsKicker: "Trabalhos",
    projectsTitle: "Software feito para uma operação real.",
    projectsLead: "Uma seleção entre sistemas, apps, sites, jogos e automação. Abra um item para ler as notas.",
    projectsNoteKicker: "Disciplinas",
    projectsNote: "Filtre a estante. Logos e cartões ficam separados do software.",
    filters: [
      ["software", "Tudo"],
      ["system", "Sistemas"],
      ["app", "Apps"],
      ["web", "Web"],
      ["game", "Jogos"],
      ["python", "Python e dados"],
      ["logo", "Logos"],
      ["card", "Cartões"]
    ],
    moreSkills: (n) => `+${n}`,
    openWork: "Abrir",
    showMore: "Mostrar tudo",
    showLess: "Mostrar menos",
    empty: "Ainda não há peças neste grupo.",
    live: "Site no ar",
    caseTitle: "Notas do projeto",
    caseStory: "O que é",
    caseProblem: "A restrição",
    caseResponse: "O que fiz",
    caseOriginal: "Notas completas em japonês",
    servicesKicker: "Serviços",
    servicesTitle: "Trabalhos que levo do primeiro esboço ao sistema rodando.",
    services: [
      ["01", "Sistemas de negócio", "Reservas, ponto, estoque, CRM e o painel em volta deles.", ["Um registro em que a equipe confia", "Permissões, estados e exceções inclusos"], "Operação"],
      ["02", "Produtos web", "Sites institucionais, lojas e web apps cuja primeira dobra se explica.", ["Layout responsivo", "Um caminho da chegada ao contato ou à compra"], "Sites"],
      ["03", "Apps mobile", "Flutter em iOS e Android, além de integrações Android.", ["Uma tarefa diária em poucos toques", "Os mesmos dados do sistema por trás"], "iOS · Android"],
      ["04", "IA e automação", "Extração, resumo, classificação e respostas, ligados ao trabalho que as pessoas já fazem.", ["Uma pessoa ainda vê e assume", "Python, APIs e as ferramentas atuais"], "Fluxos"],
      ["05", "APIs e dados", "REST, bancos, pagamentos e as junções entre produtos.", ["Contratos que o próximo dev lê", "PostgreSQL, MySQL, Firebase"], "Integrações"],
      ["06", "Comércio", "Catálogo, checkout e o lado operacional de uma loja online.", ["PayPay, cartões e o estado do pedido", "Uma loja que a pessoa consegue operar"], "Pagamentos"],
      ["07", "Desenho de interface", "Figma e implementação. A parte difícil é o que deixar de fora.", ["Hierarquia antes da decoração", "Telas que um não-designer continua usando"], "UI"],
      ["08", "Depois da entrega", "Correções, a próxima função e uma passagem que não depende de eu ficar.", ["Histórico no Git e um lugar para verificar", "kintone e sistemas existentes são bem-vindos"], "Cuidado"]
    ],
    voicesKicker: "Clientes",
    voicesTitle: "Notas que ficaram do trabalho.",
    voicesLead: "Um conjunto curto de comentários. O nome do projeto fica embaixo.",
    voicesMore: "Mostrar mais",
    voicesLess: "Mostrar menos",
    faqKicker: "Perguntas",
    faqTitle: "O que costumam me perguntar.",
    faqAsideKicker: "Outra coisa",
    faqAside: "Se não estiver aqui, mande pela mensagem abaixo. Um escopo aproximado já serve para começar.",
    faq: [
      ["Quem é Araki Hideki?", "Desenvolvedor full-stack em Yamaga, Kumamoto. Ciência da informação na Universidade Ritsumeikan, prática desde 2007 e entrega full-stack na TIS Inc. de 2018 a 2025. Japonês nativo, inglês avançado, francês intermediário."],
      ["Que tipo de trabalho você aceita?", "Sistemas de negócio, sites, apps, APIs, comércio e automação. Também identidade: logos e cartões, separados do software nesta página."],
      ["Você entra num sistema que já existe?", "Sim. Boa parte do trabalho recente é melhoria: funções novas, APIs externas, kintone e deixar o sistema atual mais fácil de operar."],
      ["Você usa IA em trabalho real?", "Sim, onde ela merece o lugar — busca, extração, resumo, classificação e respostas assistidas. Quem opera o negócio ainda precisa ver o que aconteceu."],
      ["Quais linguagens e ferramentas?", "O núcleo é JavaScript, Python, PHP, Dart e Flutter, SQL, React, WordPress, REST, Firebase e kintone. Unity e Blender quando o trabalho é espacial. Escolho a ferramenta pelo problema."],
      ["Como um projeto começa?", "Pelo propósito, por quem usa e pelo que precisa ser verdade depois do lançamento. Prefiro separar o primeiro release das funções seguintes a fingir que tudo sai no primeiro dia."],
      ["Dá para trabalhar remoto?", "Sim. A prática já inclui clientes fora do Japão. Escrevo em japonês, inglês e, quando ajuda, francês."]
    ],
    contactKicker: "Próximo passo",
    contactTitle: "Se o encaixe for bom, o primeiro passo pode ser pequeno.",
    contactBody: "Escreva o objetivo, o prazo e o que já existe. Eu respondo com um primeiro corte claro — o que construir agora e o que pode esperar.",
    contactChips: ["Escopo claro", "Integrações nomeadas", "Algo que você opera"],
    form: {
      name: "Nome",
      email: "E-mail",
      kind: "Projeto",
      budget: "Escala",
      message: "Sobre o projeto",
      namePh: "Seu nome",
      emailPh: "you@company.com",
      messagePh: "Objetivo, prazo e links, se tiver.",
      kinds: ["Aplicação web", "App mobile", "Sistema de negócio", "IA e automação", "Ainda não sei"],
      budgets: ["Em aberto", "Um primeiro release focado", "Uma parceria mais longa"],
      submit: "Copiar mensagem",
      hint: "Nada fica num servidor. O texto é copiado para você colar na Workana.",
      copied: "Copiado. Cole na sua mensagem da Workana.",
      ready: "A mensagem está pronta. Copie da caixa se a área de transferência foi bloqueada.",
      invalid: "Inclua um nome, um e-mail válido e uma nota curta.",
      copyAgain: "Copiar de novo"
    },
    footerBlurb: "Desenho e construo sistemas de negócio, produtos web e mobile, e as APIs por trás deles.",
    footerExplore: "Explorar",
    footerConnect: "Contato",
    rights: "© 2026 Araki Hideki. Todos os direitos reservados.",
    top: "Voltar ao topo",
    missingTitle: "Esta página não está no mapa.",
    missingBody: "O portfólio continua aqui.",
    missingLink: "Voltar ao portfólio"
  }
};

export function siteCopy(lang) {
  return copy[lang] || copy.en;
}
