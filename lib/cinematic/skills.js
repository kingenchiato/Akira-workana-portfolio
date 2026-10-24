export const SKILLS = [
  { id: "css3", icon: "css", years: "5-10", projects: 4, name: { ja: "CSS3", en: "CSS3", pt: "CSS3" } },
  { id: "javascript", icon: "js", years: "5-10", projects: 4, name: { ja: "JavaScript", en: "JavaScript", pt: "JavaScript" } },
  { id: "python", icon: "python", years: "5-10", projects: 3, name: { ja: "Python", en: "Python", pt: "Python" } },
  { id: "rwd", icon: "rwd", years: "5-10", projects: 3, name: { ja: "レスポンシブWeb", en: "Responsive Web Design", pt: "Web design responsivo" } },
  { id: "react", icon: "react", years: "5-10", projects: 1, name: { ja: "React.js", en: "React.js", pt: "React.js" } },
  { id: "flutter", icon: "flutter", years: "10+", projects: 1, name: { ja: "Flutter", en: "Flutter", pt: "Flutter" } },
  { id: "firebase", icon: "firebase", years: "5-10", projects: 1, name: { ja: "Firebase", en: "Firebase", pt: "Firebase" } },
  { id: "dart", icon: "dart", years: "5-10", projects: 1, name: { ja: "Dart", en: "Dart", pt: "Dart" } },
  { id: "unity", icon: "unity", years: "5-10", projects: 0, name: { ja: "Unity 3D", en: "Unity 3D", pt: "Unity 3D" } },
  { id: "wordpress", icon: "wp", years: "5-10", projects: 0, name: { ja: "WordPress", en: "WordPress", pt: "WordPress" } },
  { id: "sysprog", icon: "sys", years: "5-10", projects: 0, name: { ja: "システムプログラミング", en: "System Programming", pt: "Programação de sistemas" } },
  { id: "blender", icon: "blender", years: "5-10", projects: 0, name: { ja: "Blender 3D", en: "Blender 3D", pt: "Blender 3D" } },
  { id: "rest", icon: "rest", years: "3-5", projects: 0, name: { ja: "REST API", en: "REST API", pt: "REST API" } },
  { id: "excel", icon: "excel", years: "3-5", projects: 0, name: { ja: "Microsoft Excel", en: "Microsoft Excel", pt: "Microsoft Excel" } },
  { id: "android", icon: "android", years: "5-10", projects: 0, name: { ja: "Android", en: "Android", pt: "Android" } },
  { id: "database", icon: "db", years: "5-10", projects: 0, name: { ja: "データベース", en: "Database", pt: "Banco de dados" } },
  { id: "php", icon: "php", years: "5-10", projects: 0, name: { ja: "PHP", en: "PHP", pt: "PHP" } },
  { id: "mysql", icon: "mysql", years: "5-10", projects: 0, name: { ja: "MySQL", en: "MySQL", pt: "MySQL" } },
  { id: "html", icon: "html", years: "5-10", projects: 0, name: { ja: "HTML", en: "HTML", pt: "HTML" } },
  { id: "chatbot", icon: "bot", years: "5-10", projects: 0, name: { ja: "チャットボット", en: "Chatbot", pt: "Chatbot" } },
  { id: "kotlin", icon: "kotlin", years: "5-10", projects: 0, name: { ja: "Kotlin", en: "Kotlin", pt: "Kotlin" } },
  { id: "swift", icon: "swift", years: "5-10", projects: 0, name: { ja: "Swift", en: "Swift", pt: "Swift" } },
  { id: "crm", icon: "crm", years: "5-10", projects: 0, name: { ja: "CRM", en: "CRM", pt: "CRM" } },
  { id: "nlp", icon: "nlp", years: "5-10", projects: 0, name: { ja: "自然言語処理", en: "Natural Language Processing", pt: "Processamento de linguagem natural" } },
  { id: "anim3d", icon: "anim", years: "5-10", projects: 0, name: { ja: "3Dアニメーション", en: "3D Animation", pt: "Animação 3D" } }
];

export function yearsLabel(years, lang) {
  if (years === "10+") {
    return { ja: "実務 10年以上", en: "10+ years of experience", pt: "Mais de 10 anos de experiência" }[lang];
  }
  if (years === "3-5") {
    return { ja: "実務 3〜5年", en: "3 to 5 years of experience", pt: "3 a 5 anos de experiência" }[lang];
  }
  return { ja: "実務 5〜10年", en: "5 to 10 years of experience", pt: "5 a 10 anos de experiência" }[lang];
}

export function projectsLabel(n, lang) {
  if (!n) {
    return { ja: "掲載プロジェクト —", en: "Listed projects —", pt: "Projetos listados —" }[lang];
  }
  return {
    ja: `掲載プロジェクト ${n}件`,
    en: `${n} listed project${n > 1 ? "s" : ""}`,
    pt: `${n} projeto${n > 1 ? "s" : ""} listado${n > 1 ? "s" : ""}`
  }[lang];
}
