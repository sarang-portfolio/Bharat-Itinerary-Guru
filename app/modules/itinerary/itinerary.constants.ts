import { MessageHandler } from "../../utility/responseHandler";

export const ITINERARY_CONSTANTS = {
  PDF_PARSING_ERROR: new MessageHandler(500, "FAILED_TO_PARSE_PDF"),
  EMPTY_PDF_CONTENT: new MessageHandler(400, "PDF CONTENT CANNOT BE EMPTY"),
  EXTRACTION_ERROR: new MessageHandler(
    500,
    "FAILED TO EXTRACT STRUCTURED DATA FROM PDF"
  ),
  PARSE_ERROR: new MessageHandler(
    400,
    "STRUCTURED DATA IS REQUIRED FOR ITINERARY GENERATION"
  ),
  GENAI_FAILURE: new MessageHandler(500, "FAILED TO GENERATE TRAVEL ITINERARY"),
  INTERNAL_SERVER_ERROR: new MessageHandler(500, "INTERNAL SERVER ERROR"),
};
