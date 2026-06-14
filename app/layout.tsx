import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CuraRelief Skin Coach Diary",
  description: "Track your 14-day skin barrier recovery progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", backgroundColor: "#f9f9f9" }}>
        {children}
      </body>
    </html>
  );
}
