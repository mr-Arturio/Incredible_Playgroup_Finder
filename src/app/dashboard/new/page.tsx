"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EventForm from "../../../components/dashboard/EventForm";
import { PlaygroupEvent } from "../../../types";

const NewEventPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (eventData: Partial<PlaygroupEvent>) => {
    setLoading(true);

    try {
      // TODO: Implement Firebase create
      console.log("Creating new event:", eventData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to dashboard after successful creation
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
          <p className="text-gray-600 mt-2">
            Add a new playgroup event to your dashboard
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Event Details</h2>
          <p className="text-sm text-gray-600 mt-1">
            Fill in the details below to create your new playgroup event.
          </p>
        </div>
        <div className="p-6">
          <EventForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default NewEventPage;
