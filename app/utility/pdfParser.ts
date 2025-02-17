import fs from "fs";
import pdf from "pdf-parse";

export const parsePDF = async (filePath: string): Promise<string> => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);
    const cleanedText = pdfData.text
      .replace(/\n+/g, " ") // Remove excessive new lines
      .replace(/\s+/g, " ") // Remove extra spaces
      .trim();
    return cleanedText;
  } catch (error) {
    throw error;
  }
};
