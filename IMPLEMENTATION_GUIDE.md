# Admin Portal & Job Management - Implementation Guide

## What's Been Implemented

### 1. Secure Admin-Only Access

The admin portal is now locked down to only users with the `admin` role. Here's what happens:

- **Non-admin users**: When they try to access `/admin`, they're redirected to the homepage with an error message
- **Unauthenticated users**: Redirected to the sign-in page
- **Admin users**: Full access to all admin features

### 2. Enhanced Database Schema

The `Booking` model has been extended with job management fields:

```prisma
model Booking {
  // ... existing fields ...

  // NEW: Job management fields
  jobYear         Int?          // Year of the job (e.g., 2025)
  jobQuarter      String?       // Q1, Q2, Q3, Q4
  allocatedBudget Float?        // Budget allocated for this job
  actualCost      Float?        // Actual cost incurred
  jobBreakdown    JobTask[]     // Array of tasks/breakdown items
}

// NEW: Job task breakdown type
type JobTask {
  taskName        String
  description     String?
  estimatedCost   Float
  actualCost      Float?
  assignedTo      String?       // Team member assigned
  status          String        // pending, in_progress, completed
  dueDate         DateTime?
  completedDate   DateTime?
}
```

### 3. New Jobs Management Page

Location: `/admin/jobs`

**Features:**
- Filter jobs by year, quarter, and status
- View key metrics:
  - Total jobs count
  - Total allocated budget
  - Budget variance (remaining/overrun)
  - Completion rate percentage
- Interactive charts using Recharts:
  - Quarterly Budget vs Actual (Bar Chart)
  - Job Status Distribution (Pie Chart)
  - Quarterly Job Volume (Line Chart)
  - Budget by Service Type (Bar Chart)
- Expandable job cards showing:
  - Contact information
  - Job details
  - Custom messages
  - Detailed job breakdown with tasks
- All data is LIVE from your database (no dummy data)

### 4. Updated Navigation

The admin layout now includes a "Jobs" link in the navigation bar between "Bookings" and "Testimonials".

### 5. New API Endpoints

**`PATCH /api/jobs/[id]`** - Update job details (admin-only)
- Update jobYear, jobQuarter, allocatedBudget, actualCost
- Manage job breakdown tasks
- Protected by admin role verification

**`GET /api/jobs/[id]`** - Get specific job details
- Fetch individual job information

## Setup Instructions

### Step 1: Set Up Admin Users in Clerk

Follow the instructions in [ADMIN_SETUP.md](./ADMIN_SETUP.md) to:
1. Go to Clerk Dashboard
2. Select a user
3. Add `{"role": "admin"}` to their public metadata
4. Repeat for your second admin (recommend only 2 admins)

### Step 2: Test the Security

**Test 1: Non-Admin Access**
1. Create a test user account (or use existing)
2. Do NOT add admin role to this user
3. Sign in with this account
4. Click "Admin Portal" button in navbar
5. You should be redirected to homepage with "Access Denied" error

**Test 2: Admin Access**
1. Sign in with an account that has `"role": "admin"` in metadata
2. Click "Admin Portal" button
3. You should see the full admin dashboard
4. Navigate to "Jobs" tab
5. You should see the job management interface

### Step 3: Add Job Management Data

Since your existing bookings don't have job management data yet, you'll need to update them. Here's how:

#### Option 1: Manually via Database

Use Prisma Studio or your MongoDB client to add:
- `jobYear`: e.g., 2025
- `jobQuarter`: "Q1", "Q2", "Q3", or "Q4"
- `allocatedBudget`: e.g., 5000.00
- `actualCost`: e.g., 4500.00 (optional)
- `jobBreakdown`: Array of tasks (optional)

Example job breakdown structure:
```json
[
  {
    "taskName": "Initial Pool Assessment",
    "description": "Inspect pool condition and identify issues",
    "estimatedCost": 500,
    "actualCost": 450,
    "assignedTo": "John Doe",
    "status": "completed",
    "dueDate": "2025-01-15T00:00:00Z",
    "completedDate": "2025-01-14T00:00:00Z"
  },
  {
    "taskName": "Chemical Balance Adjustment",
    "description": "Adjust pH and chlorine levels",
    "estimatedCost": 300,
    "status": "in_progress",
    "assignedTo": "Jane Smith",
    "dueDate": "2025-01-20T00:00:00Z"
  }
]
```

#### Option 2: Via API (Programmatic)

You can use the new API endpoint to update jobs:

```typescript
// Example: Update a job with management data
const response = await fetch('/api/jobs/[booking-id]', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jobYear: 2025,
    jobQuarter: 'Q1',
    allocatedBudget: 5000,
    actualCost: 4500,
    jobBreakdown: [
      {
        taskName: 'Pool Cleaning',
        estimatedCost: 2000,
        status: 'pending'
      }
    ]
  })
})
```

## Using the Jobs Page

### Filtering Jobs

1. **By Year**: Select specific year or "All Years" to see all jobs
2. **By Quarter**: Filter by Q1-Q4 or "All Quarters"
3. **By Status**: Filter by pending, confirmed, completed, or cancelled

### Understanding the Metrics

- **Total Jobs**: Number of jobs matching your filters
- **Total Budget**: Sum of all allocated budgets for filtered jobs
- **Budget Remaining/Overrun**:
  - Green = You're under budget (remaining money)
  - Red = You're over budget (cost overrun)
- **Completion Rate**: Percentage of jobs marked as "completed"

### Reading the Charts

1. **Quarterly Budget vs Actual**:
   - Blue bars = Allocated budget
   - Green bars = Actual cost spent
   - Compare to see if you're on budget

2. **Job Status Distribution**:
   - Shows breakdown of job statuses
   - Helps identify bottlenecks

3. **Quarterly Job Volume**:
   - Blue line = Total jobs
   - Green line = Completed jobs
   - Track completion trends

4. **Budget by Service Type**:
   - See which services consume most budget
   - Plan resource allocation accordingly

### Viewing Job Details

Click on any job card to expand and see:
- Full contact information
- Service and location details
- Custom messages from customers
- Detailed task breakdown (if added)
- Budget allocation per task
- Task status and assignments

## Best Practices

### Budget Planning

1. **Quarterly Planning**:
   - Set budgets at the start of each quarter
   - Review budget vs actual weekly
   - Adjust allocations as needed

2. **Job Breakdown**:
   - Break large jobs into smaller tasks
   - Assign estimated costs to each task
   - Track actual costs as work progresses
   - Assign team members to tasks

3. **Status Management**:
   - Update job status regularly
   - Mark tasks as completed when finished
   - Record actual costs promptly

### Security

1. **Limit Admin Access**:
   - Only grant admin role to 2-3 trusted individuals
   - Audit admin users quarterly
   - Remove access immediately when no longer needed

2. **Regular Monitoring**:
   - Check who has admin access monthly
   - Review Clerk dashboard for suspicious activity
   - Ensure all admins use strong passwords and 2FA

## Troubleshooting

### "Access Denied" Error for Admin User

**Solution:**
1. Go to Clerk Dashboard
2. Navigate to Users → [Your User]
3. Check Public Metadata
4. Ensure it contains: `{"role": "admin"}`
5. Sign out completely and sign back in

### Jobs Page Shows No Data

**Possible Causes:**
1. No bookings in database
2. Filters are too restrictive
3. Jobs don't have year/quarter assigned

**Solution:**
1. Create test bookings via the booking form
2. Manually add jobYear and jobQuarter to existing bookings
3. Reset filters to "All Years" and "All Quarters"

### Charts Not Displaying Correctly

**Solution:**
1. Ensure jobs have `allocatedBudget` values
2. Check that `jobQuarter` is one of: Q1, Q2, Q3, Q4
3. Verify browser console for errors
4. Try refreshing the page

### API Update Fails

**Possible Causes:**
1. Not signed in as admin
2. Invalid job ID
3. Invalid data format

**Solution:**
1. Verify you're signed in with admin account
2. Check job ID is correct
3. Ensure data matches schema structure

## Future Enhancements

Consider adding:
- [ ] Bulk job import/export functionality
- [ ] Email notifications for job status changes
- [ ] Calendar view for scheduling
- [ ] Team member management
- [ ] Advanced reporting and analytics
- [ ] Budget forecast predictions
- [ ] Invoice generation from jobs
- [ ] Client portal for job status tracking

## Support

If you encounter issues:
1. Check this guide first
2. Review [ADMIN_SETUP.md](./ADMIN_SETUP.md) for auth issues
3. Check browser console for errors
4. Verify database connection in `.env`
5. Ensure Prisma client is generated: `npx prisma generate`

## Summary

You now have:
- Secure admin-only portal
- Comprehensive job management system
- Budget tracking and allocation
- Quarterly planning tools
- Real-time analytics and visualizations
- Task breakdown and assignment capabilities

The system is ready for you to:
1. Set up your admin users
2. Update existing bookings with job data
3. Start planning and tracking your pool service business efficiently
