export type Review = {
  id: number;
  accountId: number;
  placeID: string;
  rating: number;
};
export type CafeProps = {
  googlePlaceID: string;
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
  googlePlaceID: string;
  rating: number;
};
