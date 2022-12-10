import * as ToastPrimitive from "@radix-ui/react-toast";
import * as Portal from "@radix-ui/react-portal";
import { Dispatch, SetStateAction } from "react";
import { CafeProps } from "../components/Cafe/Cafe.types";

type ToastProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cafe: CafeProps;
};

const Toast = ({ open, setOpen }: ToastProps) => {
  return (
    <Portal.Root>
      <ToastPrimitive.Provider swipeDirection="right">
        <ToastPrimitive.Root
          className={`${open && "animate-[testerKey_.4s_ease-in-out]"}`}
          asChild={true}
          duration={1500}
          open={open}
          onOpenChange={setOpen}
        >
          <div className="overflow-hidden rounded-lg border border-gray-400 bg-white">
            <div className="before:animate-shimmer relative space-y-5 overflow-hidden bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-gray-300/20 before:to-transparent">
              <div className="flex space-x-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-emerald-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <b>Success!</b>
              </div>
              <p className="text-sm">Your review has been added.</p>
            </div>
          </div>
        </ToastPrimitive.Root>
        <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-50 flex flex-col gap-6 pr-3 pb-3" />
      </ToastPrimitive.Provider>
    </Portal.Root>
  );
};

export default Toast;
