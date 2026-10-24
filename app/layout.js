import "./globals.css";

export const metadata = {
  title: "Araki Hideki · 荒木 秀樹",
  description:
    "Cinematic portfolio of Araki Hideki — full-stack work from Japan and international projects for Workana.",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="main">{children}</div>
      </body>
    </html>
  );
}
