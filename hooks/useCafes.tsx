import axios from "axios";
import { useQuery } from "react-query";
import { CafeProps } from "../components/Cafe/Cafe.types";

export const useCafes = () => {
  return useQuery<CafeProps[], Error>(
    ["cafes"],
    async () => {
      return axios.get("/api/cafes").then((res) => res.data);
    },
    { refetchOnWindowFocus: false }
  );
};
