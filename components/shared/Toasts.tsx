import toast from "react-hot-toast";

export const notifyAddCafe = () => toast.success("Review successfully added.");
export const notifyAddBookmark = () =>
  toast.success("Bookmark successfully added.");
export const notifyRemoveBookmark = () =>
  toast.success("Bookmark successfully removed.");
export const notifyError = (message: string) =>
  toast.error(`Operation failed, please try again. ${message}`);
export const notifySignedOut = () => toast.success("Successfully logged out.");
