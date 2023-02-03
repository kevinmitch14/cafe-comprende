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
    <>
      <hr className="-mx-4 my-4" />
      <div className="w-full bg-zinc-50">
        {data.map((cafe, index) => {
          if (cafe.reviews.length > 0) {
            return <Cafe key={index} cafe={cafe} />;
          }
        })}
      </div>
    </>
  );
};
