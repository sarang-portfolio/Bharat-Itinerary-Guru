import fs from "fs";
import path from "path";
import {
  BASE_PDF_PATH,
  ITINERARY_PROMPT_PATH,
  PDF_PARSER_PROMPT_PATH,
} from "../../common/constants/common.constants";
import { itineraryModel, pdfParserModel } from "../../utility/genAi";
import { parseJSONOutput } from "../../utility/jsonParser";
import { parsePDF } from "../../utility/pdfParser";
import { ITINERARY_CONSTANTS } from "./itinerary.constants";
import { Itinerary, ItineraryInput, TourDetails } from "./itinerary.types";

const PDF_PARSER_PROMPT = fs.readFileSync(PDF_PARSER_PROMPT_PATH, "utf-8");
const ITINERARY_PROMPT = fs.readFileSync(ITINERARY_PROMPT_PATH, "utf-8");

const pdfCache = new Map<string, string>(); // Cache for parsed PDFs
const structuredDataCache = new Map<string, TourDetails>(); // Cache for structured data

/**
 * Fetch and parse the PDF guide for a given city.
 */
const parseCityGuidePDF = async (city: string): Promise<string> => {
  if (pdfCache.has(city)) return pdfCache.get(city)!;

  const fileName = `${city.toLowerCase()}.pdf`;
  const filePath = path.join(BASE_PDF_PATH, fileName);

  try {
    await fs.promises.stat(filePath);
    const pdfText = await parsePDF(filePath);
    pdfCache.set(city, pdfText);
    return pdfText;
  } catch (error) {
    throw ITINERARY_CONSTANTS.PDF_PARSING_ERROR;
  }
};

/**
 * Extract structured travel data from the parsed PDF text.
 */
const extractStructuredData = async (pdfText: string): Promise<TourDetails> => {
  if (!pdfText) throw ITINERARY_CONSTANTS.EMPTY_PDF_CONTENT;
  if (structuredDataCache.has(pdfText))
    return structuredDataCache.get(pdfText)!;

  try {
    const updatedPrompt = PDF_PARSER_PROMPT.replace("{{pdfText}}", pdfText);
    const result = await pdfParserModel.generateContent(updatedPrompt);
    const structuredData = parseJSONOutput(result);
    structuredDataCache.set(pdfText, structuredData);
    return structuredData;
  } catch (error) {
    throw ITINERARY_CONSTANTS.EXTRACTION_ERROR;
  }
};

/**
 * Generate a travel itinerary based on extracted data and user preferences.
 */
const generateItinerary = async (
  parsedData: TourDetails,
  userInputs: ItineraryInput
): Promise<Itinerary> => {
  if (!parsedData || Object.keys(parsedData).length === 0) {
    throw ITINERARY_CONSTANTS.PARSE_ERROR;
  }
  try {
    const updatedPrompt = ITINERARY_PROMPT.replace(
      "{{travelDetails}}",
      JSON.stringify({ ...userInputs, ...parsedData })
    );
    const response = await itineraryModel.generateContent(updatedPrompt);
    return parseJSONOutput(response);
  } catch (error) {
    throw ITINERARY_CONSTANTS.GENAI_FAILURE;
  }
};

export default {
  parseCityGuidePDF,
  extractStructuredData,
  generateItinerary,
};
