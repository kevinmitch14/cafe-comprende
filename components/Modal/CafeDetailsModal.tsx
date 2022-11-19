import { Dialog } from "@headlessui/react";
import { CafeProps } from "../Cafe/Cafe.types";
import { ModalLayout } from "./ModalLayout";

const tick = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

type CafeModalProps = {
  cafe: CafeProps;
  handleDialog: () => void;
};

export const CafeDetailsModal = ({ cafe, handleDialog }: CafeModalProps) => {
  return (
    <ModalLayout
      handleDialog={handleDialog}
      content={
        <Dialog.Panel className="relative w-[90%] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <Dialog.Title
                as="h3"
                className="text-center text-lg font-medium leading-6 text-gray-900"
              >
                {cafe.name}
              </Dialog.Title>
              <div className="pt-4">
                <p className="flex">
                  {tick}
                  Wifi speed
                </p>
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Wifi speed
                </p>
                <p>Password</p>
                <p>Access to plugs</p>
                <p>Noise</p>
                <p>Coffee</p>
                <p>Food</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleDialog()}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      }
    ></ModalLayout>
  );
};
