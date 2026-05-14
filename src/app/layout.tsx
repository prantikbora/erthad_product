import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Configure Poppins. It requires explicit weights.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Erthad",
    default: "Erthad | Premium 3D Custom NFC Business Cards",
  },
  description: "Upgrade your networking with Erthad custom NFC business cards. A high-tech, premium contactless networking experience with 3D animated previews.",
  keywords: [
    "NFC business cards", 
    "custom NFC cards", 
    "smart business cards", 
    "digital business card", 
    "Erthad Pvt Ltd", 
    "contactless networking",
    "premium NFC",
    "3D NFC preview",
    "tech product"
  ],
  openGraph: {
    title: "Erthad | Premium 3D Custom NFC Business Cards",
    description: "Upgrade your networking with Erthad custom NFC business cards. A high-tech, premium contactless networking experience.",
    url: "https://www.erthad.com", 
    siteName: "Erthad",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Erthad 3D NFC Cards",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erthad | Premium 3D Custom NFC Business Cards",
    description: "Tap to share your contact details instantly with Erthad's premium custom NFC cards.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}