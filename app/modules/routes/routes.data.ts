import { ItineraryRouter } from "../itinerary/itinerary.routes";
import { Route, Routes } from "./routes.types";

export const routes: Routes = [new Route("/itinerary", ItineraryRouter)];
