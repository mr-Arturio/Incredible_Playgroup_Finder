# Dashboard Documentation

## Overview

The dashboard is a secure, scalable admin interface for organizers to manage their playgroup events. Each organizer can only see and manage their own events.

## Features

###  Authentication
- Simple login system (currently mock, ready for Firebase Auth)
- Session persistence
- Automatic redirect to login for unauthenticated users

###  Dashboard Overview
- View all events for the logged-in organizer
- Statistics cards showing total, active, paused, and cancelled events
- Quick actions to add new events

###  Create New Events
- Comprehensive form with all required fields
- Support for both English and French content
- Feature toggles (Coffee, Parking, WiFi, Toys, Outdoor, Scale)
- URL fields for various platforms (Website, Facebook, Instagram, Eventbrite)
- Registration options

###  Edit Events
- Pre-populated form with existing event data
- Same comprehensive form as create
- Real-time validation

###  Delete Events
- Confirmation dialog before deletion
- Immediate UI update after successful deletion

## File Structure

```
src/app/dashboard/
├── layout.tsx              # Dashboard layout with sidebar and auth
├── page.tsx                # Main dashboard page (event list)
├── login/
│   └── page.tsx           # Login page
├── new/
│   └── page.tsx           # Create new event page
└── edit/[id]/
    └── page.tsx           # Edit event page

src/components/dashboard/
└── EventForm.tsx          # Reusable form component

src/actions/
└── dashboardActions.ts     # Firebase operations

src/context/
└── AuthContext.tsx        # Authentication context
```

## Authentication

### Current Implementation (Mock)
- **Email:** sarah@example.com
- **Password:** password
- Uses localStorage for session persistence

### Future Implementation (Firebase Auth)
The mock authentication can be easily replaced with Firebase Auth by:
1. Installing Firebase Auth
2. Updating the `AuthContext.tsx` to use Firebase Auth
3. Replacing the login logic in the login page

## Database Operations

### Firebase Actions
- `getOrganizerEvents(organizerName)` - Fetch events for specific organizer
- `getEventById(eventId)` - Get single event
- `createEvent(eventData)` - Create new event
- `updateEvent(eventId, eventData)` - Update existing event
- `deleteEvent(eventId)` - Delete event
- `isAuthorizedForEvent(organizerName, eventId)` - Check authorization

### Event Structure
Each event includes:
- **Basic Info:** Service name (EN/FR), date, time, day, location, address
- **Details:** Language, age group, area, organizer
- **Features:** Coffee, parking, WiFi, toys, outdoor, scale
- **Content:** Notes (EN/FR), URLs for various platforms
- **Status:** Cancelled, paused, approved (default: false)

## Security Features

### Authorization
- Users can only see their own events
- Edit/delete operations check authorization
- Automatic redirect for unauthenticated users

### Data Validation
- Form validation on client side
- Required field validation
- URL format validation
- Date format validation

## UI/UX Features

### Responsive Design
- Mobile-friendly layout
- Responsive sidebar
- Clean, modern interface

### Loading States
- Loading spinners during data fetching
- Disabled buttons during form submission
- Error handling with user-friendly messages

### User Experience
- Intuitive navigation
- Clear action buttons
- Confirmation dialogs for destructive actions
- Form validation with clear error messages

## Development Notes

### Mock Data
The dashboard currently uses mock data for development. To switch to real Firebase data:

1. Ensure Firebase is properly configured
2. Update the dashboard pages to use real Firebase actions
3. Remove mock data fallbacks

### Environment Variables
Required Firebase environment variables:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

### Future Enhancements
- Real Firebase Auth integration
- Address-to-geopoint transformation
- Admin panel for approving events
- Bulk operations
- Event templates
- Advanced filtering and search

## Usage

1. Navigate to `/dashboard/login`
2. Login with demo credentials
3. View your events on the dashboard
4. Create new events or edit existing ones
5. Use the sidebar for navigation

The dashboard is designed to be intuitive for non-technical users while providing all necessary functionality for event management. 