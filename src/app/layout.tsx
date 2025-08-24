import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const adumu = localFont({
  src: "../fonts/Adumu.ttf",
  variable: "--font-adumu",
});

export const metadata: Metadata = {
  title: "Second Turn Games",
  description: "Give your games a second life - Buy and sell used board games in the Baltics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} ${adumu.variable}`}>
        <body className="bg-light-beige text-dark-green font-sans min-h-screen">
          <header className="border-b border-dark-green/10">
            <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
              {/* Logo / Brand */}
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-display">Second Turn</span>
                <span className="hidden md:inline text-sm text-dark-green/70">Give your games a second life</span>
              </div>

              {/* Auth controls */}
              <nav className="flex items-center gap-3">
                <SignedOut>
                  <SignInButton>
                    <button className="px-4 py-2 rounded-2xl border border-dark-green text-dark-green hover:bg-dark-green hover:text-white transition">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-4 py-2 rounded-2xl bg-vibrant-orange text-white hover:opacity-90 transition">
                      Join
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <a href="/sell" className="px-4 py-2 rounded-2xl bg-vibrant-orange text-white hover:opacity-90 transition">
                    + List a Game
                  </a>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
