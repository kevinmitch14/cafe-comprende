import { Cafe } from "..";
import { useCafes } from "../../hooks/useCafes";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const CafeList = () => {
  const { isLoading, isError, error, data } = useCafes();

  if (isLoading)
    return (
      <div className="mt-12">
        <LoadingSpinner size="base" />
      </div>
    );
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="mt-4 w-full border-t bg-zinc-50 p-2 px-4">
      {data.map((cafe, index) => {
        if (cafe.reviews.length > 0) {
          return <Cafe key={index} cafe={cafe} />;
        }
      })}
    </div>
  );
};
