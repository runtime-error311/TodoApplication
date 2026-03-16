export const AUTH_API = import.meta.env.VITE_API_URL+'/auth';
export const TODO_API = import.meta.env.VITE_API_URL+'/todo';
export const emptyString = "";
export const splitString = "T";
export const today = new Date().toISOString().split(splitString)[0];
export const mode = {add:"add",edit:"edit"};
export const VITE_CRYPTO_SECRET=import.meta.env.VITE_CRYPTO_SECRET;

export const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

export const authInputStyle = " border-2 border-black my-2 mx-5 rounded-lg p-1 focus:ring-2 ring-black";


