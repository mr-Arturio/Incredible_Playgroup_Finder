"use client";

import React, { useState, useEffect } from "react";
import { PlaygroupEvent } from "../../types";

interface EventFormProps {
  event?: PlaygroupEvent | null;
  onSubmit: (event: Partial<PlaygroupEvent>) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

const EventForm: React.FC<EventFormProps> = ({
  event,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState<Partial<PlaygroupEvent>>({
    Service: "",
    Service_fr: "",
    eventDate: "",
    Day: "",
    Time: "",
    Location: "",
    Address: "",
    Organizer: "Sarah Johnson", // Mock organizer - will be replaced with real auth
    Organizer_fr: "Sarah Johnson",
    Language: "English",
    Age: "Baby (0-12m)",
    Area: "Central",
    Coffee: false,
    Parking: false,
    WiFi: false,
    Toys: false,
    Outdoor: false,
    Scale: false,
    Notes: "",
    Notes_fr: "",
    URL: "",
    URL_fr: "",
    PG_URL: "",
    PG_URL_fr: "",
    FB: "",
    Insta: "",
    Eventbrite: "",
    Registration: "Optional",
    Registration_URL: "",
    Cancelled: false,
    Paused: false,
    approved: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Service?.trim()) {
      newErrors.Service = "Service name is required";
    }
    if (!formData.Service_fr?.trim()) {
      newErrors.Service_fr = "French service name is required";
    }
    if (!formData.eventDate) {
      newErrors.eventDate = "Event date is required";
    }
    if (!formData.Day) {
      newErrors.Day = "Day is required";
    }
    if (!formData.Time?.trim()) {
      newErrors.Time = "Time is required";
    }
    if (!formData.Location?.trim()) {
      newErrors.Location = "Location is required";
    }
    if (!formData.Address?.trim()) {
      newErrors.Address = "Address is required";
    }
    if (!formData.Language) {
      newErrors.Language = "Language is required";
    }
    if (!formData.Age) {
      newErrors.Age = "Age group is required";
    }
    if (!formData.Area) {
      newErrors.Area = "Area is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const daysOfWeek = [
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thur", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
    { value: "Sun", label: "Sunday" },
  ];

  const languages = [
    { value: "English", label: "English" },
    { value: "French", label: "French" },
    { value: "Mandarin", label: "Mandarin" },
    { value: "Arabic", label: "Arabic" },
  ];

  const ageGroups = [
    { value: "Baby (non-walking)", label: "Baby (non-walking)" },
    { value: "Baby (0-12m)", label: "Baby (0-12m)" },
    { value: "Baby (0-18m)", label: "Baby (0-18m)" },
    { value: "Baby (0-24m)", label: "Baby (0-24m)" },
    { value: "Child (0-6y)", label: "Child (0-6y)" },
    { value: "Child (3-6y)", label: "Child (3-6y)" },
    { value: "Child (4-10y)", label: "Child (4-10y)" },
  ];

  const areas = [
    { value: "East", label: "East" },
    { value: "West", label: "West" },
    { value: "Central", label: "Central" },
    { value: "South", label: "South" },
  ];

  const registrationOptions = [
    { value: "Required", label: "Required" },
    { value: "Optional", label: "Optional" },
    { value: "None", label: "None" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name (English) *
            </label>
            <input
              type="text"
              name="Service"
              value={formData.Service || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Service ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Baby Playgroup"
            />
            {errors.Service && (
              <p className="mt-1 text-sm text-red-600">{errors.Service}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Name (French) *
            </label>
            <input
              type="text"
              name="Service_fr"
              value={formData.Service_fr || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Service_fr ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Groupe de jeu pour bébés"
            />
            {errors.Service_fr && (
              <p className="mt-1 text-sm text-red-600">{errors.Service_fr}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date *
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.eventDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600">{errors.eventDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day of Week *
            </label>
            <select
              name="Day"
              value={formData.Day || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Day ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a day</option>
              {daysOfWeek.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
            {errors.Day && (
              <p className="mt-1 text-sm text-red-600">{errors.Day}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              type="text"
              name="Time"
              value={formData.Time || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Time ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 09:00 - 11:00"
            />
            {errors.Time && (
              <p className="mt-1 text-sm text-red-600">{errors.Time}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <select
              name="Language"
              value={formData.Language || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Language ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select language</option>
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            {errors.Language && (
              <p className="mt-1 text-sm text-red-600">{errors.Language}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Group *
            </label>
            <select
              name="Age"
              value={formData.Age || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Age ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select age group</option>
              {ageGroups.map((age) => (
                <option key={age.value} value={age.value}>
                  {age.label}
                </option>
              ))}
            </select>
            {errors.Age && (
              <p className="mt-1 text-sm text-red-600">{errors.Age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Area *
            </label>
            <select
              name="Area"
              value={formData.Area || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Area ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select area</option>
              {areas.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
            {errors.Area && (
              <p className="mt-1 text-sm text-red-600">{errors.Area}</p>
            )}
          </div>
        </div>
      </div>

      {/* Location Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Location Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Name *
            </label>
            <input
              type="text"
              name="Location"
              value={formData.Location || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Location ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., Community Center"
            />
            {errors.Location && (
              <p className="mt-1 text-sm text-red-600">{errors.Location}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address *
            </label>
            <input
              type="text"
              name="Address"
              value={formData.Address || ""}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.Address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g., 123 Main St, Ottawa, ON"
            />
            {errors.Address && (
              <p className="mt-1 text-sm text-red-600">{errors.Address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Coffee"
              checked={formData.Coffee || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">☕ Coffee</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Parking"
              checked={formData.Parking || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">🚗 Parking</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="WiFi"
              checked={formData.WiFi || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">📶 WiFi</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Toys"
              checked={formData.Toys || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">🧸 Toys</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Outdoor"
              checked={formData.Outdoor || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">🌳 Outdoor</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Scale"
              checked={formData.Scale || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">⚖️ Scale</span>
          </label>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (English)
            </label>
            <textarea
              name="Notes"
              value={formData.Notes || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional information about the event..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (French)
            </label>
            <textarea
              name="Notes_fr"
              value={formData.Notes_fr || ""}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Informations supplémentaires sur l'événement..."
            />
          </div>
        </div>
      </div>

      {/* URLs */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Links & Registration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL (English)
            </label>
            <input
              type="url"
              name="URL"
              value={formData.URL || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Website URL (French)
            </label>
            <input
              type="url"
              name="URL_fr"
              value={formData.URL_fr || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playgroup URL (English)
            </label>
            <input
              type="url"
              name="PG_URL"
              value={formData.PG_URL || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/pg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playgroup URL (French)
            </label>
            <input
              type="url"
              name="PG_URL_fr"
              value={formData.PG_URL_fr || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/pg/fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              name="FB"
              value={formData.FB || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://facebook.com/group"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              name="Insta"
              value={formData.Insta || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://instagram.com/group"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eventbrite URL
            </label>
            <input
              type="url"
              name="Eventbrite"
              value={formData.Eventbrite || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://eventbrite.com/event"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Type
            </label>
            <select
              name="Registration"
              value={formData.Registration || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {registrationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration URL
            </label>
            <input
              type="url"
              name="Registration_URL"
              value={formData.Registration_URL || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://registration.com"
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Cancelled"
              checked={formData.Cancelled || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">❌ Cancelled</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="Paused"
              checked={formData.Paused || false}
              onChange={handleInputChange}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">⏸️ Paused</span>
          </label>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
        >
          {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
