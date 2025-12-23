import "./globals.css";
import Navbar from "./components/Navbar";
import ProgressBar from "./components/ProgressBar";

export const metadata = {
  title: "Brunson's World",
  description: "Algorithm engineer | Optimization + Machine Learning Explorer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-16" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <Navbar />
        <ProgressBar />
        {children}
      </body>
    </html>
  );
}