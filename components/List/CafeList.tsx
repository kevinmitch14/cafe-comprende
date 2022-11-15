import { Cafe } from "..";
import { useCafes } from "../../hooks/useCafes";

export const CafeList = () => {
  const { isLoading, isError, error, data } = useCafes();

  if (isLoading) return <span>Loading...</span>;
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="mt-4 rounded-t-lg border-t">
      <div className="w-full divide-y divide-solid duration-500">
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
    </div>
  );
};
