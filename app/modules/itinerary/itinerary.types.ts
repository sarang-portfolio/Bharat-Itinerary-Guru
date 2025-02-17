export interface ItineraryInput {
  city: string;
  duration: string;
  budget: number;
  numberOfPeople: number;
}

export interface TourDetails {
  city: string;
  attractions: Attraction[];
  specialFoods: string[];
  festivals: string[];
  transport: string[];
  shopping: string[];
  entryFees: EntryFee[];
}

export interface Attraction {
  name: string;
  description: string;
}

export interface EntryFee {
  name: string;
  timings: string;
  fees: {
    adult: number;
    foreigner: number;
    child: number;
  };
}

export interface Itinerary {
  summary: string;
  city: string;
  duration: string;
  specialTips: string;
  budget: number;
  specialFoods: string[];
  days: ItineraryDay[];
}

export interface ItineraryDay {
  day: number;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
}
