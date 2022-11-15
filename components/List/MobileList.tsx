import { ChangeEvent, useRef, useState } from "react";
import { Cafe } from "../../components";
import { useCafes } from "../../hooks/useCafes";

export const MobileList = () => {
  const cancelButtonRef = useRef(null);
  const [checked, setChecked] = useState(false);
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };
  const { isLoading, isError, error, data } = useCafes();

  if (isError) return <span>An error has occurred: + {error.message}</span>;

  return (
    <>
      <label
        className="z-10 -mt-10 flex items-center rounded-t-2xl bg-gray-50 py-3 pl-2 text-blue-500 md:hidden"
        htmlFor="list"
      >
        {checked ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Close List</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
              />
            </svg>
            <span className="pl-1">List View</span>
          </>
        )}
      </label>
      <input
        className="peer hidden"
        type={"checkbox"}
        id="list"
        ref={cancelButtonRef}
        onChange={(e) => handleCheck(e)}
      ></input>
      <div className="hidden h-0 w-full divide-y divide-solid overflow-y-auto peer-checked:block peer-checked:h-auto md:block">
        {isLoading && (
          <svg
            className="mx-auto mt-8 h-6 w-6 animate-spin text-gray-400"
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
        )}
        {data &&
          data.map((cafe, index) => {
            return <Cafe key={index} cafe={cafe} />;
          })}
      </div>
    </>
  );
};
