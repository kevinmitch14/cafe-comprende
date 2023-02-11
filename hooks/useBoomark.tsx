import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CafeProps } from "../components/Cafe/Cafe.types";
import {
  notifyAddBookmark,
  notifyError,
  notifyRemoveBookmark,
} from "../components/shared/Toasts";

export const bookmarkHandler = (cafe: CafeProps, action: "add" | "remove") => {
  return axios.post(`/api/bookmarkHandler?action=${action}`, cafe);
};

export const useAddBookmark = (cafe: CafeProps) => {
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

export const useRemoveBookmark = (cafe: CafeProps) => {
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
