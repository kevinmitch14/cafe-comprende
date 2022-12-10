import { Cafe } from "..";
import { useCafes } from "../../hooks/useCafes";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export const CafeList = () => {
  const { isLoading, isError, error, data } = useCafes();

  if (isLoading)
    return (
      <div className="mt-12">
        <LoadingSpinner />
      </div>
    );
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="mt-4 w-full divide-y divide-solid border-t">
      {data.map((cafe, index) => {
        return <Cafe key={index} cafe={cafe} />;
      })}
    </div>
  );
};
