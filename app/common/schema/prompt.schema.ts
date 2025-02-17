import { SchemaType } from "@google/generative-ai";

export const tourSchema = {
  description: "Tour details of the city",
  type: SchemaType.OBJECT,
  properties: {
    city: {
      type: SchemaType.STRING,
      description: "Name of the city",
      nullable: false,
    },
    attractions: {
      type: SchemaType.ARRAY,
      description: "List of attractions in the city",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "Name of the attraction",
            nullable: false,
          },
          description: {
            type: SchemaType.STRING,
            description: "Details of the attraction",
            nullable: false,
          },
        },
        required: ["name", "description"],
      },
    },
    specialFoods: {
      type: SchemaType.ARRAY,
      description: "Popular local foods of the city",
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    festivals: {
      type: SchemaType.ARRAY,
      description: "Major festivals celebrated in the city",
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    transport: {
      type: SchemaType.ARRAY,
      description: "Available transport options in the city with details",
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    shopping: {
      type: SchemaType.ARRAY,
      description: "Popular shopping markets in the city",
      items: {
        type: SchemaType.STRING,
        nullable: false,
      },
    },
    entryFees: {
      type: SchemaType.ARRAY,
      description: "Entry fees for major attractions",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "Name of the monument or place",
            nullable: false,
          },
          timings: {
            type: SchemaType.STRING,
            description: "Opening and closing timings",
            nullable: false,
          },
          fees: {
            type: SchemaType.OBJECT,
            properties: {
              adult: {
                type: SchemaType.NUMBER,
                description: "Entry fee for adults",
                nullable: false,
              },
              foreigner: {
                type: SchemaType.NUMBER,
                description: "Entry fee for foreign visitors",
                nullable: false,
              },
              child: {
                type: SchemaType.NUMBER,
                description: "Entry fee for children",
                nullable: false,
              },
            },
            required: ["adult", "foreigner", "child"],
          },
        },
        required: ["name", "timings", "fees"],
      },
    },
  },
  required: [
    "city",
    "attractions",
    "festivals",
    "specialFoods",
    "shopping",
    "transport",
    "entryFees",
  ],
};

export const itinerarySchema = {
  description: "List of Itinerary",
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description:
        "Summary of the designed city tour, with special requests asked",
      nullable: false,
    },
    city: {
      type: SchemaType.STRING,
      description: "Name of the city",
      nullable: false,
    },
    duration: {
      type: SchemaType.STRING,
      description: "Duration of stay",
      nullable: false,
    },
    specialTips: {
      type: SchemaType.STRING,
      description: "Special tips for the city",
      nullable: false,
    },
    budget: {
      type: SchemaType.INTEGER,
      description: "Budget of the trip",
      nullable: false,
    },
    specialFoods: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.STRING,
        description: "Special food of the city",
        nullable: false,
      },
    },
    days: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          day: {
            type: SchemaType.NUMBER,
            description: "Count of the day",
            nullable: false,
          },
          theme: {
            type: SchemaType.STRING,
            description: "Theme of the tour",
            nullable: false,
          },
          morning: {
            type: SchemaType.STRING,
            description: "Morning plans of the day",
            nullable: false,
          },
          afternoon: {
            type: SchemaType.STRING,
            description: "Afternoon plans of the day",
            nullable: false,
          },
          evening: {
            type: SchemaType.STRING,
            description: "Evening plans of the day",
            nullable: false,
          },
        },
        required: ["day", "theme", "morning", "afternoon", "evening"],
      },
    },
  },
  required: [
    "summary",
    "city",
    "duration",
    "specialTips",
    "budget",
    "specialFoods",
    "days",
  ],
};
