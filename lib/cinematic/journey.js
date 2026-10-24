import { ENP_RECENT_WORKS } from "./enpRecent";

function pack(id, city, region, skills, images, copy, extra = {}) {
  return { id, city, region, skills, images, copy, ...extra };
}

export const journey = [
  pack(
    "about",
    "origin",
    "japan",
    ["Product thinking", "Full-stack", "UI/UX", "AI", "Systems"],
    ["/images/hideki-developer.jpg", "/cinematic/hideki-guide.jpg"],
    {
      ja: {
        title: "荒木 秀樹",
        kicker: "起点",
        summary: "熊本を拠点に、企画から運用までを一貫して担うフルスタック開発者です。",
        story:
          "2007年からWeb、業務システム、モバイル、AIまで、要件整理・設計・実装・改善を一人でつなぎます。画面の美しさだけでなく、データ、権限、例外、引継ぎまで含めて設計します。非エンジニアの方にも判断できる言葉で進めます。",
        problem: "発注者は「誰に、どこまで任せられるか」が見えにくい。",
        response: "目的と運用から逆算し、小さく始めて伸ばせる形で納品します。"
      },
      en: {
        title: "Araki Hideki",
        kicker: "Origin",
        summary: "A full-stack developer based in Kumamoto, Japan — from brief to operations.",
        story:
          "Since 2007 I have designed and shipped websites, business systems, mobile apps, and AI-assisted workflows. I treat interface, data, permissions, and handover as one design. I explain progress in language a non-engineer can decide on.",
        problem: "Clients often cannot see who will own the whole path — not just a screen.",
        response: "I start from purpose and operations, then deliver in stages that can grow."
      },
      pt: {
        title: "Araki Hideki",
        kicker: "Origem",
        summary: "Desenvolvedor full-stack em Kumamoto, no Japão — do briefing à operação.",
        story:
          "Desde 2007 entrego sites, sistemas de negócio, apps e fluxos com IA. Interface, dados, permissões e transferência entram no mesmo desenho. Explico o progresso em linguagem que um não-engenheiro consegue decidir.",
        problem: "Quem contrata muitas vezes não vê quem cuida do caminho inteiro.",
        response: "Parto do objetivo e da operação, e entrego em etapas que podem crescer."
      }
    }
  ),
  pack(
    "choimite",
    "systems",
    "japan",
    ["WordPress", "JavaScript", "Figma", "Xserver"],
    [
      "/images/portfolio/system/GOLF/choimite-01.png",
      "/images/portfolio/system/GOLF/choimite-02.png",
      "/images/portfolio/system/GOLF/choimite-03.png"
    ],
    {
      ja: {
        title: "チョイミテ — ゴルフ動画コーチング",
        kicker: "公開中のサービス",
        summary: "ショット動画を全国のコーチへ送り、必要なときだけ相談できるWebサービス。",
        story:
          "コーチ検索、プロフィール、動画アップロード（1依頼あたり最大2本）、複数コーチへの相談、決済、追加質問までを一本の流れにしました。月額ではなく都度依頼。動画は一般公開しません。",
        problem: "レッスンの時間と距離。月額では続かない。動画と個人情報を晒したくない。",
        response: "シーン・クラブ・料金・回答時間でコーチを探し、PayPayとカードで都度払いにした。"
      },
      en: {
        title: "Choimite — golf video coaching",
        kicker: "Live product",
        summary: "Golfers send swing videos to coaches across Japan, only when they need advice.",
        story:
          "Search, profile, upload (up to two videos per request), multi-coach consults, payment, and follow-up questions sit on one path. Pay per request, not a subscription. Swing videos stay private.",
        problem: "Lessons cost travel and time. Subscriptions go unused. Footage must not leak.",
        response: "Coaches are found by scene, club, fee, and reply time. Cards and PayPay settle each job."
      },
      pt: {
        title: "Choimite — coaching de golfe por vídeo",
        kicker: "Produto no ar",
        summary: "Golfistas enviam vídeos da tacada a coaches em todo o Japão, só quando precisam.",
        story:
          "Busca, perfil, upload (até dois vídeos por pedido), consulta a vários coaches, pagamento e perguntas extras formam um só fluxo. Pagamento por pedido. Os vídeos não são públicos.",
        problem: "Aula custa deslocamento. Assinatura sobra. A imagem não pode vazar.",
        response: "O coach se encontra por cena, taco, preço e prazo. Cartão e PayPay fecham cada job."
      }
    },
    { url: "https://choimite.jp" }
  ),
  pack(
    "attendance",
    "systems",
    "japan",
    ["Ruby on Rails", "PostgreSQL", "JavaScript", "Figma"],
    ["/images/portfolio/system/register/1.png", "/images/portfolio/system/register/2.png"],
    {
      ja: {
        title: "勤怠管理システム",
        kicker: "業務の中枢",
        summary: "打刻、休暇・残業申請、承認、月次集計を一つの画面体系にまとめた。",
        story:
          "従業員の打刻画面と管理者ダッシュボードを分け、出勤中人数、出勤率、未打刻、承認待ちをカードで見せます。シフトと実績の照合、部署集計まで同じシステムです。",
        problem: "打刻・申請・承認・月次が分断され、漏れが起きやすい。",
        response: "状態を一覧し、権限と申請フローを業務システムとして設計した。"
      },
      en: {
        title: "Attendance & leave system",
        kicker: "Operations core",
        summary: "Clock-in, leave, overtime, approval, and monthly totals in one product.",
        story:
          "Staff punch on a simple screen; managers see who is in, lateness, missing punches, and pending approvals. Shifts, actuals, and department reports share the same data.",
        problem: "Punch, request, approval, and payroll prep lived in different places.",
        response: "I designed status, permissions, and the request flow as one business system."
      },
      pt: {
        title: "Sistema de ponto e férias",
        kicker: "Núcleo operacional",
        summary: "Ponto, férias, hora extra, aprovação e totais do mês em um só produto.",
        story:
          "O colaborador registra o ponto; o gestor vê quem está presente, atrasos, faltas de registro e aprovações. Escala, realizado e relatórios por área compartilham os dados.",
        problem: "Ponto, pedido, aprovação e fechamento viviam separados.",
        response: "Desenhei status, permissões e o fluxo de pedidos como um sistema de negócio."
      }
    }
  ),
  pack(
    "restaurant",
    "systems",
    "japan",
    ["Ruby on Rails", "PostgreSQL", "JavaScript"],
    ["/images/portfolio/system/food%20system/1.png", "/images/portfolio/system/food%20system/2.png"],
    {
      ja: {
        title: "レストラン予約システム",
        kicker: "来店までの一本道",
        summary: "日時・人数・座席・コース・決済までをオンラインで完結。",
        story:
          "電話が取れない時間帯でも席を取れるように、空き状況、個室、コース選択、事前決済、変更・キャンセルを設計しました。店舗側は予約と支払い状況をまとめて見ます。",
        problem: "電話予約は営業時間に縛られ、コースと席の希望が何度も行き違う。",
        response: "希望をフォームに載せ、店舗の予約台帳と決済を同じ流れにした。"
      },
      en: {
        title: "Restaurant reservation system",
        kicker: "One path to the table",
        summary: "Date, party size, seat, course, and payment finish online.",
        story:
          "Guests book when the phone is closed. Availability, private rooms, courses, prepay, and changes sit on one flow. The floor sees bookings and payment state together.",
        problem: "Phone bookings miss after-hours demand and scramble seat versus course.",
        response: "The form captures intent; the book and the payment share the same path."
      },
      pt: {
        title: "Reservas para restaurante",
        kicker: "Um caminho até a mesa",
        summary: "Data, pessoas, assento, menu e pagamento fecham online.",
        story:
          "O cliente reserva mesmo com o telefone fechado. Disponibilidade, salas, menus, pré-pagamento e mudanças ficam no mesmo fluxo. A casa vê reserva e pagamento juntos.",
        problem: "O telefone perde o fora do horário e confunde mesa com menu.",
        response: "O formulário guarda a intenção; agenda e pagamento andam juntos."
      }
    }
  ),
  pack(
    "medireserve",
    "systems",
    "japan",
    ["Ruby on Rails", "PostgreSQL", "JavaScript"],
    [
      "/images/portfolio/system/hospital-system/1.png",
      "/images/portfolio/system/hospital-system/2.png",
      "/images/portfolio/system/hospital-system/3.png"
    ],
    {
      ja: {
        title: "病院予約・オンライン診療",
        kicker: "医療の受付を手前に",
        summary: "診療科・日時・問診・ビデオ診療までを患者が自宅から進められる。",
        story:
          "カレンダー予約に加え、症状・既往・アレルギー・服薬を段階入力する問診、複数医師とのビデオ相談画面を設計。受付と診療前準備の情報を一つにしました。",
        problem: "電話予約と紙の問診が分断され、オンライン診療の情報が画面に乗らない。",
        response: "予約・問診・映像を同一の患者記録に載せ、医療らしい清潔なUIにした。"
      },
      en: {
        title: "Hospital booking & telemedicine",
        kicker: "Reception, moved forward",
        summary: "Department, slot, intake, and video consult from home.",
        story:
          "Patients pick a slot, then complete a staged intake — symptoms, history, allergies, medicines. A multi-physician video layout shares results on the same glass. Front desk and clinicians read one record.",
        problem: "Phone booking and paper intake never met the video call.",
        response: "Booking, intake, and video sit on one chart, with a clinical, calm UI."
      },
      pt: {
        title: "Agenda hospitalar e telemedicina",
        kicker: "A recepção mais perto",
        summary: "Especialidade, horário, anamnese e vídeo a partir de casa.",
        story:
          "O paciente escolhe o horário e preenche a anamnese em etapas. Uma tela de vídeo com mais de um médico mostra exames no mesmo vidro. Recepção e clínico leem o mesmo prontuário.",
        problem: "Telefone e papel não encontravam a chamada de vídeo.",
        response: "Agenda, anamnese e vídeo no mesmo registro, com UI clínica e calma."
      }
    }
  ),
  pack(
    "partsstock",
    "systems",
    "japan",
    ["Ruby on Rails", "PostgreSQL", "JavaScript"],
    [
      "/images/portfolio/system/methin-system/1.png",
      "/images/portfolio/system/methin-system/2.png",
      "/images/portfolio/system/methin-system/3.png"
    ],
    {
      ja: {
        title: "自動車・機械部品の在庫",
        kicker: "現場が足りない前に知る",
        summary: "カテゴリ別在庫、発注点アラート、倉庫ロケーション、仕入先を一元化。",
        story:
          "ギア、ベアリング、ボルトまでをダッシュボードで見渡し、発注点割れを赤で知らせます。保管棚と仕入先企業を結び、不足から発注までの距離を短くしました。",
        problem: "多品種の部品は数量と場所と発注先が散らばり、欠品に遅い。",
        response: "アラート、棚、仕入先を一つの管理画面に束ねた。"
      },
      en: {
        title: "Auto & machine-parts inventory",
        kicker: "Know before the line stops",
        summary: "Category stock, reorder alerts, warehouse bins, and suppliers in one desk.",
        story:
          "Gears, bearings, and fasteners share a dashboard. Below-min stock goes red. Bins and supplier firms are linked so a shortage can become an order without a scavenger hunt.",
        problem: "Variety hides quantity, location, and who to buy from — shortages arrive late.",
        response: "Alerts, shelves, and vendors share one admin."
      },
      pt: {
        title: "Estoque de peças auto e industriais",
        kicker: "Saber antes da linha parar",
        summary: "Estoque por categoria, alerta de reposição, endereço no depósito e fornecedor.",
        story:
          "Engrenagens, rolamentos e parafusos cabem no mesmo painel. Abaixo do mínimo fica vermelho. Prateleira e fornecedor se ligam para a falta virar pedido.",
        problem: "A variedade esconde quantidade, lugar e de quem comprar.",
        response: "Alerta, endereço e fornecedor cabem numa só administração."
      }
    }
  ),
  pack(
    "app-attendance",
    "mobile",
    "japan",
    ["Flutter", "Dart", "Firebase"],
    ["/images/portfolio/app/3/1.png"],
    {
      ja: {
        title: "勤怠アプリ（Flutter）",
        kicker: "ポケットの打刻",
        summary: "出勤・休憩・退勤、カレンダー、申請、月次レポートをスマホで。",
        story:
          "iOSとAndroidを一つのコードで。トップに時刻とステータス、少ない手数で打刻。休暇・残業・在宅の申請とグラフ付きレポートまでを想定して設計しました。",
        problem: "PCに戻らないと勤怠が閉じない現場がある。",
        response: "打刻を最前列に置き、履歴と申請を同じアプリに通した。"
      },
      en: {
        title: "Attendance app (Flutter)",
        kicker: "Punch from a pocket",
        summary: "In/out, breaks, calendar, requests, and monthly charts on a phone.",
        story:
          "One codebase for iOS and Android. Time and status sit on the home screen so a punch is two taps. Leave, overtime, remote work, and graph reports were designed as one loop.",
        problem: "Some floors cannot walk back to a PC to close the day.",
        response: "Punch is front and center; history and requests share the app."
      },
      pt: {
        title: "App de ponto (Flutter)",
        kicker: "Registrar no bolso",
        summary: "Entrada, pausa, saída, calendário, pedidos e gráficos no telefone.",
        story:
          "Um código para iOS e Android. Hora e status na home, ponto em dois toques. Férias, extra, remoto e relatórios com gráfico no mesmo ciclo.",
        problem: "Há chão de trabalho que não volta ao PC para fechar o dia.",
        response: "O ponto vem na frente; histórico e pedidos dividem o app."
      }
    }
  ),
  pack(
    "app-wearable",
    "mobile",
    "japan",
    ["Bluetooth", "Health data", "Mobile UI"],
    ["/images/portfolio/app/8/1.png"],
    {
      ja: {
        title: "ウェアラブル連携の健康アプリ",
        kicker: "数値を物語にする",
        summary: "心拍・活動・睡眠をダッシュボードで追い、生活の見直しを支える。",
        story:
          "デバイス連携、カードとグラフでの可視化、傾向の読み取りまでをコンセプトとして設計。専門知識がなくても変化が見える画面を重視しました。",
        problem: "ウェアラブルの数字は多く、並んでいるだけでは読めない。",
        response: "指標を整理し、同期から振り返りまでの操作を短くした。"
      },
      en: {
        title: "Wearable health companion",
        kicker: "Numbers, as a story",
        summary: "Heart rate, activity, and sleep on a dashboard that invites a second look at the day.",
        story:
          "Bluetooth pairing, card-and-chart visualization, and trend reading were designed as one concept. The UI assumes no clinical vocabulary.",
        problem: "Wearables shout too many figures and hide the shape of a week.",
        response: "I clustered metrics and shortened the path from sync to review."
      },
      pt: {
        title: "Saúde com wearable",
        kicker: "Números com história",
        summary: "Frequência, atividade e sono num painel que convida a rever o dia.",
        story:
          "Pareamento, cartões, gráficos e leitura de tendência no mesmo conceito. A UI não exige vocabulário clínico.",
        problem: "O wearable grita cifras e esconde a forma da semana.",
        response: "Agrupei métricas e encurtei o caminho da sincronização à revisão."
      }
    }
  ),
  pack(
    "app-pharma",
    "mobile",
    "japan",
    ["AI vision", "Camera", "Flutter"],
    ["/images/portfolio/app/12/1.png"],
    {
      ja: {
        title: "お薬識別・服薬管理",
        kicker: "名前が分からない薬",
        summary: "パッケージや錠剤を撮影し、用法とリマインダーへつなぐ。",
        story:
          "画像認識と医薬品情報、服薬スケジュール、履歴を一つの導線に。似た錠剤の誤認を想定し、追加確認へ誘導する設計です。",
        problem: "包装を失うと、用法も飲み忘れも同時に起きる。",
        response: "撮影→候補→注意事項→リマインダーを短くつなぎ、確信が弱いときは人手へ。"
      },
      en: {
        title: "Pill identify & dose tracker",
        kicker: "When the name is missing",
        summary: "Photograph a pack or tablet, then land on directions and reminders.",
        story:
          "Vision, a medicine knowledge base, schedules, and history share one path. Look-alike tablets trigger extra confirmation instead of false confidence.",
        problem: "A lost box loses both the dose and the reminder.",
        response: "Capture → candidates → cautions → reminder, with a human handoff when unsure."
      },
      pt: {
        title: "Identificar remédio e lembrar a dose",
        kicker: "Quando o nome falta",
        summary: "Fotografar a caixa ou o comprimido e chegar à bula e ao alarme.",
        story:
          "Visão, base de medicamentos, agenda e histórico no mesmo caminho. Comprimidos parecidos pedem confirmação extra.",
        problem: "Sem a caixa, somem a dose e o lembrete.",
        response: "Foto → candidatos → cuidados → alarme, com pessoa quando a certeza cai."
      }
    }
  ),
  pack(
    "web-tea",
    "web",
    "japan",
    ["Web design", "Brand", "UI/UX"],
    [
      "/images/portfolio/website/2/1.png",
      "/images/portfolio/website/2/2.png",
      "/images/portfolio/website/2/3.png"
    ],
    {
      ja: {
        title: "日本茶ブランドのオンライン",
        kicker: "一杯の時間",
        summary: "和の静けさと現代の購入導線を、茶の写真でつなぐサイト。",
        story:
          "ファーストビュー、栽培から製品化の工程、香りと品質の四テーマ。縦書きと余白で世界観を先に渡し、そのあと商品へ歩かせます。",
        problem: "茶は味も産地も製法も、画面に並べただけでは届かない。",
        response: "写真と書体で空気を作り、工程と品質で納得させてから買う。"
      },
      en: {
        title: "Japanese tea house on the web",
        kicker: "Time in a cup",
        summary: "Quiet Japanese craft, modern shopping — held together by steam and leaf.",
        story:
          "A first view, farm-to-tin process, and four quality themes. Vertical type and space hand you the world first, then the cart.",
        problem: "Taste, origin, and method do not survive a spec grid.",
        response: "Atmosphere first, process and quality second, purchase last."
      },
      pt: {
        title: "Casa de chá japonês na web",
        kicker: "Tempo numa xícara",
        summary: "O silêncio do ofício e a compra moderna, unidos pela folha.",
        story:
          "Primeira vista, processo do campo à lata, quatro temas de qualidade. A vertical e o vazio entregam o mundo antes do carrinho.",
        problem: "Sabor, origem e método não cabem numa grade de especificação.",
        response: "Primeiro o ar, depois o processo, por último a compra."
      }
    }
  ),
  pack(
    "web-law",
    "web",
    "japan",
    ["Web design", "UI/UX", "Trust"],
    [
      "/images/portfolio/website/4/1.png",
      "/images/portfolio/website/4/2.png",
      "/images/portfolio/website/4/3.png"
    ],
    {
      ja: {
        title: "個人弁護士事務所サイト",
        kicker: "品格と相談しやすさ",
        summary: "ネイビーとゴールドで専門性を出し、声の分類で次の一歩を短くした。",
        story:
          "面談の空気、相続・離婚・交通事故などのレビュー分類、電話とフォームを迷わない位置へ。法律相談の怖さを、情報設計で下げる仕事です。",
        problem: "専門性を出すと近寄りがたく、寄りすぎると軽くなる。",
        response: "色と余白で格を保ち、分野別の声と問い合わせを手前に置いた。"
      },
      en: {
        title: "Solo law-office site",
        kicker: "Dignity, still approachable",
        summary: "Navy and gold for craft; sorted voices so the next step is short.",
        story:
          "The consult room, reviews by inheritance, family, traffic, labor, and a phone/form that does not hide. The job is to lower fear with information design.",
        problem: "Too much gravitas and nobody writes. Too little and nobody trusts.",
        response: "Keep the register, put field-sorted voices and contact in reach."
      },
      pt: {
        title: "Site de escritório individual",
        kicker: "Dignidade, ainda acessível",
        summary: "Azul-marinho e ouro para o ofício; vozes organizadas para o próximo passo ser curto.",
        story:
          "A sala de consulta, relatos por herança, família, trânsito, trabalho, e um telefone/formulário visível. O trabalho é baixar o medo com informação.",
        problem: "Muita gravidade, ninguém escreve. Pouca, ninguém confia.",
        response: "Mantive o registro e trouxe as vozes e o contato para perto."
      }
    }
  ),
  pack(
    "game-rpg",
    "game",
    "japan",
    ["Game UI", "Unity", "Systems"],
    ["/images/portfolio/game/1/1.png", "/images/portfolio/game/1/2.png"],
    {
      ja: {
        title: "戦国アクションRPGの装備UI",
        kicker: "戦闘と店を一つの世界に",
        summary: "HUD、ミニマップ、武器店、性能比較、通貨までを同一のアイコン言語で。",
        story:
          "体力・スタミナ・スキルを戦闘中に読ませ、店ではレア度と価格とプレビューを並べます。情報が多いほど、置かない勇気が要る画面です。",
        problem: "戦闘の情報過多と、店の比較不能は同じ設計の失敗から来る。",
        response: "優先度を分け、戦闘と購買で色と階層を共有した。"
      },
      en: {
        title: "Sengoku action-RPG equipment UI",
        kicker: "Battle and shop, one world",
        summary: "HUD, minimap, armory, stat compare, and coin in one icon language.",
        story:
          "HP, stamina, and skills must be readable mid-fight; the shop must preview rarity and price. The more data, the more courage it takes to omit.",
        problem: "Combat noise and incomparable wares are the same design failure.",
        response: "Split priority, then share color and hierarchy across fight and buy."
      },
      pt: {
        title: "UI de equipamento de action-RPG sengoku",
        kicker: "Combate e loja, um mundo",
        summary: "HUD, minimapa, arsenal, comparação e moeda no mesmo idioma visual.",
        story:
          "HP, stamina e skills precisam ser lidos no combate; a loja precisa mostrar raridade e preço. Quanto mais dado, mais coragem para omitir.",
        problem: "Barulho de luta e item incomparável nascem do mesmo erro.",
        response: "Separei prioridade e compartilhei cor e hierarquia entre lutar e comprar."
      }
    }
  ),
  pack(
    "kintone",
    "intel",
    "japan",
    ["kintone", "JavaScript", "REST API"],
    ["/images/portfolio/python%2C%20excel%20vba/6/1.png"],
    {
      ja: {
        title: "kintone プロジェクト管理",
        kicker: "日本企業の現場に載せる",
        summary: "案件、進捗、担当、資料を一箇所に。権限とカスタマイズまで含めて設計。",
        story:
          "分散した進捗とファイルをkintoneに集め、ステータスと期限を見えるようにします。日本の業務に合わせたフィールド、権限、JSカスタマイズ、API連携が本領です。",
        problem: "案件の真実がチャットと表計算に割れ、確認が仕事になる。",
        response: "レコードとプロセスを業務の言葉で組み、引継ぎできる形にした。"
      },
      en: {
        title: "kintone project hub",
        kicker: "Made for Japanese operations",
        summary: "Jobs, progress, owners, and files in one place — with rights and customization.",
        story:
          "Scattered status and attachments move into kintone so deadlines are visible. Fields, permissions, JS customize, and REST are the actual craft, not a theme.",
        problem: "The truth of a job splits across chat and spreadsheets.",
        response: "Records and processes in the language of the work, ready to hand over."
      },
      pt: {
        title: "Hub de projetos no kintone",
        kicker: "Feito para a operação japonesa",
        summary: "Casos, progresso, responsáveis e arquivos num lugar — com permissão e custom.",
        story:
          "Status e anexos entram no kintone para o prazo aparecer. Campos, permissões, JS e REST são o ofício, não o tema visual.",
        problem: "A verdade do caso parte entre chat e planilha.",
        response: "Registros e processos na língua do trabalho, prontos para passar adiante."
      }
    }
  ),
  pack(
    "enp-cars",
    "world",
    "world",
    ["Flutter", "Dart", "Firebase", "REST"],
    ["/enp/1/1.png"],
    {
      ja: {
        title: "中古車マーケットプレイス",
        kicker: "Workana · 国際",
        summary: "探す・比べる・売る人に連絡・試乗予約までを、iOS/Androidで同じ体験に。",
        story:
          "写真と価格、走行距離、メーカー絞り込み、お気に入り、メッセージ、試乗スケジュール。横断的でメンテしやすいFlutter構成にしました。",
        problem: "車の購入は情報が多く、画面が忙しいと信頼が落ちる。",
        response: "ギャラリーと条件検索を磨き、連絡までの手数を短くした。"
      },
      en: {
        title: "Used-car marketplace app",
        kicker: "Workana · International",
        summary: "Browse, filter, message sellers, and book a test drive on iOS and Android.",
        story:
          "Listings with photos, price, mileage, make/model filters, favorites, in-app contact, and test-drive scheduling. Built as a maintainable Flutter app with Firebase and REST.",
        problem: "Car buying is data-heavy; a busy UI kills trust.",
        response: "I tightened galleries and filters, then shortened the path to the seller."
      },
      pt: {
        title: "Marketplace de seminovos",
        kicker: "Workana · Internacional",
        summary: "Buscar, filtrar, falar com o vendedor e marcar test-drive no iOS e no Android.",
        story:
          "Anúncios com foto, preço, km, filtros, favoritos, mensagem e agenda de test-drive. Flutter sustentável com Firebase e REST.",
        problem: "Comprar carro é dado demais; UI cheia derruba a confiança.",
        response: "Apertei galeria e filtros e encurtei o caminho até o vendedor."
      }
    }
  ),
  pack(
    "enp-piano",
    "world",
    "world",
    ["React", "JavaScript", "CSS3", "UI/UX"],
    ["/enp/2/1.png", "/enp/2/2.png", "/enp/2/3.png"],
    {
      ja: {
        title: "ピアノ店 + 音楽ブログ",
        kicker: "Workana · 国際",
        summary: "グランドからデジタルまでを見せ、記事で愛好家を店に残すReactサイト。",
        story:
          "ショールームの第一印象、カテゴリ、ブランド、編集記事、ニュースレター、声。商品発見とコンテンツを一つの店にしたコンセプトです。",
        problem: "楽器ECはカタログだけだと、音の文化が消える。",
        response: "購入導線の横に編集部を置き、ブランドの格を写真で先に渡した。"
      },
      en: {
        title: "Piano store & music blog",
        kicker: "Workana · International",
        summary: "A React storefront that shows grands to digitals, then keeps readers with essays.",
        story:
          "Showroom first view, categories, brands, editorial, newsletter, and voices. Product discovery and publishing share one house.",
        problem: "Instrument retail that is only a catalog loses the culture of sound.",
        response: "An editorial desk beside the cart, with photography that sets the register."
      },
      pt: {
        title: "Loja de pianos e blog",
        kicker: "Workana · Internacional",
        summary: "Vitrine React do grand ao digital, com textos que fazem o leitor ficar.",
        story:
          "Primeira vista do salão, categorias, marcas, editorial, newsletter e vozes. Descoberta e publicação na mesma casa.",
        problem: "Varejo de instrumento só com catálogo perde a cultura do som.",
        response: "Uma redação ao lado do carrinho, com foto que define o tom."
      }
    }
  ),
  pack(
    "enp-python",
    "world",
    "world",
    ["Python", "REST API", "Automation"],
    ["/enp/3/1.png"],
    {
      ja: {
        title: "Python自動化とAPI連携",
        kicker: "Workana · 国際",
        summary: "手作業の往復を、取得・検証・変換・保存・ログのモジュールに置き換える。",
        story:
          "外部サービスをHTTP/JSONでつなぎ、失敗と再試行を業務として扱います。読むコード、再利用、保守が主眼です。",
        problem: "連携がスクリプトの寄せ集めで、壊れたとき誰も追跡できない。",
        response: "認証、エラー、同期をモジュール化し、実行ログを残す。"
      },
      en: {
        title: "Python automation & REST glue",
        kicker: "Workana · International",
        summary: "Replace shuttle work with fetch, validate, transform, store, and a log.",
        story:
          "External services speak HTTP/JSON. Failures and retries are part of the job, not an afterthought. Readable modules, reuse, and maintenance are the point.",
        problem: "Integrations rot into a pile of scripts nobody can trace when they break.",
        response: "Auth, errors, and sync become modules with an execution log."
      },
      pt: {
        title: "Automação Python e APIs",
        kicker: "Workana · Internacional",
        summary: "Trocar o vai-e-vem manual por buscar, validar, transformar, gravar e log.",
        story:
          "Serviços externos falam HTTP/JSON. Falha e retry fazem parte do ofício. Módulos legíveis e manutenção são o ponto.",
        problem: "Integração vira pilha de script que ninguém rastreia quando quebra.",
        response: "Auth, erro e sync viram módulos com log de execução."
      }
    }
  ),
  pack(
    "enp-rpg",
    "world",
    "world",
    ["Unity 3D", "C#", "Game UI"],
    ["/enp/4/1.png", "/enp/4/2.png"],
    {
      ja: {
        title: "ファンタジーRPG 装備システム",
        kicker: "Workana · 国際",
        summary: "中世の武具店で、見た目・ステータス・スキル・通貨を一つのCanvasに。",
        story:
          "Unity前提の装備UI。武器のレア度、攻撃と会心、スキル石、キャラの見た目更新までを、暗い金属と金のハイライトで読みやすくしました。",
        problem: "3Dの見栄えと、数字の比較が別ゲームになりがち。",
        response: "中央に戦士、周囲に比較。購買の判断が視線の移動だけで済むようにした。"
      },
      en: {
        title: "Fantasy RPG equipment system",
        kicker: "Workana · International",
        summary: "A medieval armory Canvas: look, stats, skills, and coin in one place.",
        story:
          "Unity-facing equipment UI. Rarity, attack and crit, skill stones, and a character preview sit on dark metal with gold hits so comparison is fast.",
        problem: "The 3D hero and the spreadsheet of numbers often feel like two games.",
        response: "Warrior in the center, compare around him — a buy decision in one glance path."
      },
      pt: {
        title: "Sistema de equipamento de RPG",
        kicker: "Workana · Internacional",
        summary: "Ourivesaria medieval em Canvas: visual, atributos, skills e moeda juntos.",
        story:
          "UI de equipamento para Unity. Raridade, ataque, crítico, pedras de skill e preview do herói no metal escuro com ouro, para comparar rápido.",
        problem: "O herói 3D e a planilha de números viram dois jogos.",
        response: "Guerreiro no centro, comparação ao redor — a compra num só olhar."
      }
    }
  ),
  pack(
    "enp-alpine",
    "world",
    "world",
    ["HTML5", "CSS3", "JavaScript"],
    ["/enp/5/1.png", "/enp/5/2.png", "/enp/5/3.png"],
    {
      ja: {
        title: "Alpine Trails 山岳ツーリズム",
        kicker: "Workana · 国際",
        summary: "欧州アルプスの旅、編集記事、登山装備店を一つのブランドに。",
        story:
          "英雄的な山の写真、ガイド記事、バックパックからテントまでの店。自然の色とタイポで、行き先・物語・装備を同じ記憶にします。",
        problem: "観光LP、ブログ、ECが別サイトだと、旅の意思が途切れる。",
        response: "三つの役割を一つの視覚言語でつなぎ、CTAを迷わせない。"
      },
      en: {
        title: "Alpine Trails mountain house",
        kicker: "Workana · International",
        summary: "European alpine travel, editorial, and hiking kit under one brand.",
        story:
          "Hero photography, trail essays, and a shop from packs to tents. Natural color and type keep destination, story, and gear in one memory.",
        problem: "When the LP, the blog, and the shop are three sites, intent dies in the gap.",
        response: "Three roles, one visual language, CTAs that do not hide."
      },
      pt: {
        title: "Alpine Trails — turismo de montanha",
        kicker: "Workana · Internacional",
        summary: "Alpes europeus, editorial e loja de trilha numa só marca.",
        story:
          "Foto-herói, textos de trilha e loja de mochila a barraca. Cor natural e tipo guardam destino, história e equipamento na mesma memória.",
        problem: "LP, blog e loja separados matam a intenção no vão.",
        response: "Três papéis, uma língua visual, CTA à vista."
      }
    }
  ),
  pack(
    "enp-fit",
    "world",
    "world",
    ["WordPress", "HTML5", "CSS3", "JavaScript"],
    ["/enp/6/1.png", "/enp/6/2.png", "/enp/6/3.png"],
    {
      ja: {
        title: "Summit Fit ジムサイト",
        kicker: "Workana · 国際",
        summary: "体験予約へ歩く、暗い基調と強い写真のWordPressコンセプト。",
        story:
          "パーソナルとグループ、トレーナー、施設、ブログ。無料体験と会員のCTAを見失わない情報設計です。運営が記事を足せることを前提にしました。",
        problem: "ジムサイトは熱量の写真で終わり、予約まで届かないことが多い。",
        response: "体験のボタンを常に視界に残し、記事と施設紹介で信頼を足した。"
      },
      en: {
        title: "Summit Fit studio site",
        kicker: "Workana · International",
        summary: "A WordPress concept that walks a visitor to a trial booking.",
        story:
          "Personal and group work, trainers, rooms, blog. Trial and membership CTAs never leave the frame. Editors can keep publishing.",
        problem: "Gym sites often peak at a sweaty photo and never reach a booking.",
        response: "Keep the trial button in sight; let rooms and articles carry trust."
      },
      pt: {
        title: "Site Summit Fit",
        kicker: "Workana · Internacional",
        summary: "Conceito WordPress que leva o visitante até a aula experimental.",
        story:
          "Personal e turma, coaches, salas, blog. CTA de trial e de plano não saem do quadro. A casa consegue seguir publicando.",
        problem: "Site de academia estoura na foto e não chega na reserva.",
        response: "O botão de trial fica à vista; salas e artigos carregam a confiança."
      }
    }
  ),
  pack(
    "enp-optics",
    "world",
    "world",
    ["HTML5", "CSS3", "JavaScript", "UI/UX"],
    ["/enp/7/1.png", "/enp/7/2.png", "/enp/7/3.png"],
    {
      ja: {
        title: "Hikari Optics 光学メーカー",
        kicker: "Workana · 国際",
        summary: "巨大レンズの製造力を、製品と産業別の使いどころと動画庫で見せる。",
        story:
          "天文、半導体、医療、産業。大口径・非球面などの製品群と、応用映像ギャラリー。難しい技術を、第一印象と分類で国際顧客に届けるコーポレートです。",
        problem: "精密光学は説明が論文になり、問い合わせの前に離脱する。",
        response: "英雄写真で能力を示し、用途カードと映像で具体に落とした。"
      },
      en: {
        title: "Hikari Optics corporate",
        kicker: "Workana · International",
        summary: "Giant-lens manufacturing, shown as products, industries, and a film library.",
        story:
          "Astronomy, semiconductors, medical, industrial. Large-diameter and aspheric lines, plus application films. A corporate that carries hard tech to international buyers through first impression and taxonomy.",
        problem: "Precision optics turns into a paper, and the inquiry never starts.",
        response: "Hero photography for capability, then use-case cards and film for the concrete."
      },
      pt: {
        title: "Hikari Optics — site corporativo",
        kicker: "Workana · Internacional",
        summary: "Fabricação de lentes gigantes, em produtos, indústrias e cine-biblioteca.",
        story:
          "Astronomia, semicondutor, médico, industrial. Linhas de grande diâmetro e asférica, mais filmes de aplicação. Um corporativo que leva técnica dura a compradores internacionais.",
        problem: "Óptica de precisão vira paper e o inquiry não começa.",
        response: "Foto-herói para a capacidade; cartões de uso e filme para o concreto."
      }
    }
  ),
  pack(
    "enp-make",
    "world",
    "world",
    ["Make.com", "OpenAI", "API", "Automation"],
    ["/enp/8/1.png"],
    {
      ja: {
        title: "Make.com × AI 業務フロー",
        kicker: "Workana · 国際",
        summary: "リードの受付、AI分類、CRM、メール、Slack、オンボを一本のシナリオに。",
        story:
          "Webhookで受け、条件で分岐し、OpenAIで文面と要約を作り、SheetsとDriveとGmailへ渡す。失敗はリトライとログ。手作業の島を、見える自動化にしました。",
        problem: "営業の最初の一時間が、コピー＆ペーストで消える。",
        response: "ルータとエラー経路を先に引き、人が判断する枝だけを残した。"
      },
      en: {
        title: "Make.com × AI operations",
        kicker: "Workana · International",
        summary: "Lead in, AI classify, CRM, mail, Slack, onboarding — one scenario.",
        story:
          "Webhooks arrive, routers branch, OpenAI writes and summarizes, then Sheets, Drive, and Gmail take over. Failures retry and log. Manual islands become a visible machine.",
        problem: "The first hour of sales dies in copy-paste.",
        response: "Draw routers and error paths first; leave humans only the branches that judge."
      },
      pt: {
        title: "Make.com × IA nas operações",
        kicker: "Workana · Internacional",
        summary: "Lead, classificação com IA, CRM, e-mail, Slack e onboarding num cenário.",
        story:
          "Webhook chega, o roteador ramifica, a OpenAI escreve e resume, Sheets, Drive e Gmail seguem. Falha faz retry e log. Ilhas manuais viram máquina visível.",
        problem: "A primeira hora de vendas morre no copia-e-cola.",
        response: "Desenhei roteadores e erro primeiro; pessoa só fica no galho que julga."
      }
    }
  ),
  pack(
    "enp-lumi",
    "world",
    "world",
    ["Python", "OpenAI", "FastAPI", "Analytics"],
    ["/enp/9/1.png"],
    {
      ja: {
        title: "Lumi — 多言語AIチャットと分析",
        kicker: "Workana · 国際",
        summary: "日英中の顧客応対を自動化し、解決率と満足をダッシュボードで見る。",
        story:
          "よくある問い合わせの自動応答、エスカレーション、会話量・言語分布・FAQ順位。ECや予約業が、応答の質を数字で改善できる形にしました。",
        problem: "チャットを入れても、何が解けて何が残ったかが見えない。",
        response: "会話と分析を同じ製品にし、人へ渡す枝を残した。"
      },
      en: {
        title: "Lumi — multilingual AI support",
        kicker: "Workana · International",
        summary: "Japanese, English, and Chinese support, with resolution and satisfaction on a board.",
        story:
          "Automated answers to common questions, escalation, volume, language mix, and FAQ rank. Built so commerce and booking teams can improve reply quality with numbers.",
        problem: "A chatbot without analytics is a dark room — you cannot see what still needs a human.",
        response: "Conversation and analytics are one product, with a handoff branch kept open."
      },
      pt: {
        title: "Lumi — suporte de IA multilíngue",
        kicker: "Workana · Internacional",
        summary: "Atendimento em japonês, inglês e chinês, com resolução e satisfação no painel.",
        story:
          "Respostas a perguntas comuns, escalonamento, volume, mix de idiomas e ranking de FAQ. Feito para o comércio melhorar a qualidade da resposta com número.",
        problem: "Chatbot sem análise é quarto escuro — não se vê o que ainda pede gente.",
        response: "Conversa e análise no mesmo produto, com o galho de handoff aberto."
      }
    }
  )
];

export const japanWorks = journey.filter((w) => w.region === "japan" && w.id !== "about");
export const worldWorks = [...journey.filter((w) => w.region === "world"), ...ENP_RECENT_WORKS];

export const CITY_TINT = {
  origin: 0x1a2744,
  systems: 0x0d3a6e,
  mobile: 0x0a5d6b,
  web: 0x4a3118,
  game: 0x3a1560,
  intel: 0x0d3b32,
  world: 0x5c2208
};
