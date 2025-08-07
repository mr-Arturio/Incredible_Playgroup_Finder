"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EventForm from "../../../../components/dashboard/EventForm";
import { PlaygroupEvent } from "../../../../types";

// Mock data for development - replace with real Firebase data later
const mockEvents: PlaygroupEvent[] = [
  {
    id: "1",
    Service: "Baby Playgroup",
    Service_fr: "Groupe de jeu pour bébés",
    eventDate: "2024-01-15",
    Day: "Mon",
    Time: "09:00 - 11:00",
    Location: "Community Center",
    Address: "123 Main St, Ottawa, ON",
    Organizer: "Sarah Johnson",
    Organizer_fr: "Sarah Johnson",
    Language: "English",
    Age: "Baby (0-12m)",
    Area: "Central",
    Coffee: true,
    Parking: true,
    WiFi: false,
    Toys: true,
    Outdoor: false,
    Scale: false,
    Notes: "A welcoming space for new parents and babies",
    Notes_fr: "Un espace accueillant pour les nouveaux parents et bébés",
    URL: "https://example.com",
    URL_fr: "https://example.com/fr",
    PG_URL: "https://example.com/pg",
    PG_URL_fr: "https://example.com/pg/fr",
    FB: "https://facebook.com/group",
    Insta: "https://instagram.com/group",
    Eventbrite: "https://eventbrite.com/event",
    Registration: "Required",
    Registration_URL: "https://registration.com",
    Cancelled: false,
    Paused: false,
  },
  {
    id: "2",
    Service: "Toddler Playgroup",
    Service_fr: "Groupe de jeu pour tout-petits",
    eventDate: "2024-01-16",
    Day: "Tue",
    Time: "10:00 - 12:00",
    Location: "Library",
    Address: "456 Oak Ave, Ottawa, ON",
    Organizer: "Sarah Johnson",
    Organizer_fr: "Sarah Johnson",
    Language: "French",
    Age: "Child (0-6y)",
    Area: "East",
    Coffee: false,
    Parking: true,
    WiFi: true,
    Toys: true,
    Outdoor: true,
    Scale: false,
    Notes: "Outdoor activities when weather permits",
    Notes_fr: "Activités extérieures quand le temps le permet",
    URL: "https://example2.com",
    URL_fr: "https://example2.com/fr",
    PG_URL: "https://example2.com/pg",
    PG_URL_fr: "https://example2.com/pg/fr",
    FB: "https://facebook.com/group2",
    Insta: "https://instagram.com/group2",
    Eventbrite: "https://eventbrite.com/event2",
    Registration: "Optional",
    Registration_URL: "https://registration2.com",
    Cancelled: false,
    Paused: false,
  },
];

const EditEventPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [event, setEvent] = useState<PlaygroupEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // TODO: Replace with real Firebase fetch
        const foundEvent = mockEvents.find((e) => e.id === eventId);

        if (!foundEvent) {
          setError("Event not found");
          return;
        }

        setEvent(foundEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleSubmit = async (eventData: Partial<PlaygroupEvent>) => {
    setSubmitting(true);

    try {
      // TODO: Implement Firebase update
      console.log("Updating event:", eventData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard after successful update
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600 mt-2">
            Update your playgroup event details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
          <p className="text-sm text-gray-600 mt-1">
            Make changes to your event below.
          </p>
        </div>
        <div className="p-6">
          <EventForm
            event={event}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
