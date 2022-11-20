import { z } from "zod";

export type Review = {
  id: number;
  accountId: number;
  placeID: string;
  rating: number;
};

export type Geometry = {
  location: {
    lat: () => number;
    lng: () => number;
  };
};

export type CafeProps = {
  place_id: string;
  latitude: number;
  longitude: number;
  name: string;
  updatedAt: Date;
  reviews: Review[];
};

export type CafeDTO = {
  name: string;
  latitude: number;
  longitude: number;
  place_id: string;
  rating?: number;
};

export const PlacesTest = z.object({
  location: z.object({
    lat: z.function().returns(z.number()),
    lng: z.function().returns(z.number()),
  }),
});

// TODO zod functions implement check docs
export const GooglePlacesAPIValidator = z.object({
  name: z.string(),
  geometry: PlacesTest,
  place_id: z.string(),
});

export type GooglePlacesResponse = z.infer<typeof GooglePlacesAPIValidator>;
