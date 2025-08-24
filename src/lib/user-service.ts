import { prisma } from './db'
import type { User } from '@clerk/nextjs/server'

export interface CreateUserProfileData {
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  displayName?: string
  avatarUrl?: string
}

export interface UpdateUserProfileData {
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
  location?: string
  phone?: string
  avatarUrl?: string
  favoriteGenres?: string[]
  gameCollection?: string[]
  emailNotifications?: boolean
  smsNotifications?: boolean
  language?: string
}

export interface UserProfileWithStats {
  id: string
  clerkId: string
  email: string
  firstName?: string
  lastName?: string
  displayName?: string
  bio?: string
  location?: string
  phone?: string
  avatarUrl?: string
  favoriteGenres: string[]
  gameCollection: string[]
  totalListings: number
  totalSales: number
  isVerified: boolean
  trustScore: number
  createdAt: Date
  updatedAt: Date
  lastActive: Date
}

/**
 * Create a new user profile when a user signs up
 */
export async function createUserProfile(userData: CreateUserProfileData) {
  try {
    const userProfile = await prisma.userProfile.create({
      data: {
        clerkId: userData.clerkId,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        displayName: userData.displayName || userData.firstName,
        avatarUrl: userData.avatarUrl,
        favoriteGenres: [],
        gameCollection: [],
      },
    })

    console.log(`Created user profile for ${userData.email}`)
    return { success: true, data: userProfile }
  } catch (error) {
    console.error('Error creating user profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create user profile' 
    }
  }
}

/**
 * Get user profile by Clerk ID
 */
export async function getUserProfileByClerkId(clerkId: string) {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId },
      include: {
        listings: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            listings: true,
            reviews: true,
            receivedReviews: true,
          },
        },
      },
    })

    return { success: true, data: userProfile }
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch user profile' 
    }
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(clerkId: string, updateData: UpdateUserProfileData) {
  try {
    const updatedProfile = await prisma.userProfile.update({
      where: { clerkId },
      data: {
        ...updateData,
        updatedAt: new Date(),
        lastActive: new Date(),
      },
    })

    console.log(`Updated user profile for ${clerkId}`)
    return { success: true, data: updatedProfile }
  } catch (error) {
    console.error('Error updating user profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update user profile' 
    }
  }
}

/**
 * Update user's last active timestamp
 */
export async function updateUserLastActive(clerkId: string) {
  try {
    await prisma.userProfile.update({
      where: { clerkId },
      data: { lastActive: new Date() },
    })
  } catch (error) {
    console.error('Error updating user last active:', error)
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(clerkId: string) {
  try {
    const stats = await prisma.userProfile.findUnique({
      where: { clerkId },
      select: {
        totalListings: true,
        totalSales: true,
        trustScore: true,
        isVerified: true,
        _count: {
          select: {
            listings: true,
            favorites: true,
            reviews: true,
            receivedReviews: true,
          },
        },
      },
    })

    return { success: true, data: stats }
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch user stats' 
    }
  }
}

/**
 * Delete user profile (for account deletion)
 */
export async function deleteUserProfile(clerkId: string) {
  try {
    await prisma.userProfile.delete({
      where: { clerkId },
    })

    console.log(`Deleted user profile for ${clerkId}`)
    return { success: true }
  } catch (error) {
    console.error('Error deleting user profile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to delete user profile' 
    }
  }
}
