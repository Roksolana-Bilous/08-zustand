import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes efficiently",
  openGraph: {
      title: "NoteHub",
      description:"Manage your notes efficiently",
      url: `https://notehub.com/notes/`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt:"NoteHub title",
        },
    ],
      type: 'article',
    },
};

export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <Toaster position="top-right" />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}