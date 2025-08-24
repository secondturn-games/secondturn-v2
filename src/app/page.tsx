"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

// Static sample data for MVP
const sampleListings = [
  {
    id: 1,
    title: "Catan (2015)",
    price: "€25",
    location: "Riga",
    condition: "Like New",
    image: "/placeholder-game.jpg"
  },
  {
    id: 2,
    title: "Ticket to Ride: Europe",
    price: "€30",
    location: "Tallinn",
    condition: "Good",
    image: "/placeholder-game.jpg"
  },
  {
    id: 3,
    title: "Pandemic",
    price: "€20",
    location: "Vilnius",
    condition: "Used",
    image: "/placeholder-game.jpg"
  },
  {
    id: 4,
    title: "Azul",
    price: "€35",
    location: "Riga",
    condition: "Like New",
    image: "/placeholder-game.jpg"
  },
  {
    id: 5,
    title: "Splendor",
    price: "€18",
    location: "Tallinn",
    condition: "Good",
    image: "/placeholder-game.jpg"
  },
  {
    id: 6,
    title: "7 Wonders",
    price: "€28",
    location: "Vilnius",
    condition: "Used",
    image: "/placeholder-game.jpg"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredListings = sampleListings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold">Welcome to Second Turn Games</h1>
        <p className="text-lg text-dark-green/80 max-w-2xl mx-auto">
          Give your games a second life by buying and selling used board games in the Baltics
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <input
          type="search"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-dark-green/20 focus:outline-none focus:ring-2 focus:ring-vibrant-orange text-dark-green placeholder-dark-green/50"
        />
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="rounded-2xl border-dark-green/10 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="aspect-video rounded-xl bg-light-beige/60 mb-4 flex items-center justify-center">
                <span className="text-dark-green/50 text-sm">Game Image</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{listing.title}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-vibrant-orange">{listing.price}</span>
                <span className="text-dark-green/70">{listing.location}</span>
              </div>
              <div className="mt-2">
                <span className="inline-block px-2 py-1 bg-warm-yellow/20 text-dark-green/80 text-xs rounded-full">
                  {listing.condition}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-dark-green/70 text-lg">
            No games found matching "{searchTerm}". Try a different search term!
          </p>
        </div>
      )}
    </section>
  );
}
