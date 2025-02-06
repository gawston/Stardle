import "./globals.css";

export const metadata = {
  title: "Stardel",
  description: "Honkai: Star Rail Wordle",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
