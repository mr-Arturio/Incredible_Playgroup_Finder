export interface PlaygroupEvent {
  id?: string;
  Address: string;
  Age: string;
  Area: string;
  Cancelled: boolean;
  Coffee: boolean;
  Day: string;
  FB: string;
  Language: string;
  Location: string;
  Notes: string;
  Notes_fr: string;
  Organizer: string;
  Organizer_fr: string;
  Outdoor: boolean;
  PG_URL: string;
  PG_URL_fr: string;
  Parking: boolean;
  Scale: boolean;
  Service: string;
  Service_fr: string;
  Time: string;
  Toys: boolean;
  URL: string;
  URL_fr: string;
  eventDate: string;
  WiFi: boolean;
  Insta: string;
  Eventbrite: string;
  Registration: string;
  Registration_URL: string;
  geopoint?: {
    latitude: number;
    longitude: number;
  };
  // Optional fields that might exist
  Paused?: string;
  lat?: number;
  lng?: number;
}

// Filter criteria interface
export interface FilterCriteria {
  date: string;
  area: string;
  language: string;
  day: string;
  organizer: string;
  age: string;
  time: string;
  address: string;
}

// Language enum
export enum Language {
  ENGLISH = "en",
  FRENCH = "fr",
}

// Area enum
export enum Area {
  EAST = "East",
  WEST = "West",
  CENTRAL = "Central",
  SOUTH = "South",
}

// Time of day enum
export enum TimeOfDay {
  MORNING = "Morning",
  AFTERNOON = "Afternoon",
  EVENING = "Evening",
}

// Day of week enum
export enum DayOfWeek {
  MONDAY = "Mon",
  TUESDAY = "Tue",
  WEDNESDAY = "Wed",
  THURSDAY = "Thur",
  FRIDAY = "Fri",
  SATURDAY = "Sat",
  SUNDAY = "Sun",
}

// Age group enum
export enum AgeGroup {
  BABY_NON_WALKING = "Baby (non-walking)",
  BABY_0_12M = "Baby (0-12m)",
  BABY_0_18M = "Baby (0-18m)",
  BABY_0_24M = "Baby (0-24m)",
  CHILD_0_6Y = "Child (0-6y)",
  CHILD_3_6Y = "Child (3-6y)",
  CHILD_4_10Y = "Child (4-10y)",
}

// Map marker interface
export interface MapMarker {
  lat: number;
  lng: number;
  Address: string;
  Organizer: string;
  geopoint?: {
    latitude: number;
    longitude: number;
  };
}

// Translation mappings interface
export interface TranslationMappings {
  fr: Record<string, string>;
}

// Component props interfaces
export interface RenderEventDataTableProps {
  eventData: PlaygroupEvent[] | null;
  translation: Language;
}

export interface MapComponentProps {
  eventData: PlaygroupEvent[] | null;
  onMarkerSelect: (address: string) => void;
}

export interface FilterContainerProps {
  filterCriteria: FilterCriteria;
  onFilterChange: (key: keyof FilterCriteria, value: string) => void;
  areaOptions: string[];
  languageOptions: string[];
  organizerOptions: string[];
  ageOptions: string[];
  dayOptions: string[];
  timeOptions: string[];
  translation: Language;
}

// API response types
export interface FirestoreDataResponse {
  props: {
    eventData: PlaygroupEvent[];
  };
}

// Utility types
export type TranslationKey = keyof TranslationMappings;
export type FilterKey = keyof FilterCriteria;
