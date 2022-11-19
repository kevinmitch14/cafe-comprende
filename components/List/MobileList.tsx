import { ChangeEvent, useRef, useState } from "react";
import { Cafe } from "../../components";
import { useCafes } from "../../hooks/useCafes";
import { LoadingSpinner } from "../../utils/LoadingSpinner";
import { ChevronDoubleUpIcon, XCircleIcon } from "@heroicons/react/solid";

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
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <label
        className="z-10 -mt-10 flex items-center rounded-t-2xl bg-gray-50 py-3 pl-2 text-blue-500 md:hidden"
        htmlFor="list"
      >
        {checked ? (
          <>
            <XCircleIcon className="h-5 w-5" />
            <span>Close List</span>
          </>
        ) : (
          <>
            <ChevronDoubleUpIcon className="h-5 w-5" />
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
        {data.map((cafe, index) => {
          return <Cafe key={index} cafe={cafe} />;
        })}
      </div>
    </>
  );
};
