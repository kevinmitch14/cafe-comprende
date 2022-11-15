import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { OfficeBuildingIcon } from "@heroicons/react/solid";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { CafeDTO, CafeProps } from "../Cafe/Cafe.types";
import { ModalLayout } from "./ModalLayout";

type RatingModalProps = {
  cafe: CafeProps;
  handleDialog: () => void;
};

export const RatingModal = ({ cafe, handleDialog }: RatingModalProps) => {
  const [rating, setRating] = useState<number>(0);
  const queryClient = useQueryClient();

  const addCafeFromList = useMutation(
    (cafe: CafeDTO) => {
      return axios.post("/api/createReview", cafe);
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries("cafes");
      },
      onSettled: () => {
        queryClient.invalidateQueries("cafes");
        handleDialog();
      },
    }
  );

  return (
    <ModalLayout
      handleDialog={handleDialog}
      content={
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                <OfficeBuildingIcon
                  className="h-6 w-6 text-gray-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {cafe.name}
                </Dialog.Title>
                <div className="mt-2 ">
                  <p className="text-sm text-gray-500">
                    Blah Blah Blah, rate this cafe.
                  </p>
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
                  <label htmlFor="comments" className="text-sm text-gray-500">
                    Additional comments
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    className="w-full bg-gray-100 text-sm"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full min-w-[80px] justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                addCafeFromList.mutate({ ...cafe, rating });
              }}
            >
              {addCafeFromList.isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
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
