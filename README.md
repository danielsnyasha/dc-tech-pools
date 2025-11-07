# DC Tech Pools - Premium Swimming Pool Services Website

A modern, fully-featured Next.js application for DC Tech Pools, South Africa's premier swimming pool specialists. Built with cutting-edge technologies and stunning animations.

## Features

### Frontend
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Stunning Animations**: Framer Motion animations throughout
- **Modern UI**: Shadcn/ui components with custom gradient themes
- **Interactive Gallery**: Lightbox gallery with filtering
- **Booking System**: Complete appointment booking with form validation
- **Testimonials**: Customer reviews with star ratings
- **12+ Services**: Comprehensive pool services showcase

### Admin Portal
- **Secure Authentication**: Clerk authentication for admin access
- **Analytics Dashboard**: 3 interactive charts (Recharts)
  - Bookings trend over time
  - Service distribution bar chart
  - Customer satisfaction metrics
- **Booking Management**: View, confirm, and manage appointments
- **Real-time Stats**: Total bookings, pending, completed, ratings
- **Recent Bookings**: Quick access to latest appointment requests

### Technical Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Font**: Nunito (Google Fonts)

## Color Scheme
- **Primary Blue**: #0ea5e9 (Sky Blue 500)
- **Secondary Emerald**: #10b981 (Emerald 500)
- **Accent Purple**: #8b5cf6 (Purple 500)
- **Gradients**: Multi-color gradients throughout

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your credentials:

```env
# MongoDB Connection
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dc-tech-pools?retryWrites=true&w=majority"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/admin

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=dennytech84@gmail.com
```

### 3. Set up Clerk Authentication

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. Copy your publishable key and secret key
4. Paste them into the `.env` file

### 4. Set up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Replace the `DATABASE_URL` in `.env` with your connection string

### 5. Initialize Prisma

```bash
npx prisma generate
npx prisma db push
```

This will:
- Generate the Prisma client
- Create your database schema in MongoDB

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### 7. Access Admin Portal

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Sign up with Clerk (use dennytech84@gmail.com or any email)
3. You'll be redirected to the admin dashboard

## Project Structure

```
dc-tech-pools/
├── app/
│   ├── admin/              # Admin portal pages
│   │   ├── bookings/       # Booking management
│   │   ├── layout.tsx      # Admin layout
│   │   └── page.tsx        # Dashboard with charts
│   ├── api/                # API routes
│   │   ├── analytics/      # Analytics endpoints
│   │   ├── bookings/       # Booking CRUD
│   │   └── testimonials/   # Testimonial endpoints
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/
│   ├── ui/                 # Shadcn components
│   ├── Booking.tsx         # Appointment form
│   ├── Footer.tsx          # Footer component
│   ├── Gallery.tsx         # Image gallery
│   ├── Hero.tsx            # Hero section
│   ├── Navbar.tsx          # Navigation
│   ├── Services.tsx        # Services section
│   └── Testimonials.tsx    # Reviews section
├── lib/
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Utility functions
├── prisma/
│   └── schema.prisma       # Database schema
├── public/
│   └── images/
│       └── pool/           # Pool images
├── .env                    # Environment variables
├── middleware.ts           # Clerk middleware
└── README.md               # This file
```

## Database Schema

### Models
- **Booking**: Customer appointment requests
- **Testimonial**: Customer reviews
- **ContactMessage**: Contact form submissions
- **Service**: Service offerings
- **Analytics**: Daily analytics data

## Services Offered

1. New Pool Construction
2. Pool Renovations
3. Weekly Maintenance
4. Equipment Repair & Upgrades
5. Fibreglass Pool Repairs
6. Marbelite Repairs
7. Eco-Friendly Solutions
8. Pool Safety Systems
9. Pool Heating Solutions
10. Automation & Smart Pools
11. Water Features & Fountains
12. Pool Tiling & Coping

## Admin Features

### Dashboard
- Total bookings counter
- Pending bookings counter
- Completed bookings counter
- Average customer rating
- Bookings trend chart (line chart)
- Service distribution chart (bar chart)
- Customer satisfaction chart (line chart)
- Recent bookings list

### Bookings Management
- View all bookings
- Filter by status (all, pending, confirmed, completed, cancelled)
- Confirm bookings
- Mark as completed
- Cancel bookings
- View full customer details

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## Contact

**DC Tech Pools**
- Email: dennytech84@gmail.com
- Phone: +27 12 345 6789
- Location: Serving all of South Africa

## License

© 2025 DC Tech Pools. All rights reserved.

---

**Built with ❤️ using Next.js, TypeScript, Prisma, and Clerk**
