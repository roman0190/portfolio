import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roman Howladar | Full Stack Developer",
  description:
    "Roman Howladar is a full-stack developer specializing in modern web technologies including React, Next.js, and Node.js.",
  keywords: [
    "Roman Howladar",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
  ],
  openGraph: {
    title: "Roman Howladar | Full Stack Developer",
    description:
      "Personal portfolio showcasing projects and skills in web development",
    type: "website",
    url: "https://roman0190.github.io/portfolio/",
    images: [
      {
        url: "/image/dum.webp",
        width: 1200,
        height: 630,
        alt: "Roman Howladar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roman Howladar | Full Stack Developer",
    description:
      "Personal portfolio showcasing projects and skills in web development",
    creator: "@roman_howladar",
    images: ["/image/dum.webp"],
  },
  authors: [{ name: "Roman Howladar", url: "https://roman0190.github.io/portfolio/" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allow zooming for accessibility
  minimumScale: 1,
  userScalable: true, // Allow users to zoom
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300 overflow-x-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
