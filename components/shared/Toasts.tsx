import toast from 'react-hot-toast';

export const notifyAddCafe = () => toast.success('Review succesfully added.');
export const notifyAddBookmark = () => toast.success('Bookmark succesfully added.');
export const notifyRemoveBookmark = () => toast.success('Bookmark succesfully removed.');
export const notifyError = (message: string) => toast.error(`Operation failed, please try again. ${message}`)