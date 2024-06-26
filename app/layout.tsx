import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tip4.us - Share Tips for Us",
  description: "A web blog dedicated to sharing valuable tips and insights on various topics including Python, Java, and more.",
  keywords: ["tips", "blog", "Python", "Java", "programming", "web development"],
  // authors: [{ name: "Your Name" }],
  // creator: "Your Name or Organization",
  // publisher: "Your Name or Organization",
  openGraph: {
    title: "tip4.us - Share Tips for Us",
    description: "Discover and share valuable tips on programming, technology, and more.",
    // url: "https://tip4.us",
    siteName: "tip4.us",
    // images: [
    //   {
    //     url: "https://tip4.us/images/og-image.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "tip4.us Open Graph Image",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "tip4.us - Share Tips for Us",
  //   description: "Discover and share valuable tips on programming, technology, and more.",
  //   creator: "@YourTwitterHandle",
  //   images: ["https://tip4.us/images/twitter-image.jpg"],
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}