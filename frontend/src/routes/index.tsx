import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { AdminLayout } from "@/layout/admin-layout";
import { PublicLayout } from "@/layout/public-layout";
import { AvailabilityPage } from "@/pages/availability-page";
import { BookingConfirmationPage } from "@/pages/booking-confirmation-page";
import { DashboardOverviewPage } from "@/pages/dashboard-overview-page";
import { EventTypeFormPage } from "@/pages/event-type-form-page";
import { EventTypesListPage } from "@/pages/event-types-list-page";
import { LandingPage } from "@/pages/landing-page";
import { MeetingsPage } from "@/pages/meetings-page";
import { NotFoundPage } from "@/pages/not-found-page";
import { PublicBookingPage } from "@/pages/public-booking-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: "book/:slug", element: <PublicBookingPage /> },
          { path: "book/:slug/confirm", element: <BookingConfirmationPage /> }
        ]
      },
      {
        path: "dashboard",
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardOverviewPage /> },
          { path: "event-types", element: <EventTypesListPage /> },
          { path: "event-types/new", element: <EventTypeFormPage mode="create" /> },
          { path: "event-types/:id/edit", element: <EventTypeFormPage mode="edit" /> },
          { path: "availability", element: <AvailabilityPage /> },
          { path: "meetings", element: <MeetingsPage /> }
        ]
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);

