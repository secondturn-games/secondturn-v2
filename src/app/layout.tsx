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
                            <header className="border-b border-dark-green/10 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                    <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
                      {/* Logo / Brand */}
                      <div className="flex items-center gap-3 group">
                        <div className="relative">
                          <span className="text-2xl md:text-3xl font-display text-dark-green-600 group-hover:text-vibrant-orange-600 transition-colors duration-300">
                            Second Turn
                          </span>
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-vibrant-orange-500 to-warm-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>
                        <span className="hidden md:inline text-sm text-dark-green-500 group-hover:text-dark-green-600 transition-colors duration-300">
                          Give your games a second life
                        </span>
                      </div>

                      {/* Navigation Links */}
                      <nav className="hidden md:flex items-center gap-6">
                        <a href="/" className="text-dark-green-600 hover:text-vibrant-orange-600 font-medium transition-colors duration-200 relative group">
                          Browse Games
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vibrant-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                        </a>
                        <a href="/sell" className="text-dark-green-600 hover:text-vibrant-orange-600 font-medium transition-colors duration-200 relative group">
                          Sell a Game
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vibrant-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                        </a>
                        <a href="/profile" className="text-dark-green-600 hover:text-vibrant-orange-600 font-medium transition-colors duration-200 relative group">
                          Profile
                          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-vibrant-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                        </a>
                      </nav>

                      {/* Auth controls */}
                      <div className="flex items-center gap-3">
                        <SignedOut>
                          <SignInButton>
                            <button className="px-4 py-2 rounded-2xl border-2 border-dark-green-300 text-dark-green-600 hover:bg-dark-green-50 hover:border-dark-green-400 hover:text-dark-green-700 transition-all duration-200 hover:scale-105">
                              Sign in
                            </button>
                          </SignInButton>
                          <SignUpButton>
                            <button className="px-4 py-2 rounded-2xl bg-vibrant-orange-500 text-white hover:bg-vibrant-orange-600 transition-all duration-200 hover:scale-105 shadow-soft hover:shadow-medium">
                              Join
                            </button>
                          </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                          <a href="/sell" className="px-4 py-2 rounded-2xl bg-vibrant-orange-500 text-white hover:bg-vibrant-orange-600 transition-all duration-200 hover:scale-105 shadow-soft hover:shadow-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            List a Game
                          </a>
                          <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                      </div>
                    </div>
                  </header>

          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
