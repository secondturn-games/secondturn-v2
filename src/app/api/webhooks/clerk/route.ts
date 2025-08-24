import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUserProfile, deleteUserProfile } from '@/lib/user-service'

export async function POST(req: Request) {
  try {
    // Get the headers - await the Promise in Next.js 15
    const headerPayload = await headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400
      })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return new Response('Error occured', {
        status: 400
      })
    }

    // Get the ID and type
    const eventType = evt.type
    console.log(`Webhook received: ${eventType}`)

    try {
      switch (eventType) {
        case 'user.created':
          // New user signed up - create profile in our database
          const { id, email_addresses, first_name, last_name, image_url } = evt.data
          console.log('Processing user.created event:', { id, first_name, last_name, image_url })
          
          const primaryEmail = email_addresses?.find(email => email.id === evt.data.primary_email_address_id)
          console.log('Primary email found:', primaryEmail)
          
          if (primaryEmail) {
            console.log('Attempting to create user profile for:', primaryEmail.email_address)
            
            const result = await createUserProfile({
              clerkId: id,
              email: primaryEmail.email_address,
              firstName: first_name || undefined,
              lastName: last_name || undefined,
              avatarUrl: image_url || undefined,
            })
            
            if (!result.success) {
              console.error('Failed to create user profile:', result.error)
              return new Response('Failed to create user profile', { status: 500 })
            }
            
            console.log(`User profile created successfully for ${primaryEmail.email_address}`)
          } else {
            console.error('No primary email found for user:', id)
            return new Response('No primary email found', { status: 400 })
          }
          break

        case 'user.updated':
          // User updated their profile - we could sync changes here
          console.log(`User updated: ${evt.data.id}`)
          break

        case 'user.deleted':
          // User deleted their account - remove from our database
          const deleteResult = await deleteUserProfile(evt.data.id as string)
          
          if (!deleteResult.success) {
            console.error('Failed to delete user profile:', deleteResult.error)
            return new Response('Failed to delete user profile', { status: 500 })
          }
          
          console.log(`User profile deleted for ${evt.data.id}`)
          break

        default:
          console.log(`Unhandled webhook event: ${eventType}`)
      }

      return new Response('Webhook processed successfully', { status: 200 })
    } catch (error) {
      console.error('Error processing webhook:', error)
      return new Response('Error processing webhook', { status: 500 })
    }
  } catch (error) {
    console.error('Error in webhook handler:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
