import { Server } from "http";
import request from "supertest";
import { app, startServer } from "../../app";
import itineraryService from "./itinerary.service";

// Mocking itineraryService functions
jest.mock("../itinerary/itinerary.service.ts");

describe("POST /generate Itinerary API", () => {
  let server: Server;

  beforeAll(async () => {
    try {
      server = await startServer();
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    server.close();
    jest.clearAllMocks();
  });
  const mockRequestData = {
    city: "Paris",
    duration: "3 days",
    budget: 500,
    numberOfPeople: 2,
  };

  const mockParsedData = "Some extracted text from PDF";
  const mockStructuredData = { attractions: ["Eiffel Tower", "Louvre Museum"] };
  const mockItinerary = {
    city: "Paris",
    duration: "3 days",
    budget: 1000,
    numberOfPeople: 2,
    itinerary: [
      {
        day: 1,
        morning: "Visit Eiffel Tower",
        afternoon: "Louvre Museum",
        evening: "Seine River Cruise",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and a generated itinerary on success", async () => {
    (itineraryService.parseCityGuidePDF as jest.Mock).mockResolvedValue(
      mockParsedData
    );
    (itineraryService.extractStructuredData as jest.Mock).mockResolvedValue(
      mockStructuredData
    );
    (itineraryService.generateItinerary as jest.Mock).mockResolvedValue(
      mockItinerary
    );

    const response = await request(app)
      .post("/itinerary/generate")
      .send(mockRequestData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toEqual(expect.objectContaining(mockItinerary));
    expect(response.body.error).toBeNull();

    expect(itineraryService.parseCityGuidePDF).toHaveBeenCalledWith(
      mockRequestData.city
    );
    expect(itineraryService.extractStructuredData).toHaveBeenCalledWith(
      mockParsedData
    );
    expect(itineraryService.generateItinerary).toHaveBeenCalledWith(
      mockStructuredData,
      mockRequestData
    );
  });
});
