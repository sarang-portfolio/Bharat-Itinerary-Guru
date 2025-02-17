import path from "path";

export const BASE_PDF_PATH = path.join(__dirname, "..", "tours");

export const PDF_PARSER_PROMPT_PATH = path.join(
  __dirname,
  "..",
  "prompts",
  "pdfParse.prompt.txt"
);

export const ITINERARY_PROMPT_PATH = path.join(
  __dirname,
  "..",
  "prompts",
  "itinerary.prompt.txt"
);
