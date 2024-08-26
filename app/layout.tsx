import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import '../styles.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
