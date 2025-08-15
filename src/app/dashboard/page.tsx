"use client";

import React, { useState, useEffect } from "react";
import { PlaygroupEvent } from "../../types";
import { useAuth } from "../../context/AuthContext";
import {
  getOrganizerEvents,
  deleteEvent,
} from "../../actions/dashboardActions";

// Mock data for development
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

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<PlaygroupEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?.organizerName) return;

      try {
        setLoading(true);
        const organizerEvents = mockEvents;
        setEvents(organizerEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        // Fallback to mock data for development
        const organizerEvents = mockEvents.filter(
          (event) => event.Organizer === user.organizerName
        );
        setEvents(organizerEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user?.organizerName]);

  const handleDelete = async (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        // Mock-only: update local state
        setEvents((prev) => prev.filter((event) => event.id !== eventId));
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.organizerName}
          </p>
        </div>
        <a
          href="/dashboard/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          + Add New Event
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {events.length}
          </div>
          <div className="text-gray-600">Total Events</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">
            {events.filter((e) => !e.Cancelled && !e.Paused).length}
          </div>
          <div className="text-gray-600">Active Events</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {events.filter((e) => e.Paused).length}
          </div>
          <div className="text-gray-600">Paused Events</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-2xl font-bold text-red-600">
            {events.filter((e) => e.Cancelled).length}
          </div>
          <div className="text-gray-600">Cancelled Events</div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {events.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No events yet
              </h3>
              <p className="text-gray-600 mb-6">
                Get started by creating your first playgroup event.
              </p>
              <a
                href="/dashboard/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Your First Event
              </a>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {event.Service}
                      </h3>
                      <div className="flex space-x-2">
                        {event.Cancelled && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Cancelled
                          </span>
                        )}
                        {event.Paused && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Paused
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <div className="flex items-center space-x-4">
                        <span>
                          📅 {formatDate(event.eventDate)} ({event.Day})
                        </span>
                        <span>⏰ {event.Time}</span>
                        <span>📍 {event.Location}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>👶 {event.Age}</span>
                        <span>🗣️ {event.Language}</span>
                        <span>🏘️ {event.Area}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {event.Coffee && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            ☕ Coffee
                          </span>
                        )}
                        {event.Parking && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                            🚗 Parking
                          </span>
                        )}
                        {event.WiFi && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                            📶 WiFi
                          </span>
                        )}
                        {event.Toys && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-orange-100 text-orange-800">
                            🧸 Toys
                          </span>
                        )}
                        {event.Outdoor && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                            🌳 Outdoor
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-6">
                    <a
                      href={`/dashboard/edit/${event.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white mr-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </a>

                    {/* Separator */}
                    <div className="w-px h-12 bg-gray-200" />

                    <button
                      // onClick={() => handlePause(event.id!)}
                      className="bg-sky-400 hover:bg-sky-600 text-white ml-4  px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Pause
                    </button>

                    <button
                      // onClick={() => handleCancel(event.id!)}
                      className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleDelete(event.id!)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
