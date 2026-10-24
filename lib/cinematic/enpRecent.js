function pack(id, skills, images, copy) {
  return { id, city: "world", region: "world", skills, images, copy };
}

function trio(en, ja, pt) {
  return { ja, en, pt };
}

export const ENP_RECENT_COPY = {
  "enp-nexora": {
    title: "NEXORA | E-Commerce & Dropshipping Storefront",
    summary:
      "A premium home and lifestyle storefront concept that organizes a large catalog, product discovery, and an editorial blog into one shopping journey.",
    overview: [
      "NEXORA is a modern e-commerce storefront concept designed to demonstrate a premium online shopping experience for a home and lifestyle brand.",
      "The project explores how a cohesive digital storefront can help businesses present products effectively, organize large catalogs, improve product discovery, and create a smooth shopping journey.",
      "The design combines elegant typography, warm neutral colors, high-quality lifestyle imagery, refined product cards, and intuitive navigation.",
      "The homepage, shop listing, and editorial blog work together so visitors can discover products, compare options, and stay with the brand through content."
    ],
    features: [
      "Hero storefront with featured categories, trust indicators, and shopping calls to action",
      "Product listing with category navigation, photography, prices, ratings, wishlist, sorting, and filters",
      "Editorial blog for lifestyle content, article search, and popular posts",
      "Warm beige and cream visual system with rounded product cards",
      "Storefront structure suited to catalog management, payments, and dropshipping integrations"
    ],
    stack: ["React.js", "E-Commerce catalog", "UI/UX", "Responsive storefront"],
    skills: ["Web Design", "E-Commerce Website Development", "UI/UX Design", "React.js", "Dropshipping"],
    pdf: "/enp/docs/NEXORA_Ecommerce_Dropshipping_Case_Study_Revised.pdf"
  },
  "enp-excel": {
    title: "Excel & VBA Automation | Business Tools, Reporting & Workflows",
    summary:
      "A sales-management workbook concept that turns spreadsheets into structured tools with dashboards, macros, and repeatable reporting.",
    overview: [
      "Excel & VBA Automation is a business productivity concept focused on transforming spreadsheets into structured, efficient, and user-friendly business tools.",
      "The project demonstrates how customized Excel workbooks, VBA macros, interactive dashboards, and automated reporting can streamline repetitive tasks and improve data visibility.",
      "The interface presents a professional sales management layout with KPI cards, monthly charts, category breakdowns, and quick actions for import, report generation, email, and backup.",
      "The approach emphasizes validation, consistent formatting, and modular workflows that can adapt to sales, inventory, finance, and operations."
    ],
    features: [
      "VBA-oriented workflows for import, cleaning, consolidation, and formatting",
      "Interactive sales dashboard with KPI cards, charts, and date controls",
      "Automated reporting from structured spreadsheet data",
      "Navigation and quick actions for import, reports, email, and backup",
      "Validation and standardized formatting to reduce manual errors"
    ],
    stack: ["Microsoft Excel", "VBA", "Dashboard charts", "Data processing"],
    skills: ["Microsoft Excel", "VBA", "Data Processing", "Data Visualization", "Business Process Automation"],
    pdf: "/enp/docs/Excel_VBA_Automation_Case_Study.pdf"
  },
  "enp-gamehub": {
    title: "GAMEHUB | Online Game Store, Gaming Blog & Digital Gift Cards",
    summary:
      "A dark cinematic gaming storefront that combines digital game shopping, editorial content, and gift-card purchasing.",
    overview: [
      "GAMEHUB is a gaming storefront concept built around a dark, cinematic interface with electric-blue accents and high-impact artwork.",
      "The project brings digital game shopping, gaming news, and digital gift cards into one cohesive website experience.",
      "Product cards, platform and genre filters, search, wishlist, and cart elements support a familiar e-commerce journey.",
      "A dedicated blog and gift-card page keep commerce and content in the same visual language."
    ],
    features: [
      "Featured-game homepage with purchase-oriented calls to action",
      "Game cards with artwork, prices, discounts, platform marks, and cart controls",
      "Editorial landing page for news, reviews, guides, and popular articles",
      "Gift-card catalog by platform with denominations, ratings, and sorting",
      "Shared navigation, typography, and card system across all three pages"
    ],
    stack: ["E-Commerce website design", "UI/UX", "Information architecture"],
    skills: ["E-Commerce Website Design", "UI/UX Design", "Web Design", "Website Information Architecture", "Digital Product Catalog Design"],
    pdf: "/enp/docs/GAMEHUB_Online_Gaming_Store_Case_Study.pdf"
  },
  "enp-money": {
    title: "MoneyTrack | Personal Finance & Budget Management App",
    summary:
      "A mobile finance concept that makes balances, spending, budgets, and goals readable in one dark-navy and emerald interface.",
    overview: [
      "MoneyTrack is a personal finance app concept designed around a clean, data-driven interface with emerald-green accents and dark navy surfaces.",
      "The design organizes balances, recent transactions, monthly trends, category spending, budgets, and savings goals into an accessible mobile experience.",
      "Quick actions cover adding transactions, transfers, and bills so everyday money tasks stay close at hand.",
      "Charts, progress bars, and goal cards turn financial information into something users can scan and act on."
    ],
    features: [
      "Dashboard for total balance, spending overview, and recent transactions",
      "Analytics with monthly trends and category breakdowns",
      "Budget overview with utilization and category limits",
      "Goal cards for savings and major purchases with progress indicators",
      "Consistent mobile system for dashboard, analytics, budgets, and goals"
    ],
    stack: ["Mobile UI/UX", "FinTech dashboard", "Data visualization"],
    skills: ["Mobile App UI/UX Design", "FinTech Application Design", "Data Visualization", "Dashboard Design", "Mobile Interface Design"],
    pdf: "/enp/docs/MoneyTrack_Finance_Mobile_App_Case_Study.pdf"
  },
  "enp-postai": {
    title: "PostAI | AI Social Media Posting & Automation Dashboard",
    summary:
      "A centralized dashboard for AI content generation, multi-platform publishing, scheduling, and performance analytics.",
    overview: [
      "PostAI is an AI-powered social media management concept that brings content generation, publishing, scheduling, and analytics into one workspace.",
      "The dark dashboard uses blue and purple accents to separate content production, account status, scheduled posts, and engagement metrics.",
      "Connected accounts cover X, Facebook, Instagram, LinkedIn, TikTok, and YouTube, with status indicators and an add-account path.",
      "The workflow is prepare, review, schedule, publish, and measure — without leaving the same interface."
    ],
    features: [
      "Prompt-based AI content generation with tone, format, and media controls",
      "Multi-platform account cards and connection status",
      "Scheduled-post list with dates, previews, destinations, and status",
      "Analytics for volume, reach, engagement, and link clicks",
      "Navigation for create, library, schedule, accounts, analytics, and settings"
    ],
    stack: ["AI integration", "Social APIs", "Dashboard UI", "Workflow automation"],
    skills: ["AI Integration", "Social Media Automation", "API Integration", "Dashboard UI/UX Design", "Workflow Automation"],
    pdf: "/enp/docs/PostAI_Social_Media_Automation_Case_Study.pdf"
  },
  "enp-bidmaster": {
    title: "BidMaster | WordPress & WooCommerce Auction Marketplace",
    summary:
      "A black, white, and gold auction marketplace for unique goods, with listings, bidding cues, and a clear how-it-works path.",
    overview: [
      "BidMaster is an auction website concept for collectibles, luxury watches, jewelry, electronics, antiques, and other unique items.",
      "The design is planned around WordPress and WooCommerce, with auction listings, categories, accounts, and product-detail pages as core parts.",
      "Product cards show current bids, bid counts, remaining time, and featured or ending-soon states so bidding stays time-aware.",
      "A How It Works page walks first-time visitors from registration through discovery, bidding, payment, and delivery."
    ],
    features: [
      "Marketplace homepage with featured auctions and category entry points",
      "Catalog with filters, sorting, current bids, and ending-soon panels",
      "Four-step onboarding: register, discover, bid, and complete the win",
      "Premium black-and-gold identity with image-led product cards",
      "Implementation path for auction deadlines, increments, and winner handling"
    ],
    stack: ["WordPress", "WooCommerce", "Auction listings", "UI/UX"],
    skills: ["WordPress Website Development", "WooCommerce", "E-Commerce Website Design", "UI/UX Design", "Workflow & Functional Design"],
    pdf: "/enp/docs/BidMaster_WordPress_WooCommerce_Auction_Case_Study.pdf"
  },
  "enp-crmhub": {
    title: "CRMHub | REST API Development for Internal CRM Systems",
    summary:
      "An internal CRM and API dashboard that pairs client and deal records with versioned REST endpoints, auth, and health monitoring.",
    overview: [
      "CRMHub demonstrates how client records, sales activity, deal management, and API operations can live in one internal system.",
      "The dashboard shows CRM metrics beside an API documentation panel with HTTP methods, paths, request examples, and JSON responses.",
      "Example endpoints cover listing, creating, retrieving, updating, and deleting clients under a versioned `/api/v1` namespace.",
      "Authentication, role-based permissions, pagination, logging, and service-health indicators are treated as first-class parts of the design."
    ],
    features: [
      "REST endpoints for client resources using GET, POST, PUT, and DELETE",
      "Client table with company, status, last contact, and related deals",
      "Bearer-token authentication example and permission considerations",
      "Inline documentation with cURL and JSON response samples",
      "Monitoring cards and status for API, database, auth, and webhooks"
    ],
    stack: ["REST API", "Backend", "Database design", "API documentation"],
    skills: ["REST API Development", "Backend Development", "API Integration", "Database Design", "System Architecture"],
    pdf: "/enp/docs/CRMHub_REST_API_Case_Study.pdf"
  },
  "enp-lumiere": {
    title: "LUMIÈRE HOME & LIVING | Nuvemshop E-Commerce Storefront",
    summary:
      "A conversion-focused Nuvemshop concept for a home furnishings brand, with homepage, home-decor, and furniture collections.",
    overview: [
      "LUMIÈRE HOME & LIVING is a premium home and lifestyle storefront designed for a Nuvemshop-based shopping experience.",
      "The project combines elegant visual design, intuitive product discovery, organized catalogs, and customer-friendly shopping features.",
      "Warm neutrals, refined type, and lifestyle photography keep the homepage and category pages in one brand.",
      "Category pages for home decor and furniture add filters, sorting, and product cards so customers can move from browsing toward purchase."
    ],
    features: [
      "Homepage hero, category navigation, featured collections, and trust messaging",
      "Home Decor collection with filters for price, color, and material",
      "Furniture collection for sofas, chairs, tables, storage, beds, and outdoor",
      "Consistent product cards with prices, ratings, swatches, and add-to-cart",
      "Storefront planning suited to Nuvemshop customization"
    ],
    stack: ["Nuvemshop", "E-Commerce", "UI/UX", "Category architecture"],
    skills: ["E-Commerce Website Development", "Nuvemshop Store Customization", "UI/UX Design", "Product Catalog & Category Design", "Conversion-Focused Web Design"],
    pdf: "/enp/docs/LUMIERE_Nuvemshop_Ecommerce_Case_Study.pdf"
  },
  "enp-norden": {
    title: "NORDEN Furniture & Living | Catalog Website with WhatsApp",
    summary:
      "A furniture catalog that leads from collection browsing to product questions and custom orders on WhatsApp.",
    overview: [
      "NORDEN Furniture & Living is a premium furniture website concept that makes the catalog the center and WhatsApp the conversation path.",
      "Instead of relying only on a conventional checkout, customers can browse products, ask about availability or customization, and start an order chat.",
      "The homepage presents lifestyle imagery, catalog and WhatsApp calls to action, and previews for sofas, tables, chairs, storage, beds, and decor.",
      "Product-specific inquiry links keep questions attached to the item the customer is looking at."
    ],
    features: [
      "Hero with catalog and WhatsApp calls to action",
      "Image-led catalog for sofas, tables, chairs, storage, beds, and decor",
      "Product-specific WhatsApp inquiry flow",
      "Custom-order path for dimensions, materials, and finishes",
      "Scalable category and product-card structure"
    ],
    stack: ["Website catalog", "WhatsApp Business links", "UI/UX"],
    skills: ["Website & Catalog Development", "UI/UX Design", "WhatsApp Business Integration", "Product Catalog Structuring", "Customer Inquiry Workflow Design"],
    pdf: "/enp/docs/NORDEN_Furniture_WhatsApp_Catalog_Case_Study.pdf"
  },
  "enp-changaya": {
    title: "Changaya | Android App for Japanese Tea & Online Ordering",
    summary:
      "An Android tea-house app concept for menu discovery, product details, and pickup-oriented ordering.",
    overview: [
      "Changaya is a Japanese tea house mobile application concept that brings a traditional tea experience to Android through a refined digital interface.",
      "Customers can explore teas and sweets, view product details, prepare orders, find store information, and see special offers.",
      "Deep green accents, warm wood tones, and product photography communicate authenticity and calm.",
      "The screens cover launch, menu browsing, and a product detail path such as Uji Matcha with quantity and add-to-order."
    ],
    features: [
      "Branded splash and home focused on menu discovery",
      "Digital menu for tea, matcha, hojicha, and traditional sweets",
      "Product detail with description, quantity, and add-to-order",
      "Store hours and profile areas for engagement",
      "Android-oriented touch layout and reusable cards"
    ],
    stack: ["Android", "Mobile UI/UX", "Digital ordering"],
    skills: ["Android App Development", "Mobile UI/UX Design", "E-Commerce & Digital Ordering", "Product Catalog Design", "Mobile App Architecture"],
    pdf: "/enp/docs/Changaya_Android_App_Case_Study.pdf"
  },
  "enp-lumia": {
    title: "LUMIA BEAUTY | Beauty E-Commerce Storefront & Catalog",
    summary:
      "A blush-and-cream beauty store with homepage merchandising, a Body Care catalog, and a brands directory.",
    overview: [
      "LUMIA BEAUTY is a premium beauty storefront for skincare, makeup, haircare, body care, fragrance, and gift sets.",
      "The concept demonstrates three storefront areas: the main shop, a Body Care category page, and a Brands directory.",
      "Warm cream and blush tones, refined type, and product photography build a recognizable retail identity.",
      "Customers can browse by category or by manufacturer, then move toward product comparison and purchase."
    ],
    features: [
      "Homepage hero, category navigation, best-sellers, and trust messaging",
      "Body Care catalog with filters for category, price, and scent",
      "Brands directory with visual brand cards and shop links",
      "Wishlist and cart patterns shared across pages",
      "Foundation for product detail, variants, checkout, and order management"
    ],
    stack: ["E-Commerce storefront", "Catalog architecture", "UI/UX"],
    skills: ["E-Commerce Website Development", "Online Store Customization", "UI/UX Design", "Product Catalog & Category Architecture", "Conversion-Focused Web Design"],
    pdf: "/enp/docs/LUMIA_Beauty_Ecommerce_Case_Study.pdf"
  },
  "enp-motogo": {
    title: "MotoGo | GPS Motorcycle Taxi Mobile App",
    summary:
      "A yellow-and-black ride-hailing concept for booking motorcycle taxis, tracking drivers, and managing trips.",
    overview: [
      "MotoGo is a mobile application concept that modernizes motorcycle taxi services through GPS tracking, streamlined booking, and clear trip management.",
      "Passengers can request rides, locate drivers, monitor journeys, and reach essential trip actions from the phone.",
      "The high-contrast yellow, black, and white system keeps fares, ETAs, and primary actions readable in a fast urban setting.",
      "The interface also leaves room for delivery and larger ride options as the service grows."
    ],
    features: [
      "Live-map concept for driver location, route, and arrival time",
      "Booking flow with ride options, pickup estimates, and fares",
      "Driver profile, ratings, contact, share, and cancel controls",
      "Service categories beyond passenger rides",
      "Safety and payment cues in the passenger journey"
    ],
    stack: ["Mobile UI/UX", "GPS interface", "Booking flow"],
    skills: ["Mobile App UI/UX Design", "GPS-Based Application Interface Design", "User Journey & Booking Flow Design", "Responsive Interface Design", "Product Prototyping"],
    pdf: "/enp/docs/MotoGo_GPS_Motorcycle_Taxi_App_Case_Study.pdf"
  },
  "enp-psx": {
    title: "PSX Reimagined | Retro RPG in Unreal Engine",
    summary:
      "A PlayStation-era visual language rebuilt with Unreal Engine lighting, a harbor town, and a classic RPG HUD.",
    overview: [
      "PSX Reimagined is a retro-inspired 3D RPG concept that combines classic PlayStation-era charm with modern real-time rendering in Unreal Engine.",
      "The featured scene is a fantasy harbor at sunset: a low-poly traveler, docks, ships, lanterns, and a distant castle.",
      "Angular geometry, pixelated textures, and cinematic lighting recreate late-1990s console atmosphere without losing depth.",
      "A compact HUD — level, HP, MP, minimap, and interaction prompt — keeps the retro RPG identity on screen."
    ],
    features: [
      "Low-poly harbor town with medieval architecture and docks",
      "Stylized third-person character integrated into the world",
      "Sunset lighting, lanterns, reflections, and atmospheric depth",
      "Classic RPG HUD with status, minimap, and menu cues",
      "Unreal Engine-oriented environment and presentation direction"
    ],
    stack: ["Unreal Engine", "3D environment", "Game HUD", "Real-time lighting"],
    skills: ["Unreal Engine Game Development", "3D Environment Design", "Retro PSX-Style Visual Development", "Game UI/HUD Design", "Real-Time Lighting & Rendering"],
    pdf: "/enp/docs/PSX_Reimagined_Unreal_Engine_Game_Development_Case_Study.pdf"
  },
  "enp-edumanage": {
    title: "EduManage | Academic Management Platform",
    summary:
      "A school-operations dashboard that gathers students, courses, attendance, schedules, and academic performance in one workspace.",
    overview: [
      "EduManage is an academic management platform concept that centralizes school administration, student information, teaching activity, and communication.",
      "The sample workspace for Riverside International School shows how staff can monitor enrollment, attendance, assignments, exams, and events without switching systems.",
      "A navy sidebar organizes students, teachers, courses, classes, enrollments, attendance, examinations, grades, schedules, communication, library, finance, reports, and settings.",
      "Summary cards and charts keep institutional state visible, then daily schedule and upcoming work sit underneath."
    ],
    features: [
      "Dashboard cards for students, teachers, courses, and attendance",
      "Enrollment trends and academic performance charts",
      "Daily schedule with times, subjects, grades, and rooms",
      "Assignment and examination tracking with due dates and status",
      "Modular navigation for the full academic operation"
    ],
    stack: ["SaaS dashboard", "Web app UI/UX", "Information architecture"],
    skills: ["Academic Management System Design", "Web Application UI/UX Design", "Dashboard & Data Visualization Design", "Information Architecture", "SaaS Product Interface Design"],
    pdf: "/enp/docs/EduManage_Academic_Management_Platform_Case_Study.pdf"
  }
};

export const ENP_RECENT_WORKS = [
  pack(
    "enp-nexora",
    ["React.js", "E-Commerce", "UI/UX"],
    ["/enp/10/1.png", "/enp/10/2.png", "/enp/10/3.png"],
    trio(
      { title: "NEXORA storefront", kicker: "Workana · International", summary: "Home, shop, and lifestyle blog for a dropshipping catalog.", story: "Warm neutrals, product cards, and editorial content in one React storefront.", problem: "Large catalogs lose people between home, shop, and content.", response: "One visual system from hero to filters to the blog." },
      { title: "NEXORA ストア", kicker: "Workana · 国際", summary: "ホーム・ショップ・ブログを一つの生活ブランドの店に。", story: "暖色、商品カード、編集記事をReactの店にまとめました。", problem: "大きなカタログは、ホームと店と記事で人が途切れる。", response: "英雄写真から絞り込み、ブログまで同じ視覚言語に。" },
      { title: "Loja NEXORA", kicker: "Workana · Internacional", summary: "Home, loja e blog de lifestyle num catálogo dropshipping.", story: "Neutros quentes, cards e editorial numa vitrine React.", problem: "Catálogo grande perde gente entre home, loja e conteúdo.", response: "Um sistema visual do hero aos filtros e ao blog." }
    )
  ),
  pack(
    "enp-excel",
    ["Excel", "VBA", "Automation"],
    ["/enp/11/1.png"],
    trio(
      { title: "Excel & VBA automation", kicker: "Workana · International", summary: "Sales workbook, dashboard, and repeatable reports.", story: "Macros, KPI cards, and quick actions turn the sheet into a tool.", problem: "Reporting dies in copy-paste across workbooks.", response: "One dashboard, one import path, a log of the routine." },
      { title: "Excel / VBA 自動化", kicker: "Workana · 国際", summary: "売上ブック、ダッシュボード、繰り返しのレポート。", story: "マクロとKPIとクイック操作で、表を道具にします。", problem: "レポートがブック間のコピーで消える。", response: "一つの台、一つの取込、ルーチンのログ。" },
      { title: "Automação Excel e VBA", kicker: "Workana · Internacional", summary: "Pasta de vendas, dashboard e relatórios repetíveis.", story: "Macros, KPIs e ações rápidas transformam a planilha em ferramenta.", problem: "O relatório morre no copia-e-cola.", response: "Um painel, um import, um log da rotina." }
    )
  ),
  pack(
    "enp-gamehub",
    ["E-Commerce", "UI/UX", "Web Design"],
    ["/enp/12/1.png", "/enp/12/2.png", "/enp/12/3.png"],
    trio(
      { title: "GAMEHUB store", kicker: "Workana · International", summary: "Games, editorial, and gift cards in a dark cinematic shop.", story: "Electric-blue commerce and content share one navigation.", problem: "Game shops and blogs usually feel like two sites.", response: "Store, news, and cards in one visual machine." },
      { title: "GAMEHUB ストア", kicker: "Workana · 国際", summary: "ゲーム、編集、ギフトカードを暗いシネマの店に。", story: "電光の青で、商いと記事を同じナビに。", problem: "ゲーム店とブログが別サイトになりがち。", response: "店、ニュース、カードを一つの機械に。" },
      { title: "Loja GAMEHUB", kicker: "Workana · Internacional", summary: "Jogos, editorial e gift cards numa loja cinematográfica.", story: "Azul elétrico une comércio e conteúdo.", problem: "Loja e blog de games viram dois sites.", response: "Loja, notícia e cards na mesma máquina." }
    )
  ),
  pack(
    "enp-money",
    ["Mobile UI", "FinTech", "Dashboard"],
    ["/enp/13/1.png"],
    trio(
      { title: "MoneyTrack finance app", kicker: "Workana · International", summary: "Balances, budgets, and goals on a mobile board.", story: "Emerald on navy; charts and progress bars do the explaining.", problem: "Money apps hide the next action behind too many numbers.", response: "Balance first, then spend, budget, and a goal card." },
      { title: "MoneyTrack 家計アプリ", kicker: "Workana · 国際", summary: "残高、予算、目標をモバイルの台に。", story: "紺に緑。グラフと進捗が説明する。", problem: "家計アプリは数字の奥に次の操作を隠す。", response: "残高、支出、予算、目標カードの順に。" },
      { title: "App MoneyTrack", kicker: "Workana · Internacional", summary: "Saldos, orçamentos e metas no celular.", story: "Esmeralda no navy; gráficos explicam.", problem: "App de dinheiro esconde a próxima ação.", response: "Saldo, gasto, orçamento e um card de meta." }
    )
  ),
  pack(
    "enp-postai",
    ["AI", "Automation", "API"],
    ["/enp/14/1.png"],
    trio(
      { title: "PostAI social desk", kicker: "Workana · International", summary: "Generate, schedule, publish, and measure from one board.", story: "Accounts, drafts, clocks, and reach sit in the same dark SaaS.", problem: "Social work splits across generators and native apps.", response: "One prompt, many networks, a calendar, a chart." },
      { title: "PostAI 投稿デスク", kicker: "Workana · 国際", summary: "生成、予約、公開、測定を一つの台で。", story: "アカウント、下書き、時計、リーチが同じSaaSに。", problem: "SNSの仕事が生成と公式アプリで割れる。", response: "一つの入力、複数ネット、暦、グラフ。" },
      { title: "Mesa PostAI", kicker: "Workana · Internacional", summary: "Gerar, agendar, publicar e medir num painel.", story: "Contas, rascunhos, relógio e alcance no mesmo SaaS.", problem: "O social se parte entre gerador e app nativo.", response: "Um prompt, várias redes, calendário, gráfico." }
    )
  ),
  pack(
    "enp-bidmaster",
    ["WordPress", "WooCommerce", "UI/UX"],
    ["/enp/15/1.png", "/enp/15/2.png", "/enp/15/3.png"],
    trio(
      { title: "BidMaster auctions", kicker: "Workana · International", summary: "WordPress auction house with bids, time left, and a how-to.", story: "Black and gold; current bid and countdown stay on the card.", problem: "Auctions fail when time and price are hard to read.", response: "Ending-soon, filters, and four steps to the first bid." },
      { title: "BidMaster オークション", kicker: "Workana · 国際", summary: "WordPressの競売。入札、残り時間、始め方。", story: "黒と金。現在値とカウントをカードに残す。", problem: "時間と値が読めないと競売は死ぬ。", response: "終了間近、絞り込み、最初の入札までの四段。" },
      { title: "Leilão BidMaster", kicker: "Workana · Internacional", summary: "Casa de leilão WordPress com lance, tempo e como começar.", story: "Preto e ouro; lance e countdown no card.", problem: "Leilão morre quando tempo e preço não se leem.", response: "Ending soon, filtros e quatro passos ao primeiro lance." }
    )
  ),
  pack(
    "enp-crmhub",
    ["REST API", "Backend", "Architecture"],
    ["/enp/16/1.png"],
    trio(
      { title: "CRMHub REST layer", kicker: "Workana · International", summary: "Clients, deals, and documented /api/v1 endpoints.", story: "Navy dashboard; cURL and JSON sit beside the table.", problem: "Internal CRMs hide the contract the other systems need.", response: "Resources, auth, examples, and health in one view." },
      { title: "CRMHub REST", kicker: "Workana · 国際", summary: "顧客、案件、文書化された /api/v1。", story: "紺の台。cURLとJSONを表の横に。", problem: "社内CRMは、他システムが欲しい契約を隠す。", response: "資源、認証、例、死活を一つの画面に。" },
      { title: "Camada REST CRMHub", kicker: "Workana · Internacional", summary: "Clientes, deals e endpoints /api/v1 documentados.", story: "Painel navy; cURL e JSON ao lado da tabela.", problem: "CRM interno esconde o contrato que os outros sistemas pedem.", response: "Recursos, auth, exemplos e saúde numa vista." }
    )
  ),
  pack(
    "enp-lumiere",
    ["Nuvemshop", "E-Commerce", "UI/UX"],
    ["/enp/17/1.png", "/enp/17/2.png", "/enp/17/3.png"],
    trio(
      { title: "LUMIÈRE Nuvemshop", kicker: "Workana · International", summary: "Home furnishings storefront with decor and furniture rooms.", story: "Warm shop, filters, and cards that stay the same across rooms.", problem: "Category pages that change language break the buy path.", response: "One card, one filter grammar, two collections." },
      { title: "LUMIÈRE Nuvemshop", kicker: "Workana · 国際", summary: "家具店。インテリアと家具の部屋。", story: "暖色の店。部屋が変わってもカードは同じ。", problem: "カテゴリごとに言葉が変わると購入が途切れる。", response: "一つのカード、一つの絞り込み、二つのコレクション。" },
      { title: "LUMIÈRE Nuvemshop", kicker: "Workana · Internacional", summary: "Loja de casa com salas de decor e móveis.", story: "Loja quente; cards iguais nas coleções.", problem: "Categoria que muda a língua quebra a compra.", response: "Um card, uma gramática de filtro, duas coleções." }
    )
  ),
  pack(
    "enp-norden",
    ["Catalog", "WhatsApp", "UI/UX"],
    ["/enp/18/1.png"],
    trio(
      { title: "NORDEN + WhatsApp", kicker: "Workana · International", summary: "Furniture catalog that opens a product chat, not only a cart.", story: "Browse, ask about finish, start a custom order in WhatsApp.", problem: "Furniture buyers need a person before they pay.", response: "Catalog first; WhatsApp on the item they are looking at." },
      { title: "NORDEN + WhatsApp", kicker: "Workana · 国際", summary: "家具カタログ。カートだけでなく商品の会話へ。", story: "見て、仕上げを聞き、WhatsAppで特注を始める。", problem: "家具は払う前に人が要る。", response: "カタログが先。見ている品の上にWhatsApp。" },
      { title: "NORDEN + WhatsApp", kicker: "Workana · Internacional", summary: "Catálogo de móveis que abre conversa, não só o carrinho.", story: "Ver, perguntar o acabamento, iniciar o sob medida no WhatsApp.", problem: "Móvel pede gente antes do pagamento.", response: "Catálogo primeiro; WhatsApp no item que a pessoa olha." }
    )
  ),
  pack(
    "enp-changaya",
    ["Android", "Mobile UI", "Ordering"],
    ["/enp/19/1.png"],
    trio(
      { title: "Changaya tea app", kicker: "Workana · International", summary: "Android tea house: menu, matcha detail, pickup order.", story: "Green and wood; splash, catalog, and Uji Matcha in one hand.", problem: "A tea brand on the phone often looks like a generic cafe.", response: "Atmosphere first, then a short path to add-to-order." },
      { title: "茶がや Android", kicker: "Workana · 国際", summary: "茶屋のアプリ。献立、抹茶、受取注文。", story: "緑と木。起動、献立、宇治抹茶を片手に。", problem: "茶の店が、汎用カフェの見た目になりがち。", response: "空気が先。注文へは短い。" },
      { title: "App Changaya", kicker: "Workana · Internacional", summary: "Casa de chá Android: cardápio, matcha, pedido para retirar.", story: "Verde e madeira; splash, catálogo e Uji Matcha.", problem: "Marca de chá no celular vira café genérico.", response: "Atmosfera primeiro; caminho curto até o pedido." }
    )
  ),
  pack(
    "enp-lumia",
    ["E-Commerce", "UI/UX", "Catalog"],
    ["/enp/20/1.png", "/enp/20/2.png", "/enp/20/3.png"],
    trio(
      { title: "LUMIA BEAUTY shop", kicker: "Workana · International", summary: "Beauty store, Body Care aisle, and a brands wall.", story: "Blush and cream; shop by category or by maker.", problem: "Beauty catalogs drown the path to a single bottle.", response: "Home, a tight aisle, and a directory of houses." },
      { title: "LUMIA BEAUTY", kicker: "Workana · 国際", summary: "美容店、ボディケア、ブランドの壁。", story: "blushとクリーム。カテゴリでもメーカーでも。", problem: "美容カタログは一本の瓶への道を溺らす。", response: "ホーム、細い通路、ブランドの目録。" },
      { title: "Loja LUMIA BEAUTY", kicker: "Workana · Internacional", summary: "Loja de beleza, corredor Body Care e parede de marcas.", story: "Blush e creme; por categoria ou por casa.", problem: "Catálogo de beleza afoga o caminho até um frasco.", response: "Home, um corredor curto e um diretório de marcas." }
    )
  ),
  pack(
    "enp-motogo",
    ["Mobile UI", "GPS", "Booking"],
    ["/enp/21/1.png"],
    trio(
      { title: "MotoGo taxi app", kicker: "Workana · International", summary: "Book a motorcycle taxi, watch the map, manage the trip.", story: "Yellow on black; fare, ETA, and the driver stay large.", problem: "Urban moto apps fail when the map hides the next tap.", response: "Map for status; big buttons for book, call, and cancel." },
      { title: "MotoGo 配車", kicker: "Workana · 国際", summary: "バイクタクシーを呼び、地図を見、行程を扱う。", story: "黒に黄。料金、到着、運転者を大きく。", problem: "地図が次のタップを隠すと、都市の配車は死ぬ。", response: "状態は地図。予約・通話・取消は大きなボタン。" },
      { title: "App MotoGo", kicker: "Workana · Internacional", summary: "Pedir moto táxi, ver o mapa, cuidar da viagem.", story: "Amarelo no preto; tarifa, ETA e motorista grandes.", problem: "App urbano morre quando o mapa esconde o próximo toque.", response: "Mapa para o estado; botões grandes para pedir, ligar e cancelar." }
    )
  ),
  pack(
    "enp-psx",
    ["Unreal Engine", "3D", "Game UI"],
    ["/enp/22/1.png"],
    trio(
      { title: "PSX Reimagined", kicker: "Workana · International", summary: "Harbor RPG scene in Unreal with a classic HUD.", story: "Low poly, sunset, lanterns, a castle — and HP/MP on the glass.", problem: "Nostalgia without readable play information is only a still.", response: "The world is the mood; the HUD is the game." },
      { title: "PSX Reimagined", kicker: "Workana · 国際", summary: "Unrealの港町RPG。古典的なHUD。", story: "ローポリ、夕、灯、城。HP/MPをガラスに。", problem: "懐古だけで、遊ぶ情報が読めなければ静止画。", response: "世界は空気。HUDがゲーム。" },
      { title: "PSX Reimagined", kicker: "Workana · Internacional", summary: "Cena de RPG no porto, Unreal, HUD clássico.", story: "Low poly, pôr do sol, lanternas, castelo — e HP/MP no vidro.", problem: "Nostalgia sem informação jogável é só still.", response: "O mundo é o clima; o HUD é o jogo." }
    )
  ),
  pack(
    "enp-edumanage",
    ["SaaS UI", "Dashboard", "IA"],
    ["/enp/23/1.png"],
    trio(
      { title: "EduManage school OS", kicker: "Workana · International", summary: "Students, courses, attendance, and the day’s timetable in one desk.", story: "Navy sidebar; cards and charts, then assignments and events.", problem: "Schools keep the truth in five tools that do not speak.", response: "One operational view; modules for the rest of the house." },
      { title: "EduManage 学園台", kicker: "Workana · 国際", summary: "生徒、科目、出席、当日の時間割を一つの机に。", story: "紺のサイド。カードとグラフ、課題と行事。", problem: "学校の真実が、話さない五つの道具に散る。", response: "運用の一眼。あとはモジュール。" },
      { title: "EduManage escola", kicker: "Workana · Internacional", summary: "Alunos, cursos, presença e o horário do dia numa mesa.", story: "Sidebar navy; cards, gráficos, tarefas e eventos.", problem: "A escola guarda a verdade em cinco ferramentas mudas.", response: "Uma vista operacional; módulos para o resto da casa." }
    )
  )
];
