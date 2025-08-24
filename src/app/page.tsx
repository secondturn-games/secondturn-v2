"use client";

import { useState, useEffect } from "react";
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
  const [isLoading, setIsLoading] = useState(false); // No artificial loading for now
  const [filteredListings, setFilteredListings] = useState(sampleListings);
  
  // Filter listings with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = sampleListings.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredListings(filtered);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm]);

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

      {/* Enhanced Search Bar */}
      <div className="max-w-lg mx-auto">
        <div className="relative group">
          <input
            type="search"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-2xl border-2 border-dark-green-200 focus:outline-none focus:border-vibrant-orange-500 focus:ring-4 focus:ring-vibrant-orange-500/20 text-lg text-dark-green-600 placeholder-dark-green-400 shadow-soft transition-all duration-300 group-hover:border-dark-green-300 group-hover:shadow-medium"
            aria-label="Search for board games"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg className="h-6 w-6 text-dark-green-400 group-hover:text-vibrant-orange-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Search Suggestions */}
          {searchTerm.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-strong border border-dark-green-100 overflow-hidden z-10 animate-in slide-in-from-top-2 duration-200" role="listbox">
              <div className="p-4">
                <div className="text-sm text-dark-green-500 mb-2">Quick filters:</div>
                <div className="flex flex-wrap gap-2">
                  {['Catan', 'Ticket to Ride', 'Pandemic', 'Azul', 'Splendor'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setSearchTerm(suggestion)}
                      className="px-3 py-1.5 bg-light-beige-100 hover:bg-light-beige-200 text-dark-green-600 text-sm rounded-full border border-light-beige-200 hover:border-light-beige-300 transition-all duration-200 hover:scale-105"
                      role="option"
                      aria-selected={searchTerm === suggestion}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Status */}
        {searchTerm.length > 0 && (
          <div className="text-center mt-3">
            <span className="text-sm text-dark-green-500">
              {filteredListings.length === 0 ? 'No results found' : `Found ${filteredListings.length} game${filteredListings.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        )}
      </div>

      {/* Listings Grid */}
      <div className="text-center mb-6">
        <span className="text-sm text-dark-green-500">
          {searchTerm.length === 0 
            ? `Showing all ${filteredListings.length} available games`
            : `Found ${filteredListings.length} game${filteredListings.length !== 1 ? 's' : ''} matching "${searchTerm}"`
          }
        </span>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl border border-dark-green-100 p-0 overflow-hidden animate-pulse">
              {/* Skeleton Image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-light-beige-100 to-light-beige-200 mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-light-beige-300 rounded-full" />
              </div>
              
              {/* Skeleton Content */}
              <div className="px-6 pb-6 space-y-4">
                <div className="h-6 bg-light-beige-200 rounded w-3/4" />
                <div className="flex items-center justify-between">
                  <div className="h-8 bg-warm-yellow-200 rounded w-1/3" />
                  <div className="h-4 bg-light-beige-200 rounded w-1/4" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-warm-yellow-200 rounded-full w-1/3" />
                  <div className="h-4 bg-light-beige-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
          <Card key={listing.id} className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-strong overflow-hidden" role="article" aria-labelledby={`game-title-${listing.id}`}>
            <CardContent className="p-0">
              {/* Image Placeholder with Enhanced Hover */}
              <div className="relative aspect-[4/3] rounded-t-2xl bg-gradient-to-br from-light-beige-100 to-light-beige-200 mb-4 flex items-center justify-center group-hover:from-light-beige-200 group-hover:to-light-beige-300 transition-all duration-500 overflow-hidden" aria-label={`${listing.title} game image`}>
                <div className="text-center space-y-2 z-10">
                  <div className="w-16 h-16 bg-vibrant-orange-100 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-vibrant-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-dark-green-400 text-sm font-medium">Game Image</span>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                {/* Quick Action Buttons */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button 
                    className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-medium hover:bg-white transition-all duration-200 hover:scale-110"
                    aria-label={`Add ${listing.title} to favorites`}
                    title="Add to favorites"
                  >
                    <svg className="w-4 h-4 text-dark-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Content with Enhanced Interactions */}
              <div className="px-6 pb-6 space-y-4">
                <h3 id={`game-title-${listing.id}`} className="font-semibold text-xl text-dark-green-600 leading-tight group-hover:text-vibrant-orange-600 transition-colors duration-300">
                  {listing.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl text-vibrant-orange-500 group-hover:scale-105 transition-transform duration-300" aria-label={`Price: ${listing.price}`}>
                    {listing.price}
                  </span>
                  <div className="flex items-center gap-1 text-dark-green-500 text-sm font-medium" aria-label={`Location: ${listing.location}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {listing.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1.5 bg-warm-yellow-100 text-dark-green-700 text-sm font-medium rounded-full border border-warm-yellow-200 group-hover:bg-warm-yellow-200 group-hover:border-warm-yellow-300 transition-all duration-200" aria-label={`Condition: ${listing.condition}`}>
                    {listing.condition}
                  </span>
                  <button 
                    className="flex items-center gap-1 text-vibrant-orange-500 hover:text-vibrant-orange-600 font-medium text-sm transition-all duration-200 hover:gap-2 group-hover:gap-2"
                    aria-label={`View details for ${listing.title}`}
                  >
                    View Details 
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Bottom Border Animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-vibrant-orange-500 to-warm-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {filteredListings.length === 0 && !isLoading && (
        <div className="text-center py-16" role="status" aria-live="polite">
          <div className="w-24 h-24 bg-light-beige-200 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-dark-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2-7H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-dark-green-600 mb-2">No games found</h3>
          <p className="text-dark-green-500 text-lg mb-6">
            No games found matching "{searchTerm}". Try a different search term!
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 bg-vibrant-orange-500 text-white rounded-xl hover:bg-vibrant-orange-600 transition-all duration-200 hover:scale-105 shadow-soft hover:shadow-medium"
              aria-label="Clear search and show all games"
            >
              Clear Search
            </button>
            <button 
              onClick={() => setSearchTerm('Catan')}
              className="px-4 py-2 bg-light-beige-200 text-dark-green-600 rounded-xl hover:bg-light-beige-300 transition-all duration-200 hover:scale-105 border border-light-beige-300"
              aria-label="Search for Catan games"
            >
              Try "Catan"
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
