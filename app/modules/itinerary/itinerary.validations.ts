import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { validateSchema } from "../../utility/vaidator";
import { ItineraryInput } from "./itinerary.types";

export const generateItinerarySchema: ObjectSchema<ItineraryInput> =
  Joi.object<ItineraryInput>({
    city: Joi.string().trim().required().messages({
      "string.empty": "CITY IS REQUIRED.",
    }),

    duration: Joi.string().trim().required().messages({
      "string.empty": "DURATION IS REQUIRED.",
    }),

    budget: Joi.number().positive().required().messages({
      "number.base": "BUDGET MUST BE A VALID NUMBER.",
      "number.positive": "BUDGET MUST BE A POSITIVE VALUE.",
      "any.required": "BUDGET IS REQUIRED.",
    }),

    numberOfPeople: Joi.number().positive().optional().messages({
      "number.base": "NUMBER OF PEOPLE MUST BE A VALID NUMBER.",
      "number.positive": "NUMBER OF PEOPLE MUST BE A POSITIVE VALUE.",
    }),
  });

export const validateItinerary = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  validateSchema(generateItinerarySchema, req.body);
  next();
};
