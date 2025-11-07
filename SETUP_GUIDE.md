# 🏊 DC Tech Pools - Complete Setup Guide

Welcome! Follow these steps to get your stunning pool services website up and running.

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Clerk account (free tier works)
- A code editor (VS Code recommended)

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies ✅

Already done! Dependencies are installed.

### Step 2: Set Up MongoDB (2 minutes)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (select free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `.env` file and replace the `DATABASE_URL`:

```env
DATABASE_URL="your_mongodb_connection_string_here"
```

### Step 3: Set Up Clerk Authentication (2 minutes)

1. Visit [Clerk.com](https://clerk.com)
2. Sign up and create a new application
3. Choose "Email" and "Google" as sign-in methods
4. Go to "API Keys" in the dashboard
5. Copy your keys and update `.env`:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

### Step 4: Initialize Database (1 minute)

Run these commands in your terminal:

```bash
npx prisma generate
npx prisma db push
```

### Step 5: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🎨 What You Get

### Public Website Features:
- ✨ Stunning hero section with animations
- 🏊 12+ comprehensive pool services
- 🖼️ Interactive image gallery with lightbox
- ⭐ Customer testimonials with ratings
- 📅 Appointment booking system
- 📱 Fully responsive design
- 🎭 Smooth animations throughout

### Admin Portal (`/admin`):
- 🔐 Secure Clerk authentication
- 📊 3 interactive charts:
  - Line chart: Bookings trend over time
  - Bar chart: Service distribution
  - Line chart: Customer satisfaction metrics
- 📋 Complete booking management
- 📈 Real-time analytics dashboard
- 👥 Customer data management

## 🎯 Testing the Website

### Test the Public Site:
1. Navigate to `http://localhost:3000`
2. Scroll through all sections
3. Try the booking form (fill it out)
4. View the gallery (click images for lightbox)
5. Check mobile responsiveness (resize browser)

### Test the Admin Portal:
1. Click "Admin Portal" in the navbar
2. Sign up with any email (dennytech84@gmail.com recommended)
3. Explore the dashboard with charts
4. Go to "Bookings" to see any test bookings
5. Try changing booking status

## 🎨 Customization Tips

### Change Colors:
Edit `tailwind.config.ts` - look for the color definitions

### Change Phone/Email:
Edit `.env` file and update:
```env
ADMIN_EMAIL=your-email@example.com
```

Also update:
- `components/Navbar.tsx` (phone number)
- `components/Footer.tsx` (contact info)
- `components/Booking.tsx` (contact card)

### Add More Images:
Place images in `public/images/pool/` and update:
- `components/Gallery.tsx` (add to galleryImages array)
- `components/Hero.tsx` (change hero image)

## 📱 Sections & Components

1. **Navbar** - Sticky navigation with smooth scroll
2. **Hero** - Eye-catching header with stats
3. **Services** - 12 services with animations
4. **Gallery** - Filterable image gallery
5. **About** - Company story & values
6. **Testimonials** - Customer reviews with stars
7. **Booking** - Appointment form with validation
8. **Footer** - Links and contact info

## 🔧 Troubleshooting

### "Module not found" errors:
```bash
npm install
```

### Database connection errors:
- Check your MongoDB connection string in `.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Run `npx prisma db push` again

### Clerk authentication errors:
- Verify your Clerk keys in `.env`
- Make sure you copied the correct keys (publishable & secret)
- Clear browser cache and try again

### Port 3000 already in use:
```bash
# Kill the process or use a different port
npm run dev -- -p 3001
```

## 🌟 Key Features Implemented

### Animations & Transitions:
- Framer Motion animations on scroll
- Hover effects on cards and buttons
- Smooth page transitions
- Floating elements
- Gradient animations

### Responsive Design:
- Mobile-first approach
- Tablet optimization
- Desktop enhancements
- Touch-friendly interactions

### Performance:
- Optimized images with Next.js Image
- Code splitting
- Lazy loading components
- Efficient database queries

## 📊 Admin Dashboard Charts

1. **Bookings Trend** (Line Chart)
   - Shows bookings over last 30 days
   - Helps track business growth

2. **Service Distribution** (Bar Chart)
   - Most popular services
   - Helps focus marketing efforts

3. **Customer Satisfaction** (Line Chart)
   - Page views and engagement
   - Contact form submissions

## 🎓 Next Steps

1. Add real pool images to `/public/images/pool/`
2. Update contact information throughout
3. Customize color scheme if desired
4. Add your MongoDB and Clerk credentials
5. Test the booking system
6. Deploy to Vercel or your preferred host

## 🚀 Deployment

### Deploy to Vercel (Recommended):

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables from `.env`
4. Deploy!

Your site will be live in minutes!

## 📞 Support

If you need help:
- Check the main README.md
- Review the code comments
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Check Clerk docs: [clerk.com/docs](https://clerk.com/docs)
- Check Prisma docs: [prisma.io/docs](https://prisma.io/docs)

## ✅ Checklist

- [ ] Dependencies installed
- [ ] MongoDB connected
- [ ] Clerk keys added
- [ ] Database initialized
- [ ] Development server running
- [ ] Tested booking form
- [ ] Tested admin portal
- [ ] Added real images
- [ ] Updated contact info
- [ ] Ready to deploy!

---

**Congratulations! You now have a world-class swimming pool services website!** 🎉

Built with ❤️ using Next.js 15, TypeScript, Prisma, Clerk, Tailwind CSS, and Framer Motion.
