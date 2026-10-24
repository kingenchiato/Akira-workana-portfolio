import Clover from "./Clover";
import { profile } from "../lib/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <div className="brand footer-brand">
            <Clover />
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.kana}</small>
            </span>
          </div>
          <p className="footer-lead">
            熊本県山鹿市を拠点に、Web、業務システム、モバイル、AIまで一貫して対応します。
          </p>
          <dl className="contact-list">
            <div>
              <dt>生年月日</dt>
              <dd>{profile.birthday}</dd>
            </div>
          </dl>
          <p className="fine">
            メールアドレスと電話番号は、公開用の連絡先が決まり次第この欄に追加します。
          </p>
        </div>
        <video
          className="footer-video"
          src="/video/v2_awv-9a50cc6287d13600.mp4"
          controls
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="制作動画"
        />
      </div>
      <p className="copyright">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
}
