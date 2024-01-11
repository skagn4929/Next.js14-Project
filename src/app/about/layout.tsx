import "../about.css";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <header>This is about header</header>
        {children}
      </body>
    </html>
  );
}
