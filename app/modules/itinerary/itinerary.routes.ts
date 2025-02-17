import { Router } from "express";
import { ResponseHandler } from "../../utility/responseHandler";
import { ITINERARY_CONSTANTS } from "./itinerary.constants";
import itineraryService from "./itinerary.service";
import { validateItinerary } from "./itinerary.validations";

export const ItineraryRouter = Router();

/**
 * @swagger
 * /itinerary/generate:
 *   post:
 *     summary: Generate a travel itinerary based on city and user preferences
 *     description: Parses a city guide PDF, extracts structured travel data, and generates a personalized itinerary.
 *     tags:
 *       - Itinerary
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - duration
 *               - budget
 *             properties:
 *               city:
 *                 type: string
 *                 example: "Jaipur"
 *               duration:
 *                 type: string
 *                 example: "7 days"
 *               budget:
 *                 type: number
 *                 example: 60000
 *               numberOfPeople:
 *                 type: number
 *                 example: 2
 *                 description: Optional number of people for the trip.
 *     responses:
 *       200:
 *         description: Successfully generated the itinerary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   example: { "itinerary": { "city": "Jaipur", "budget": 50000, "days": [ { "day": 1, "morning": "Lorem Ipsum", "afternoon": "Lorem Ipsum", "evening": "Lorem Ipsum", "theme": "Lorem Ipsum" } ], "duration": "7 days", "specialFoods": ["Lorem Ipsum", "Lorem Ipsum"], "specialTips": "Lorem Ipsum", "summary": "Lorem Ipsum" } }
 *                 error:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *       400:
 *         description: Bad request due to missing or invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   example: { "statusCode": 400, "message": "STRUCTURED DATA IS REQUIRED FOR ITINERARY GENERATION" }
 *       500:
 *         description: Internal server error or failed operations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   nullable: true
 *                   example: null
 *                 error:
 *                   type: object
 *                   example: { "statusCode": 500, "message": "INTERNAL SERVER ERROR" }
 */

ItineraryRouter.post("/generate", validateItinerary, async (req, res, next) => {
  try {
    const { city, duration, budget, numberOfPeople } = req.body;
    const pdfText = await itineraryService.parseCityGuidePDF(city);
    // Extract structured data
    const structuredData = await itineraryService.extractStructuredData(
      pdfText
    );
    // Generate Itinerary
    const itinerary = await itineraryService.generateItinerary(structuredData, {
      city,
      duration,
      budget,
      numberOfPeople,
    });
    res.send(new ResponseHandler(itinerary));
  } catch (error: any) {
    if (error.statusCode !== 500) {
      next(error);
    } else {
      next(ITINERARY_CONSTANTS.INTERNAL_SERVER_ERROR);
    }
  }
});
