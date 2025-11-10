import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample testimonials
  const testimonials = [
    {
      customerName: "Sarah Johnson",
      rating: 5,
      comment: "DC Tech Pools transformed our backyard into a paradise! The team was professional, punctual, and delivered beyond our expectations. Our infinity pool is absolutely stunning!",
      serviceType: "New Pool Construction",
      isApproved: true,
    },
    {
      customerName: "Michael Van Der Merwe",
      rating: 5,
      comment: "We had an old, dated pool that needed serious work. DC Tech Pools completely renovated it with modern tiles, new equipment, and eco-friendly features. It looks brand new!",
      serviceType: "Pool Renovation",
      isApproved: true,
    },
    {
      customerName: "Thandi Ndlovu",
      rating: 5,
      comment: "Excellent maintenance service! They keep our pool crystal clear year-round. Very reliable and always on time. Highly recommend their maintenance packages.",
      serviceType: "Weekly Maintenance",
      isApproved: true,
    },
    {
      customerName: "David Robertson",
      rating: 5,
      comment: "Quick response when our pool pump failed. They diagnosed the issue, replaced the pump with a more efficient model, and had us up and running the same day. Fantastic service!",
      serviceType: "Equipment Repair",
      isApproved: true,
    },
    {
      customerName: "Lisa Patel",
      rating: 5,
      comment: "Love our new solar heating system! DC Tech Pools helped us go green and we're saving so much on electricity. The installation was seamless and the team explained everything clearly.",
      serviceType: "Eco-Friendly Solutions",
      isApproved: true,
    },
    {
      customerName: "Johan Botha",
      rating: 5,
      comment: "Professional fibreglass repair service. They fixed cracks and resurfaced our pool beautifully. The color matching was perfect and it looks as good as new!",
      serviceType: "Fibreglass Repairs",
      isApproved: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({
      data: testimonial,
    });
  }

  console.log('✅ Testimonials seeded!');

  // Create sample analytics data for the last 30 days
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    try {
      await prisma.analytics.create({
        data: {
          date,
          bookingsCount: Math.floor(Math.random() * 10) + 1,
          pageViews: Math.floor(Math.random() * 100) + 50,
          contactFormCount: Math.floor(Math.random() * 5) + 1,
          avgSatisfaction: 4.5 + Math.random() * 0.5,
        },
      });
    } catch (error) {
      // Skip if already exists
    }
  }

  console.log('✅ Analytics data seeded!');

  // Seed default admin emails
  const defaultAdmins = [
    'musanhunyasha@outlook.com',
    'dennytech84@gmail.com'
  ];

  for (const email of defaultAdmins) {
    const existingAdmin = await prisma.adminEmail.findUnique({
      where: { email }
    });

    if (!existingAdmin) {
      await prisma.adminEmail.create({
        data: {
          email,
          isDefault: true,
          addedBy: 'system'
        }
      });
      console.log(`✅ Added default admin: ${email}`);
    } else {
      console.log(`⏭️  Admin already exists: ${email}`);
    }
  }

  console.log('✅ Admin emails seeded!');
  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
