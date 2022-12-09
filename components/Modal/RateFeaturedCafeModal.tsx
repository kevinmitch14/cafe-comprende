import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CafeDTO } from "../Cafe/Cafe.types";
import { ModalLayout } from "./ModalLayout";
import { LoadingDots } from "../../utils/LoadingDots";

type RatingModalProps = {
  cafe: CafeDTO;
  handleDialog: () => void;
  handleSubmitReview: () => void;
};

const FeatureButton = ({ text }: { text: string }) => {
  const [toggled, setToggled] = useState(false);
  return (
    <button
      type="button"
      className={`rounded border bg-gray-100 p-1 text-sm ${toggled && ""}`}
      onClick={() => setToggled((prev) => !prev)}
    >
      <div className="flex items-center justify-center gap-1">
        {text}{" "}
        {toggled && <CheckCircleIcon className="h-4 w-4 text-emerald-600" />}
      </div>
    </button>
  );
};

export const RateFeaturedCafeModal = ({
  cafe,
  handleDialog,
  handleSubmitReview,
}: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const queryClient = useQueryClient();

  const addCafeFromList = useMutation(
    (cafe: CafeDTO) => {
      return axios.post("/api/createReview", cafe);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries(["cafes"]);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["cafes"]);
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
                        key={`rating-button ${number}`}
                        className="bold rounded-lg border p-1 px-4 transition-[focus] duration-500 hover:bg-gray-100 focus:bg-emerald-600 focus:text-white"
                        onClick={() => setRating(number)}
                        value={number}
                      >
                        {number}
                      </button>
                    );
                  })}
                </div>
                {/* <div className="mt-4 flex space-x-2">
                  <FeatureButton text="Price" />
                  <FeatureButton text="Wifi" />
                  <FeatureButton text="Coffee" />
                  <FeatureButton text="Parking" />
                </div> */}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full min-w-[80px] items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                addCafeFromList.mutate({ ...newCafe, rating });
              }}
            >
              {addCafeFromList.isLoading ? (
                <LoadingDots variant="light" />
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
