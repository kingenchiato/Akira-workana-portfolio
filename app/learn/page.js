import Link from "next/link";
import { Bars, Mark } from "../../components/StudyBits";

export const metadata = { title: "学び" };

const toc = [
  ["html", "HTML / CSS"],
  ["js", "JavaScript"],
  ["wp", "WordPress"],
  ["figma", "Figma"],
  ["flutter", "Flutter"],
  ["ops", "業務システム"],
  ["api", "REST API"],
  ["db", "データベース"],
  ["pay", "決済・通知"],
  ["ai", "AI・LLM"],
  ["kintone", "kintone"],
  ["git", "Git / GitHub"]
];

export default function LearnPage() {
  return (
    <main className="below-hero sheet-page">
      <section className="panel sheet-wide">
        <div className="section-head sheet-top">
          <p className="eyebrow">学び</p>
          <h1>発注の前に、道具の名前を仕事の話へ戻す</h1>
          <p>
            プロフィールに書いてある技術を、画面の向こう側の作業に引き戻して説明します。定義の暗記ではなく、「この道具を入れると、月曜の朝のどの作業が減るか」が分かれば十分です。数値を出している箇所は、出典と日付をその場に置いています。
          </p>
        </div>
        <nav className="toc-row" aria-label="技術の目次">
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <article className="glass stack-block" id="html">
          <div className="stack-head"><Mark name="html" /><h2>HTML と CSS</h2></div>
          <div className="study-grid">
            <div>
              <p>
                HTML は中身の名前です。見出し、本文、料金表、問い合わせボタン。CSS はその並びと色です。メニュー表の品名が HTML で、紙の余白と文字の大きさが CSS、という分け方で足ります。
              </p>
              <p>
                レスポンシブは、店の机が狭いときに品書きを縦へ倒すことです。パソコンでは3列の料金、電話では1列。中身は同じです。別サイトを二つつくる話ではありません。
              </p>
              <p className="note-aside">
                見た目だけ先に決めて、項目名が後から増えると、表がはみ出します。最初に「電話番号は何桁か」「料金は税込か」を決めた方が、CSS のやり直しは少ないです。
              </p>
            </div>
            <table className="study-table">
              <thead>
                <tr><th>担当</th><th>予約サイトでの例</th></tr>
              </thead>
              <tbody>
                <tr><td>HTML</td><td>日付、コース名、残席、「予約する」</td></tr>
                <tr><td>CSS</td><td>残席が少ないときの色、電話ではボタンを画面幅いっぱいにする</td></tr>
                <tr><td>両方ないと</td><td>パソコンでは読めて、現場のスマホではボタンが画面の外に出る</td></tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="glass stack-block" id="js">
          <div className="stack-head"><Mark name="js" /><h2>JavaScript</h2></div>
          <p>
            ページを開いたあとで動く係です。HTML が貼り紙、JavaScript が「この欄、空のまま送らないでください」と止める人です。
          </p>
          <p>
            よくある場面は、予約フォームです。日付が過去、人数が0、電話番号が桁不足。送信前にその場で知らせる。サーバに届いてからエラーを返すだけでも正しいのですが、入力した人は「押したのに何も起きない」と感じます。
          </p>
          <p>
            もう一つは、画面を切り替えずに一覧を絞り込むことです。スタッフ名で予約表を探す、在庫の色だけ残す。ページ全体を読み直すと、入力途中のメモが消えます。
          </p>
          <p className="note-aside">
            JavaScript は便利なぶん、止めすぎると困ります。確認のポップアップを三重に出すと、現場は「はい」を押すだけになります。止めるのは、戻すのが面倒な操作に限った方がいいです。
          </p>
        </article>

        <article className="glass stack-block" id="wp">
          <div className="stack-head"><Mark name="wp" /><h2>WordPress</h2></div>
          <div className="study-grid">
            <div>
              <p>
                記事や固定ページを、開発者以外が直せる棚です。お知らせ、メニュー、採用情報。更新の担当が社内にいるなら、最初の候補になります。
              </p>
              <p>
                W3Techs が2026年10月14日に出している数字では、WordPress は調査対象サイトの40.0%で使われ、CMS が分かっているサイトに限ると58.5%です。Shopify は全サイトの5.4%、Wix は4.2%。「サイトの標準が WordPress」という現場感覚は、この偏りから来ています。
              </p>
              <p>
                プラグインは後付けの引き出しです。問い合わせ、予約、ネットショップ。引き出しを増やしすぎると、更新のたびにどれかが壊れます。必要な引き出しだけにする、が運用の本体です。
              </p>
            </div>
            <Bars
              caption="W3Techs、2026年10月14日。全サイトに占める割合"
              rows={[
                { label: "WordPress", width: 100, value: "40.0%" },
                { label: "Shopify", width: 13.5, value: "5.4%" },
                { label: "Wix", width: 10.5, value: "4.2%" },
                { label: "CMSなし", width: 79, value: "31.6%" }
              ]}
            />
          </div>
          <p className="note-aside">
            在庫の引き当てや複雑な権限が本体の仕事なら、WordPress は表紙にして、計算は別の仕組みに置いた方が長持ちします。全部をプラグインで足すと、三年後に誰も中身を説明できなくなります。
          </p>
        </article>

        <article className="glass stack-block" id="figma">
          <div className="stack-head"><Mark name="figma" /><h2>Figma</h2></div>
          <p>
            実装の前に、画面を紙の代わりに並べる場所です。ボタンの位置、項目の抜け、スマホで親指が届くかを、コードを書く前に見ます。
          </p>
          <table className="study-table">
            <thead>
              <tr><th>Figma で決めること</th><th>Figma では終わらないこと</th></tr>
            </thead>
            <tbody>
              <tr><td>項目の順番、文言、空のときの表示</td><td>実際の在庫や権限で、その項目が本当に出せるか</td></tr>
              <tr><td>関係者のコメントを同じ画面に残す</td><td>公開後の更新手順</td></tr>
              <tr><td>パソコンとスマホの並び</td><td>遅い回線での待ち時間</td></tr>
            </tbody>
          </table>
          <p>
            コメントがチャットに散らばると、「どの案が最新か」で一日使います。画面の横に「このボタンは店長だけ」と書いておくと、実装の質問が減ります。
          </p>
        </article>

        <article className="glass stack-block" id="flutter">
          <div className="stack-head"><Mark name="flutter" /><h2>Flutter（iOS / Android）</h2></div>
          <div className="study-grid">
            <div>
              <p>
                一つのプログラムから、iPhone 用と Android 用のアプリを出します。勤怠のように、現場が自分の電話で打刻する仕事に向きます。店の共有スマホ一台、という運用でも使えます。
              </p>
              <p>
                同じ見た目でも、通知の許可、写真の保存、戻るボタンの位置は OS で違います。そこを片方だけで試すと、もう片方の初日に止まります。
              </p>
              <p>
                ストアの審査もあります。社内だけで配る方法と、誰でも入れられる公開は、手続きが別です。勤怠なら社内配布で足りることが多いです。
              </p>
            </div>
            <figure className="shot">
              <img src="/images/project-attendance.jpg" alt="" />
              <figcaption>勤怠アプリの説明用画像です。実在の納品画面の写真ではありません。</figcaption>
            </figure>
          </div>
        </article>

        <article className="glass stack-block" id="ops">
          <div className="stack-head"><Mark name="db" /><h2>業務システム</h2></div>
          <p>
            予約、顧客、勤怠、管理画面。名前は違っても、やっていることは「紙や表計算で二人が同じマスを触っている」のをやめることです。
          </p>
          <table className="study-table">
            <thead>
              <tr><th>台帳</th><th>紙のままだと起きること</th><th>画面で先に決めること</th></tr>
            </thead>
            <tbody>
              <tr><td>予約</td><td>同じ枠に二人入れる</td><td>枠を押さえた瞬間に、他の人へは満席と出す</td></tr>
              <tr><td>顧客</td><td>電話番号が二行に分かれる</td><td>同じ番号は一人にまとめる</td></tr>
              <tr><td>勤怠</td><td>打刻の直しが口頭</td><td>誰が、いつ、理由つきで直したかを残す</td></tr>
              <tr><td>管理画面</td><td>店長とアルバイトが同じ権限</td><td>売上と個人情報は、見る人を分ける</td></tr>
            </tbody>
          </table>
          <p>
            CRM は顧客台帳の少し欲張った呼び方です。検索、メモ、前回何を買ったか。そこまでで足りる会社は多いです。営業の点数管理まで最初から入れると、入力されずに終わります。
          </p>
        </article>

        <article className="glass stack-block" id="api">
          <div className="stack-head"><Mark name="api" /><h2>REST API</h2></div>
          <p>
            厨房とホールが、伝票で注文を渡すやり方です。画面と画面が、決まった用紙（住所と項目）でデータを渡します。人がコピペする隙間を減らすためのものです。
          </p>
          <table className="study-table">
            <thead>
              <tr><th>伝票の種類</th><th>予約の例</th><th>失敗したとき</th></tr>
            </thead>
            <tbody>
              <tr><td>取得</td><td>明日の空席を聞く</td><td>空席なのに「不明」と出る。再試行か、窓口へ回すかを決めておく</td></tr>
              <tr><td>登録</td><td>予約を1件書く</td><td>二度押して2件入る。一度だけ通す工夫が要る</td></tr>
              <tr><td>更新</td><td>人数を変える</td><td>古い画面の内容で新しい予約を上書きしない</td></tr>
              <tr><td>削除</td><td>キャンセル</td><td>消したあとに領収の記録まで消えないようにする</td></tr>
            </tbody>
          </table>
          <p className="note-aside">
            API は魔法の連携ではありません。相手のサービスが止まった夜に、予約を紙で受けるかどうか。そこを決めてない連携は、本番の初日に止まります。
          </p>
        </article>

        <article className="glass stack-block" id="db">
          <div className="stack-head"><Mark name="db" /><h2>データベース</h2></div>
          <p>
            台帳の本体です。表計算との違いは、同じ顧客を二箇所に書かないことです。予約の行には顧客番号だけ置き、名前や電話は顧客の側に一回だけ書きます。電話番号が変わったとき、予約を全部開かずに済みます。
          </p>
          <p>
            バックアップは「昨夜の台帳が引き出しにある」状態です。更新の直前に無いと、誤って消した日の復旧ができません。検証環境は、本番の台帳を触らずに試す別冊です。この二つが無いシステムは、修正のたびに本番で賭けをします。
          </p>
        </article>

        <article className="glass stack-block" id="pay">
          <div className="stack-head"><Mark name="pay" /><h2>決済と通知</h2></div>
          <div className="study-grid">
            <div>
              <p>
                カード番号の処理は、決済会社の窓口に任せます。自社のデータベースに番号を置きません。置くと、漏れたときの範囲が予約台帳ごとになります。
              </p>
              <p>
                通知は、予約の成立、前日、キャンセルをメールやショートメッセージで出す係です。文面と、送らなくていい人（スタッフのテスト予約）を先に決めます。テストのたびに客へ飛ぶ通知は、信頼を一気に減らします。
              </p>
            </div>
            <figure className="shot">
              <img src="/images/project-ec.jpg" alt="" />
              <figcaption>外部サービス連携の説明用画像です。特定の店舗の画面ではありません。</figcaption>
            </figure>
          </div>
        </article>

        <article className="glass stack-block" id="ai">
          <div className="stack-head"><Mark name="ai" /><h2>AI・LLM と RAG</h2></div>
          <p>
            文章を読んで、抜き出す、短くする、仕分ける、下書きする。これが今の使い方の中心です。社内の規程や過去の見積を渡して、その範囲で答えさせるやり方を RAG と呼びます。インターネット全体の記憶で答えさせるのとは違います。
          </p>
          <table className="study-table">
            <thead>
              <tr><th>作業</th><th>向く例</th><th>人が見ること</th></tr>
            </thead>
            <tbody>
              <tr><td>抽出</td><td>請求書の PDF から日付と金額</td><td>桁と税区分</td></tr>
              <tr><td>要約</td><td>長い議事の要点</td><td>決まっていないことを、決まったことと書いていないか</td></tr>
              <tr><td>分類</td><td>問い合わせを「予約」「苦情」「採用」へ</td><td>境界のあいまいな文</td></tr>
              <tr><td>検索つき回答</td><td>自社マニュアルの中だけを見て答える</td><td>マニュアルに無い質問を、それっぽく埋めていないか</td></tr>
            </tbody>
          </table>
          <p>
            IPA「DX動向2026」（2025年度の調査）では、AI を導入した企業の効果として「業務が効率化したり迅速化した」が91.6%です。一方で「売上や利益が向上した」は3.9%です。社内の手間は減りやすく、売上の話はまだ別、という調査結果です。導入の説明を売上の約束から始めると、三か月後に話が合わなくなります。
          </p>
          <p className="note-aside">
            参照してよい資料と、入れてはいけない資料（顧客の個人情報、未公開の価格）を分けるのが、モデルを選ぶより先です。
          </p>
        </article>

        <article className="glass stack-block" id="kintone">
          <div className="stack-head"><Mark name="kintone" /><h2>kintone</h2></div>
          <p>
            サイボウズの、業務アプリを自分たちで組めるサービスです。項目（フィールド）、1件の記録（レコード）、誰が見て誰が直せるか（権限）を、アプリごとに持ちます。日本の会社で、表計算の隣に置かれていることが多い棚です。
          </p>
          <p>
            標準の入力フォームで足りるなら、そこで止めます。足りないときだけ JavaScript で画面を足し、他システムとは REST API でつなぎます。最初から全部をカスタマイズすると、担当が辞めたあとに直せなくなります。
          </p>
          <table className="study-table">
            <thead>
              <tr><th>棚のまま</th><th>手を入れる</th></tr>
            </thead>
            <tbody>
              <tr><td>日報、備品、簡単な顧客メモ</td><td>他の予約システムと在庫を同時に動かす</td></tr>
              <tr><td>部署ごとの閲覧制限</td><td>入力の途中で外部の料金を引いてくる</td></tr>
            </tbody>
          </table>
        </article>

        <article className="glass stack-block" id="git">
          <div className="stack-head"><Mark name="git" /><h2>Git と GitHub</h2></div>
          <p>
            プログラムの変更履歴です。「火曜の夕方、料金の計算を誰が変えたか」を残せます。GitHub は、その履歴を複数人で置く場所です。コメント付きで直して、問題なければ本番側へ合流させます。
          </p>
          <p>
            発注側が見るべきなのは、画面の差分だけではありません。検証環境で一度見てから本番へ出しているか。バックアップはあるか。引継ぎのとき、履歴が個人のパソコンにしか無いと、そこで切れます。
          </p>
        </article>

        <div className="section-head sheet-next">
          <p className="eyebrow">一つの仕事に戻す</p>
          <h2>予約サイトを頼むとき、道具はこう分かれます</h2>
        </div>
        <table className="study-table">
          <thead>
            <tr><th>順番</th><th>道具</th><th>決めること</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Figma</td><td>項目と、スマホでの並び</td></tr>
            <tr><td>2</td><td>HTML / CSS / JavaScript</td><td>客が見る画面と、空欄の止め方</td></tr>
            <tr><td>3</td><td>WordPress か専用の画面</td><td>誰がお知らせを更新するか</td></tr>
            <tr><td>4</td><td>データベースと API</td><td>二重予約をどう止めるか</td></tr>
            <tr><td>5</td><td>kintone など既存の棚</td><td>社内の台帳を新しく作り直す必要があるか</td></tr>
            <tr><td>6</td><td>決済・通知</td><td>カード番号を自社に置かない。テスト予約を客へ送らない</td></tr>
            <tr><td>7</td><td>Git</td><td>直した理由が残るか</td></tr>
          </tbody>
        </table>
        <p className="source-list">
          出典: <a href="https://w3techs.com/technologies/overview/content_management">W3Techs, Usage of content management systems, 14 October 2026</a>
          。AI の効果は <a href="https://www.ipa.go.jp/digital/chousa/dx-trend/rcu1hd0000017uk8-att/dx-trend-2026.pdf">IPA「DX動向2026」図表3-14</a>（2025年度調査）。
          業界側の人数と予算の話は <Link href="/knowledge">一般知識</Link> に分けてあります。
        </p>
        <p className="more-link"><Link href="/skills">スキルシートを見る</Link></p>
      </section>
    </main>
  );
}
