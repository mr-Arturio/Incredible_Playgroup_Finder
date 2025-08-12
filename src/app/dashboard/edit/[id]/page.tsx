"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import EventForm from "../../../../components/dashboard/EventForm";
import { PlaygroupEvent } from "../../../../types";

// Mock data for development - replace with real Firebase data later
const mockEvents: PlaygroupEvent[] = [
  {
    id: "1",
    Service: "EarlyON Playgroup",
    Service_fr: "EarlyON Playgroup",
    eventDate: "2025-08-19",
    Day: "Tue",
    Time: "16:30 - 18:30",
    Location: "Parent Resource Centre",
    Address: "300 Goulburn Cres.",
    Organizer: "Parent Resource Centre",
    Organizer_fr: "Centre de ressources pour parents",
    Language: "English",
    Age: "Child (0-6y)",
    Area: "Central",
    Coffee: false,
    Parking: true,
    WiFi: true,
    Toys: true,
    Outdoor: true,
    Scale: true,
    Notes: "",
    Notes_fr: "",
    URL: "https://www.parentresource.ca",
    URL_fr: "https://www.parentresource.ca",
    PG_URL: "https://www.parentresource.ca/playgroup-schedule",
    PG_URL_fr: "https://www.parentresource.ca/playgroup-schedule",
    FB: "https://www.facebook.com/parentresourcecentre",
    Insta: "https://www.instagram.com/parentresource",
    Eventbrite:
      "https://www.eventbrite.ca/o/ottawa-parent-resource-centre-7963790017",
    Registration: "",
    Registration_URL: "",
    Cancelled: false,
    Paused: false,
    geopoint: {
      latitude: 45.42138,
      longitude: -75.67077,
    },
  },
  {
    id: "2",
    Service: "EarlyON Playgroup",
    Service_fr: "EarlyON Playgroup",
    eventDate: "2025-08-20",
    Day: "Wed",
    Time: "09:00 - 11:00",
    Location: "Parent Resource Centre",
    Address: "300 Goulburn Cres.",
    Organizer: "Parent Resource Centre",
    Organizer_fr: "Centre de ressources pour parents",
    Language: "English",
    Age: "Child (0-6y)",
    Area: "Central",
    Coffee: false,
    Parking: true,
    WiFi: true,
    Toys: true,
    Outdoor: true,
    Scale: true,
    Notes:
      "Our Caregiver group provides access to our play areas for children (nb to 6 years) accompanied by childcare providers, grandparents, extended family members, foster parents, nannies, and other early years care professionals. Early Childhood Development Specialists are on-site for support and to answer questions.",
    Notes_fr:
      "Notre groupe pour les personnes aidantes offre l’accès à nos espaces de jeu pour les enfants (de la naissance à 6 ans) accompagnés par des prestataires de soins, des grands-parents, des membres de la famille élargie, des parents d’accueil, des nourrices ou d’autres professionnels de la petite enfance. Des spécialistes du développement de la petite enfance sont sur place pour offrir du soutien et répondre aux questions.",
    URL: "https://www.parentresource.ca",
    URL_fr: "https://www.parentresource.ca",
    PG_URL: "https://www.parentresource.ca/playgroup-schedule",
    PG_URL_fr: "https://www.parentresource.ca/playgroup-schedule",
    FB: "https://www.facebook.com/parentresourcecentre",
    Insta: "https://www.instagram.com/parentresource",
    Eventbrite:
      "https://www.eventbrite.ca/o/ottawa-parent-resource-centre-7963790017",
    Registration: "",
    Registration_URL: "",
    Cancelled: false,
    Paused: false,
    geopoint: {
      latitude: 45.42138,
      longitude: -75.67077,
    },
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
