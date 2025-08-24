"use client"

import { useUser } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface UserStats {
  totalListings: number
  totalSales: number
  trustScore: number
  isVerified: boolean
  _count: {
    listings: number
    favorites: number
    reviews: number
    receivedReviews: number
  }
}

export default function ProfilePage() {
  const { user, isLoaded } = useUser()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user stats when component mounts
  useEffect(() => {
    if (user?.id) {
      fetchUserStats()
    }
  }, [user?.id])

  const fetchUserStats = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}/stats`)
      if (response.ok) {
        const data = await response.json()
        setUserStats(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-light-beige-200 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-8 bg-light-beige-200 rounded w-1/3 mx-auto animate-pulse" />
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center space-y-6 py-16">
        <div className="w-24 h-24 bg-light-beige-200 rounded-full mx-auto mb-6 flex items-center justify-center">
          <svg className="w-12 h-12 text-dark-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-semibold text-dark-green-600">Sign In Required</h1>
        <p className="text-dark-green-500 text-lg max-w-md mx-auto">
          Please sign in to view your profile and manage your account.
        </p>
        <Button 
          onClick={() => window.location.href = '/sign-in'}
          className="bg-vibrant-orange-500 hover:bg-vibrant-orange-600 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
        >
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="text-center space-y-6">
        <div className="relative inline-block">
          {user.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt={`${user.firstName || 'User'}'s profile picture`}
              className="w-32 h-32 rounded-full border-4 border-white shadow-strong mx-auto"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-vibrant-orange-100 to-warm-yellow-100 border-4 border-white shadow-strong mx-auto flex items-center justify-center">
              <span className="text-4xl font-display text-vibrant-orange-500">
                {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress.charAt(0) || 'U'}
              </span>
            </div>
          )}
          
          {/* Verification Badge */}
          {userStats?.isVerified && (
            <div className="absolute -bottom-2 -right-2 bg-warm-yellow-400 text-white rounded-full p-2 shadow-medium">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-display font-semibold text-dark-green-600 mb-2">
            {user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}`
              : user.firstName || 'Welcome Back!'
            }
          </h1>
          <p className="text-lg text-dark-green-500">
            {user.emailAddresses[0]?.emailAddress}
          </p>
          {user.createdAt && (
            <p className="text-sm text-dark-green-400 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* User Stats Grid */}
      {userStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-medium transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-display font-bold text-vibrant-orange-500 mb-2">
                {userStats.totalListings}
              </div>
              <div className="text-dark-green-600 font-medium">Active Listings</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-display font-bold text-warm-yellow-500 mb-2">
                {userStats.totalSales}
              </div>
              <div className="text-dark-green-600 font-medium">Games Sold</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-display font-bold text-dark-green-500 mb-2">
                {userStats.trustScore}
              </div>
              <div className="text-dark-green-600 font-medium">Trust Score</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-medium transition-shadow duration-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-display font-bold text-light-beige-500 mb-2">
                {userStats._count.receivedReviews}
              </div>
              <div className="text-dark-green-600 font-medium">Reviews</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display font-semibold text-dark-green-600">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button 
              onClick={() => window.location.href = '/sell'}
              className="h-20 bg-vibrant-orange-500 hover:bg-vibrant-orange-600 text-white text-lg font-medium shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                List a Game
              </div>
            </Button>

            <Button 
              onClick={() => window.location.href = '/profile/listings'}
              className="h-20 bg-warm-yellow-400 hover:bg-warm-yellow-500 text-dark-green-700 text-lg font-medium shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                My Listings
              </div>
            </Button>

            <Button 
              onClick={() => window.location.href = '/profile/favorites'}
              className="h-20 bg-light-beige-200 hover:bg-light-beige-300 text-dark-green-700 text-lg font-medium shadow-soft hover:shadow-medium transition-all duration-200 hover:scale-105"
            >
              <div className="text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorites
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-display font-semibold text-dark-green-600">
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-light-beige-50 rounded-xl">
            <div>
              <h3 className="font-medium text-dark-green-600">Profile Information</h3>
              <p className="text-sm text-dark-green-500">Update your personal details and preferences</p>
            </div>
            <Button variant="outline" className="border-dark-green-200 text-dark-green-600 hover:bg-dark-green-50">
              Edit Profile
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-light-beige-50 rounded-xl">
            <div>
              <h3 className="font-medium text-dark-green-600">Notification Preferences</h3>
              <p className="text-sm text-dark-green-500">Manage email and SMS notifications</p>
            </div>
            <Button variant="outline" className="border-dark-green-200 text-dark-green-600 hover:bg-dark-green-50">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-light-beige-50 rounded-xl">
            <div>
              <h3 className="font-medium text-dark-green-600">Privacy & Security</h3>
              <p className="text-sm text-dark-green-500">Control your privacy settings and security</p>
            </div>
            <Button variant="outline" className="border-dark-green-200 text-dark-green-600 hover:bg-dark-green-50">
              Manage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <div className="text-center">
        <Button 
          onClick={() => user.signOut()}
          variant="outline"
          className="border-dark-green-200 text-dark-green-600 hover:bg-dark-green-50 px-8 py-3 rounded-2xl"
        >
          Sign Out
        </Button>
      </div>
    </div>
  )
}
