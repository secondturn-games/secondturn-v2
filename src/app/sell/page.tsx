"use client";

import { useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "Like New"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="space-y-6">
                    <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">List a Game</h1>
                <p className="text-lg text-dark-green/80 max-w-2xl mx-auto">
                  Give your board game a second life by listing it for sale in our marketplace
                </p>
              </div>

      <SignedOut>
        <div className="text-center py-12">
          <p className="text-dark-green/80 mb-6">
            Please sign in to list your game.
          </p>
          <SignInButton>
            <Button className="px-6 py-3 rounded-2xl bg-vibrant-orange text-white hover:opacity-90">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        {!submitted ? (
          <div className="max-w-2xl mx-auto">
            <Card className="rounded-2xl border-dark-green/10">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Game Title *
                    </label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Catan, Ticket to Ride"
                      className="rounded-xl border-dark-green/20 focus:ring-2 focus:ring-vibrant-orange"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the condition, what's included, any missing pieces..."
                      className="w-full px-4 py-3 rounded-xl border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-vibrant-orange text-dark-green placeholder-dark-green/50 resize-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium mb-2">
                      Price (€) *
                    </label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="25.00"
                      className="rounded-xl border-dark-green/20 focus:ring-2 focus:ring-vibrant-orange"
                    />
                  </div>

                  <div>
                    <label htmlFor="condition" className="block text-sm font-medium mb-2">
                      Condition *
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={formData.condition}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-vibrant-orange text-dark-green"
                    >
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Used">Used</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Game Image
                    </label>
                    <div className="border-2 border-dashed border-dark-green/20 rounded-xl p-8 text-center">
                      <p className="text-dark-green/50 text-sm">
                        Image upload functionality coming soon!
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full rounded-2xl bg-vibrant-orange text-white hover:opacity-90 py-3"
                  >
                    Submit Listing (Demo)
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="rounded-2xl border-warm-yellow/40 bg-warm-yellow/20">
              <CardContent className="p-6 text-center">
                                        <h2 className="text-2xl font-display font-semibold mb-4 text-dark-green">Demo Complete!</h2>
                <p className="text-dark-green/80 mb-4">
                  Your game "{formData.title}" would be listed here.
                </p>
                <p className="text-sm text-dark-green/70">
                  In the real app, this will create a listing in the marketplace.
                </p>
                <Button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-2xl bg-vibrant-orange text-white hover:opacity-90"
                >
                  Create Another Listing
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </SignedIn>
    </section>
  );
}
