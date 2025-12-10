import './globals.css';
import type { Metadata } from 'next';
import localFont from "next/font/local";
import Link from 'next/link';

const inter = localFont({
  src: "../public/fonts/InterVariable.ttf",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'StreamFlix - Crypto Subscriptions Demo',
  description: 'Demo merchant website showcasing Eventop on-chain subscriptions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="bg-black/50 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            Stream<span className="text-purple-400">Flix</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-gray-300 hover:text-white transition">
              Pricing
            </Link>
            <Link href="/how-it-works" className="text-gray-300 hover:text-white transition">
              How It Works
            </Link>
            <Link href="/account" className="text-gray-300 hover:text-white transition">
              Account
            </Link>
          </nav>

          <Link
            href="/pricing"
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Stream<span className="text-purple-400">Flix</span>
            </h3>
            <p className="text-gray-400">
              Demo merchant website showcasing on-chain subscriptions powered by Eventop.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="https://docs.eventop.xyz" target="_blank" className="text-gray-400 hover:text-white transition">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Powered By</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://eventop.xyz" target="_blank" className="text-gray-400 hover:text-white transition">
                  Eventop Protocol
                </a>
              </li>
              <li>
                <a href="https://solana.com" target="_blank" className="text-gray-400 hover:text-white transition">
                  Solana Blockchain
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-400">
          <p>
            © 2024 StreamFlix Demo. This is a demonstration website for Eventop on-chain subscriptions.
          </p>
          <p className="mt-2 text-sm">
            Testing on Solana Devnet • Not a real streaming service
          </p>
        </div>
      </div>
    </footer>
  );
}