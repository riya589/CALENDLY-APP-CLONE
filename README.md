# Calendly Clone

## Overview
This project is a full-stack Calendly-inspired scheduling platform built as an internship assignment submission. It supports event type management, weekly availability configuration, public booking links, slot generation, booking creation, meetings management, and booking cancellation.

The goal was to build a clean, interview-ready application that feels close to Calendly in UI and UX while keeping the architecture practical and easy to explain.

## Features
- Calendly-style landing page with polished SaaS UI
- Admin dashboard overview with summary cards
- Event type CRUD with validation
- Weekly availability management with timezone selection
- Public booking page with calendar + slot picker
- Booking confirmation page
- Upcoming and past meetings view
- Booking cancellation flow
- Double booking prevention on the backend
- Prisma + MySQL relational data model
- Seeded sample data for quick demo

## Tech Stack

### Frontend
- React.js
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui-style reusable primitives
- React Router DOM
- Axios
- React Hook Form
- Zod
- date-fns
- Lucide React
- react-day-picker
- Sonner

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- cors
- dotenv
- helmet
- morgan
- Zod

## Why This Stack
- React + Vite: fast development, simple routing integration, and a strong fit for building responsive dashboard and booking flows.
- TypeScript: keeps payloads, form state, and API responses predictable across the full stack.
- Tailwind CSS: made it easy to build a polished Calendly-inspired interface with consistent spacing and reusable styling.
- Express.js: lightweight and interview-friendly for building modular REST APIs.
- Prisma: clean schema modeling, strong TypeScript support, and easy migrations/seeding.
- MySQL: a practical relational database choice for scheduling data with clear relations and indexing.

## Core Features

### Event Types Management
- Create event types
- Edit event types
- Delete event types
- List all event types
- Public booking link per event type

Each event type includes:
- `name`
- `duration`
- `slug`
- `description`
- `color`
- `isActive`

### Availability Management
- Configure weekly recurring hours for all 7 days
- Enable/disable days
- Set daily start and end time
- Store user timezone

### Public Booking Flow
- Open `/book/:slug`
- Load event information
- Pick a date
- Fetch available slots for that date
- Pick a time slot
- Submit invitee name + email
- Redirect to confirmation page

### Meetings Management
- View upcoming meetings
- View past meetings
- Cancel meetings
- See cancelled status clearly

## Folder Structure

```text
Calendly-App-Clone/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── config/
│   │   ├── constants/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Database Design Summary

### `User`
Represents the default admin user.
- One user has many event types
- One user has many availability rows
- One user has many bookings

### `EventType`
Represents a meeting template.
- Belongs to one user
- Has many bookings
- Uses unique `slug` for public booking links

### `Availability`
Represents weekly recurring availability.
- One row per `dayOfWeek` for the user
- Stores `startTime`, `endTime`, and `isAvailable`
- Unique constraint on `userId + dayOfWeek`

### `Booking`
Represents a scheduled meeting.
- Belongs to one user
- Belongs to one event type
- Stores invitee details, start/end timestamps, timezone, and status

## API Endpoints Summary

### Health
- `GET /api/health`

### Event Types
- `GET /api/event-types`
- `POST /api/event-types`
- `GET /api/event-types/:id`
- `PUT /api/event-types/:id`
- `DELETE /api/event-types/:id`

### Availability
- `GET /api/availability`
- `PUT /api/availability`

### Public Booking
- `GET /api/public/event/:slug`
- `GET /api/public/event/:slug/slots?date=YYYY-MM-DD`
- `POST /api/public/book`

### Meetings
- `GET /api/bookings/upcoming`
- `GET /api/bookings/past`
- `PATCH /api/bookings/:id/cancel`

## Environment Variables

### Backend
Create `backend/.env` from `backend/.env.example`

```env
DATABASE_URL="mysql://root:password@localhost:3306/calendly_clone"
PORT=5000
CLIENT_URL=http://localhost:5173
DEFAULT_TIMEZONE=Asia/Kolkata
```

### Frontend
Create `frontend/.env` from `frontend/.env.example`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Setup Instructions

### 1. Clone the project
```bash
git clone <your-repo-url>
cd Calendly-App-Clone
```

### 2. Create the MySQL database
```sql
CREATE DATABASE calendly_clone;
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

### Prisma Commands
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### Seed Sample Data
```bash
npm run db:seed
```

### Start Backend
```bash
npm run dev
```

Backend runs on:
- `http://localhost:5000`

Health route:
- `http://localhost:5000/api/health`

## Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell:
```powershell
Copy-Item .env.example .env
```

Frontend runs on:
- `http://localhost:5173`

## Troubleshooting "Network Error"
- Ensure backend is running: `cd backend && npm run dev`
- Ensure frontend `VITE_API_BASE_URL` targets your backend (default: `http://localhost:5000/api`).
- If your browser uses `127.0.0.1` for frontend origin, backend CORS now allows `http://127.0.0.1:5173`.
- Verify health endpoint works: `http://localhost:5000/api/health`
- Check browser console + network tab for failing request and response status.

## How To Run Frontend
- Open `http://localhost:5173`
- Visit the landing page
- Visit `/dashboard`
- Visit `/book/30-minute-meeting`

## How To Run Backend
- Start MySQL
- Start backend with `npm run dev`
- Verify `GET /api/health`
- Verify seeded records using `GET /api/event-types`

## How To Test Core Features

### Event Types
- Create a new event type from `/dashboard/event-types/new`
- Edit an event type
- Delete an event type
- Copy and open the booking link

### Availability
- Open `/dashboard/availability`
- Change timezone
- Change day availability/hours
- Save updates

### Public Booking
- Open `/book/30-minute-meeting`
- Select a future date
- Pick a slot
- Submit invitee name and email
- Confirm redirect to confirmation page

### Meetings
- Open `/dashboard/meetings`
- Confirm new booking appears in upcoming
- Cancel a scheduled booking
- Reload the public booking page and verify the cancelled slot becomes available again

## Booking Flow Explanation
1. Public page loads event details by slug.
2. When a date is selected, the frontend requests slot data from the backend.
3. The backend checks:
   - event duration
   - selected weekday
   - recurring availability
   - existing scheduled bookings
   - past-time filtering for today
4. Available slots are returned to the frontend.
5. User picks a slot and submits booking details.
6. Backend rechecks slot availability inside a transaction.
7. Booking is created and confirmation data is returned.

## Double Booking Prevention
- Slot availability is checked before showing bookable times.
- Before creation, the backend checks if a scheduled booking already exists for the same event type and start time.
- Booking creation runs inside a Prisma transaction with serializable isolation.
- Cancelled bookings do not block slots.

## How Availability Works
- Availability is stored as weekly recurring rows for each weekday.
- Each row has `dayOfWeek`, `startTime`, `endTime`, and `isAvailable`.
- When a public date is selected, the backend:
  - resolves the weekday
  - fetches that availability row
  - generates slots in `duration` intervals
  - removes scheduled bookings
  - removes past slots if the date is today

## Seed Data
The seed script creates:
- 1 default admin user
- 3 event types
- weekly availability for all 7 days
- 1 upcoming booking
- 1 past booking

This lets the dashboard and booking flows look populated immediately.

## Seed Verification Guidance
After running `npm run db:seed`, verify:
- `GET /api/event-types` returns 3 seeded event types
- `GET /api/availability` returns 7 weekday rows
- `GET /api/bookings/upcoming` returns at least 1 booking
- `GET /api/bookings/past` returns at least 1 booking

## Final Run Checklist

### Backend
1. Install dependencies with `npm install`
2. Create the MySQL database
3. Copy `.env.example` to `.env`
4. Set `DATABASE_URL`
5. Run `npx prisma generate`
6. Run `npx prisma migrate dev --name init`
7. Run `npm run db:seed`
8. Start backend with `npm run dev`
9. Check `http://localhost:5000/api/health`

### Frontend
1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env`
3. Verify `VITE_API_BASE_URL`
4. Start frontend with `npm run dev`
5. Open `http://localhost:5173`

### Sample Data Verification
1. Open dashboard overview
2. Check seeded event types
3. Check seeded meetings
4. Open public booking page for `30-minute-meeting`

## Manual Testing Checklist

### Core Functionality
- Can create event type
- Can edit event type
- Can delete event type
- Can copy booking link
- Can save availability
- Can open public booking link
- Can see available slots
- Can book a slot
- Cannot double book the same slot
- Can see booking in upcoming meetings
- Can cancel meeting
- Cancelled slot becomes available again

### UI Checks
- Landing page looks polished on desktop
- Landing page stacks cleanly on mobile
- Dashboard navigation works on tablet/mobile
- Public booking layout stacks properly on mobile
- Buttons, cards, and forms keep consistent spacing

### Edge Cases
- Invalid email shows validation error
- Duplicate slug returns backend error
- Booking without slot selection is blocked
- No slots available state renders correctly
- Cancelled meetings show cancelled status clearly

## Deployment Instructions

### Recommended Student-Friendly Stack
- Frontend: Vercel
- Backend: Render or Railway
- Database: Railway MySQL, Aiven MySQL, or PlanetScale-compatible MySQL setup

### Deployment Order
1. Deploy MySQL database
2. Deploy backend and connect database
3. Run Prisma migrations on the deployed database
4. Seed database if needed
5. Deploy frontend with backend API URL

### Backend Environment Variables
```env
DATABASE_URL=your_remote_mysql_url
PORT=5000
CLIENT_URL=https://your-frontend-domain.com
DEFAULT_TIMEZONE=Asia/Kolkata
```

### Frontend Environment Variables
```env
VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### Prisma Deployment Notes
- Make sure the deployed backend runs `prisma generate`
- Apply migrations against the production database
- Do not point production to your local database URL

### Common Deployment Pitfalls
- Forgetting to update `CLIENT_URL` for CORS
- Forgetting `/api` in the frontend base URL
- Not running Prisma migrations before testing live APIs
- Using a database host that blocks external connections
- Not reseeding when demo data is expected

## Assumptions Made
- No authentication was required
- A single seeded default admin user acts as the system owner
- Timezone handling is intentionally simple and practical
- Weekly recurring availability is the main scheduling rule
- Date-specific overrides and calendar sync were treated as future improvements

## Future Improvements
- Authentication and multi-user support
- Google/Outlook calendar sync
- Email confirmations and reminders
- Rescheduling flow
- Availability overrides and blackout dates
- Buffer times between meetings
- Video conferencing integrations
- Better analytics and filters

## Interview Explanation Notes

### Project Overview
This is a full-stack scheduling platform inspired by Calendly. It allows an admin user to create bookable event types, configure weekly availability, share public booking links, accept bookings, and manage meetings from a dashboard.

### Why This Tech Stack
I chose React and Vite for a fast, component-driven frontend, Express for a simple modular API layer, MySQL for relational scheduling data, and Prisma because it keeps the schema and queries clean while giving strong TypeScript safety.

### Database Design
The `User` model is the organizer. `EventType` stores bookable meeting templates. `Availability` stores recurring weekly hours per day. `Booking` stores invitee details, meeting time, status, and links back to both the event type and organizer.

### Booking Logic
When a public user selects a date, the backend finds the event type, reads the organizer’s weekly availability for that weekday, generates slots using the event duration, removes already scheduled bookings, and filters out past slots for today.

### Double Booking Prevention
The backend prevents conflicts in two layers: it excludes occupied slots when listing availability, and it rechecks slot availability inside a transaction before creating a booking. Cancelled bookings do not block a slot.

### Availability Logic
Availability is modeled as one row per weekday. Each row stores whether the day is available and the working window for that day. Slot generation uses those hours and the event duration as the interval.

### UI Design
The UI uses a Calendly-inspired visual system: white surfaces, bold navy headings, blue CTAs, rounded cards, soft borders, and spacious layouts. The booking flow follows the same left-details/right-calendar-and-slots pattern that users expect from Calendly.

### What I Would Improve With More Time
- Authentication and multi-user accounts
- Real timezone conversion per viewer
- Google Calendar / Outlook integration
- Email notifications
- Rescheduling flow
- Date overrides and special hours

## Submission Tips

### Before Pushing To GitHub
- Add real `.env` files to `.gitignore` only, not to Git
- Verify both apps run locally
- Confirm seeded data appears
- Check that `README.md` matches the final project structure
- Add a few screenshots to the repo if possible

### Before Sharing A Deployed Link
- Verify frontend points to deployed backend
- Verify backend CORS allows frontend domain
- Confirm migrations have run
- Confirm booking and cancellation still work on production DB
- Re-seed demo data if the database is empty

### How To Present It Confidently
- Start with the user problem: removing scheduling back-and-forth
- Show the admin flow first: event types, availability, meetings
- Then show the public booking flow end-to-end
- Explain the backend slot generation and double-booking protection
- Close with tradeoffs and the improvements you would build next

