"use client";

import React, { useState, useEffect } from "react";
import { PlaygroupEvent } from "../../types";
import { useAuth } from "../../context/AuthContext";
import {
  getOrganizerEvents,
  deleteEvent,
} from "../../actions/dashboardActions";

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

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<PlaygroupEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?.organizerName) return;

      try {
        setLoading(true);
        const organizerEvents = await getOrganizerEvents(user.organizerName);
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
        await deleteEvent(eventId);
        setEvents(events.filter((event) => event.id !== eventId));
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
                  <div className="flex space-x-2 ml-6">
                    <a
                      href={`/dashboard/edit/${event.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(event.id!)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
