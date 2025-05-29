import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Roman Howladar | Full Stack Developer",
  description:
    "Roman Howladar is a full-stack developer experienced in React, Next.js, and Node.js. Explore projects, skills, and more.",
  keywords: [
    "Roman Howladar",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
    "JavaScript",
    "Node.js",
  ],
  openGraph: {
    title: "Roman Howladar | Full Stack Developer",
    description:
      "Explore Roman Howladar's portfolio featuring web development projects with React, Next.js, and more.",
    type: "website",
    url: "https://roman0190.github.io/portfolio/",
    images: [
      {
        url: "https://roman0190.github.io/portfolio/image/dum.webp",
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
      "Web developer portfolio showcasing React, Next.js, and Node.js skills.",
    creator: "@roman_howladar",
    images: ["/image/dum.webp"],
  },
  authors: [
    { name: "Roman Howladar", url: "https://roman0190.github.io/portfolio/" },
  ],
  robots: {
    index: true,
    follow: true,
  },
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
      <Head>
        <meta
          name="google-site-verification"
          content="xrRdGAAImZwEJWV3NtTDOa-XYWHC7qU6_M22OmNAYcY"
        />
      </Head>
      <body
        className={`${inter.className} bg-white dark:bg-[#121212] text-black dark:text-white transition-colors duration-300 overflow-x-hidden`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
