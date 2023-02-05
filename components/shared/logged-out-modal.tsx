import { signIn } from "next-auth/react";
import GoogleIcon from "./Google";
import { LoadingDots } from "./LoadingDots";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { Session } from "next-auth";

export default function LoggedOutModal({
  session,
  dialogOpen,
  setDialogOpen,
}: {
  session: Session | null;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [loggedOutAction, setLoggedOutAction] = useState(false);
  return (
    <Dialog open={dialogOpen && !session} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            You must be logged in to complete this action.
          </DialogTitle>
          <DialogDescription>
            Log in with one of the options below to continue.
            <div className="p-4 mt-2">
              <button
                disabled={loggedOutAction}
                className={`${
                  loggedOutAction
                    ? "cursor-not-allowed border-gray-200 bg-gray-100"
                    : "border border-gray-200 bg-white text-black hover:bg-gray-50"
                } inline-flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                onClick={() => {
                  setLoggedOutAction(true);
                  signIn("google");
                }}
              >
                {loggedOutAction ? (
                  <LoadingDots variant="dark" />
                ) : (
                  <>
                    <GoogleIcon className="h-5 w-5" />
                    <p>Sign In with Google</p>
                  </>
                )}
              </button>
            </div>
          </DialogDescription>
          <DialogContent></DialogContent>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
