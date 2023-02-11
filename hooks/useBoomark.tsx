import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  notifyAddBookmark,
  notifyError,
  notifyRemoveBookmark,
} from "../components/shared/Toasts";

export type BookmarkCafeDTO = {
  name: string;
  place_id: string;
  latitude: number;
  longitude: number;
};

export const bookmarkHandler = (
  cafe: BookmarkCafeDTO,
  action: "add" | "remove"
) => {
  return axios.post(`/api/bookmarkHandler?action=${action}`, cafe);
};

export const useAddBookmark = (cafe: BookmarkCafeDTO) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkHandler(cafe, "add"),
    onMutate: async () => {
      await queryClient.cancelQueries(["profile"]);
    },
    onSuccess: () => {
      notifyAddBookmark();
    },
    onError: (error: Error) => {
      notifyError(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useRemoveBookmark = (cafe: BookmarkCafeDTO) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => bookmarkHandler(cafe, "remove"),
    onMutate: async () => {
      await queryClient.cancelQueries(["profile"]);
    },
    onSuccess: () => {
      notifyRemoveBookmark();
    },
    onError: (error: Error) => {
      notifyError(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
