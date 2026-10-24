function safePdfSrc(value) {
  if (typeof value !== "string") return "";
  if (!value.startsWith("/enp/docs/") || !value.endsWith(".pdf") || value.includes("..")) return "";
  return value;
}

export default async function PdfPage({ searchParams }) {
  const params = await searchParams;
  const src = safePdfSrc(params?.src);
  const name = src ? src.split("/").pop() : "";

  if (!src) {
    return (
      <main className="pdf-page">
        <p className="pdf-page-missing">This PDF is not available.</p>
      </main>
    );
  }

  return (
    <main className="pdf-page">
      <header className="pdf-page-bar">
        <strong>{decodeURIComponent(name)}</strong>
        <a href={src} target="_blank" rel="noreferrer">
          Open original
        </a>
      </header>
      <object title={name} data={`${src}#view=FitH`} type="application/pdf" className="pdf-page-frame">
        <iframe title={name} src={src} className="pdf-page-frame" />
      </object>
    </main>
  );
}
