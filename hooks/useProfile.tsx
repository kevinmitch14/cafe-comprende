import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CafeProps, Review } from "../components/Cafe/Cafe.types";

export type Profile = {
  id: number;
  username: string;
  bookmarks: CafeProps[];
  reviews: Review[];
};

export const useProfile = () => {
  return useQuery<Profile, Error>(
    ["profile"],
    async () => {
      return axios.get("/api/accounts").then((res) => res.data);
    },
    { refetchOnWindowFocus: false }
  );
};
