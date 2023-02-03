import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CafeProps, Review } from "../components/Cafe/Cafe.types";

export type Profile = {
  id: number;
  username: string;
  bookmarks: CafeProps[];
  reviews: Review[];
};

export const useProfile = ({
  email,
  enabled = true,
}: {
  email: string;
  enabled: boolean;
}) => {
  return useQuery<Profile, Error>(
    ["profile"],
    async () => {
      return axios.get(`/api/accounts/${email}`).then((res) => res.data);
    },
    { refetchOnWindowFocus: false, enabled: enabled }
  );
};
