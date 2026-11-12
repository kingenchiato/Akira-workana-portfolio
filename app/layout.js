import { Newsreader, Outfit } from "next/font/google";
import Shell from "../components/site/Shell";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata = {
  title: "Araki Hideki",
  description:
    "Portfolio of Araki Hideki, a full-stack developer in Kumamoto. Business systems, web and mobile products, APIs, and automation since 2007.",
  icons: { icon: "/favicon.svg" }
};

const boot = `try{var t=localStorage.getItem("ah-theme");if(t==="snow"){t="harbor";localStorage.setItem("ah-theme","harbor");}var ok=["harbor","pine","sand","dusk"];if(ok.indexOf(t)>=0)document.documentElement.dataset.theme=t;var z=localStorage.getItem("ah-zoom");if(z)document.documentElement.style.setProperty("--read",z);}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="harbor" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
