import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CafeDTO } from "../Cafe/Cafe.types";
import { ModalLayout } from "./ModalLayout";
import { LoadingDots } from "../shared/LoadingDots";
import { notifyAddCafe } from "../shared/Toasts";
import { useSession } from "next-auth/react";

type RatingModalProps = {
  cafe: CafeDTO;
  handleDialog: () => void;
  handleSubmitReview: () => void;
};

export const RateFeaturedCafeModal = ({
  cafe,
  handleDialog,
  handleSubmitReview,
}: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const addCafeFromList = useMutation(
    (cafe: CafeDTO) => {
      return axios.post("/api/addReview", {
        ...cafe,
        email: session?.user?.email,
      });
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["cafes"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["cafes"]);
        notifyAddCafe();
        handleDialog();
        handleSubmitReview();
      },
    }
  );

  // TODO implement Zod function in the parse
  const newCafe = {
    name: cafe.name,
    latitude: cafe.latitude,
    longitude: cafe.longitude,
    place_id: cafe.place_id,
  };

  return (
    <ModalLayout
      handleDialog={handleDialog}
      content={
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 flex flex-col items-center">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {cafe.name}
              </Dialog.Title>
              <div className="mt-2 ">
                <div className="flex justify-center gap-x-1 text-sm">
                  {[1, 2, 3, 4, 5].map((number) => {
                    return (
                      <button
                        key={`rating-button-${number}`}
                        data-state={number === rating && "active"}
                        type="button"
                        className="bold rounded-lg border p-1 px-4 hover:bg-gray-100 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                        onClick={() => setRating(number)}
                        value={number}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              disabled={rating === 0}
              className="inline-flex w-full min-w-[80px] items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:hover:cursor-not-allowed sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                addCafeFromList.mutate({ ...newCafe, rating });
              }}
            >
              {addCafeFromList.isLoading ? (
                <div className="flex h-6 w-6 items-center">
                  <LoadingDots variant="light" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleDialog()}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      }
    ></ModalLayout>
  );
};
