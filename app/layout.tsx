import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aura Studio | Premium 3D Showcase",
  description: "Experience the future of fashion in 3D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
