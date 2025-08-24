"use client";

import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser();
  
  return (
    <section className="space-y-6">
                    <SignedOut>
                <div className="text-center py-12">
                  <h1 className="text-2xl font-display font-semibold mb-4">My Profile</h1>
                  <p className="text-dark-green/80 mb-6">
                    Please sign in to view your profile.
                  </p>
                  <SignInButton>
                    <button className="px-6 py-3 rounded-2xl bg-vibrant-orange text-white hover:opacity-90 transition">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>

      <SignedIn>
                        <div className="max-w-2xl mx-auto">
                  <h1 className="text-3xl font-display font-semibold mb-6">My Profile</h1>
          
          <div className="bg-white rounded-2xl shadow-sm border border-dark-green/10 p-6 space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-vibrant-orange/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-vibrant-orange">
                  {user?.firstName?.charAt(0) || user?.username?.charAt(0) || "U"}
                </span>
              </div>
              <h2 className="text-xl font-semibold">
                Hello, {user?.firstName || user?.username || "there"}!
              </h2>
              <p className="text-dark-green/70">
                Thanks for joining Second Turn Games!
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-t border-dark-green/10 pt-4">
                <h3 className="font-medium mb-2">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dark-green/70">Email:</span>
                    <span>{user?.primaryEmailAddress?.emailAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dark-green/70">Member since:</span>
                    <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently"}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-dark-green/10 pt-4">
                <h3 className="font-medium mb-2">Profile Features</h3>
                <p className="text-dark-green/70 text-sm">
                  Profile details and settings will go here in a future update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </section>
  );
}
