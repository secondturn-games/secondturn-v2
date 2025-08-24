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
    <section className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-dark-green-600 leading-tight">
          Welcome to Second Turn Games
        </h1>
        <p className="text-xl md:text-2xl text-dark-green-500 max-w-3xl mx-auto leading-relaxed">
          Give your games a second life by buying and selling used board games in the Baltics
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto">
        <div className="relative">
          <input
            type="search"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-dark-green-200 focus:outline-none focus:border-vibrant-orange-500 focus:ring-4 focus:ring-vibrant-orange-500/20 text-lg text-dark-green-600 placeholder-dark-green-400 shadow-soft transition-all duration-200"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-dark-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="group cursor-pointer transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-0">
              {/* Image Placeholder */}
              <div className="aspect-[4/3] rounded-t-2xl bg-gradient-to-br from-light-beige-100 to-light-beige-200 mb-4 flex items-center justify-center group-hover:from-light-beige-200 group-hover:to-light-beige-300 transition-all duration-300">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-vibrant-orange-100 rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-8 h-8 text-vibrant-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-dark-green-400 text-sm font-medium">Game Image</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="px-6 pb-6 space-y-4">
                <h3 className="font-semibold text-xl text-dark-green-600 leading-tight group-hover:text-vibrant-orange-600 transition-colors duration-200">
                  {listing.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-vibrant-orange-500">
                    {listing.price}
                  </span>
                  <span className="text-dark-green-500 text-sm font-medium">
                    {listing.location}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1.5 bg-warm-yellow-100 text-dark-green-700 text-sm font-medium rounded-full border border-warm-yellow-200">
                    {listing.condition}
                  </span>
                  <button className="text-vibrant-orange-500 hover:text-vibrant-orange-600 font-medium text-sm transition-colors duration-200">
                    View Details →
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-light-beige-200 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-dark-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2-7H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-green-600 mb-2">No games found</h3>
          <p className="text-dark-green-500 text-lg">
            No games found matching "{searchTerm}". Try a different search term!
          </p>
        </div>
      )}
    </section>
  );
}
