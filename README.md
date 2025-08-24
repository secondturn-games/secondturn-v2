# Second Turn Games MVP

A digital marketplace for pre-owned board games in the Baltics. Give your games a second life!

## 🚀 Features

- **Browse Listings**: View available board games with search and filtering
- **User Authentication**: Sign up/login with email or Google OAuth via Clerk
- **User Profiles**: Basic profile management for authenticated users
- **Listing Form**: Placeholder form for future game listing functionality
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **UI Components**: shadcn/ui (Radix-based)
- **Authentication**: Clerk (EU data residency)
- **Database**: Neon PostgreSQL with Prisma ORM
- **Storage**: Cloudflare R2 (S3-compatible)
- **Hosting**: Vercel

## 🎨 Brand Colors

- **Light Beige**: #E6EAD7 (Background)
- **Vibrant Orange**: #D95323 (Primary actions)
- **Warm Yellow**: #F2C94C (Secondary highlights)
- **Dark Green**: #29432B (Text and borders)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Clerk account
- Neon PostgreSQL database
- Cloudflare R2 bucket

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/secondturn-games/secondturn-v2.git
   cd secondturn-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   
   # Database (Neon PostgreSQL)
   DATABASE_URL="postgresql://<user>:<password>@<host>.neon.tech/<dbname>?sslmode=require"
   
   # Cloudflare R2 Storage
   R2_ACCESS_KEY_ID=your_access_key_id
   R2_SECRET_ACCESS_KEY=your_secret_access_key
   R2_BUCKET_NAME=secondturn-games
   R2_ENDPOINT_URL=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   # Add models to schema.prisma when ready
   # npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Pages

- **Home** (`/`): Browse game listings with search functionality
- **Profile** (`/profile`): User profile management (requires auth)
- **Sell** (`/sell`): Game listing form (requires auth, demo mode)

## 🔧 Development

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout with Clerk provider
│   ├── page.tsx        # Homepage with listings
│   ├── profile/        # User profile page
│   └── sell/           # Game listing form
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── lib/                 # Utility functions
└── fonts/               # Google Fonts (Righteous, Fredoka)
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

Set these in your Vercel project:
- **Preview**: Use test/development keys
- **Production**: Use live production keys

## 🔮 Future Features

- Real listing persistence with database
- Image upload to Cloudflare R2
- User messaging system
- Payment processing
- Advanced search and filtering
- User reviews and ratings

## 📄 License

This project is private and proprietary to Second Turn Games.

## 🤝 Contributing

This is an MVP project. Future contributions will be welcome once the core functionality is established.

---

**Second Turn Games** - Give your games a second life! 🎲
