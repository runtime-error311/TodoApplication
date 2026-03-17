export type UserTouched = {
  name: boolean;
  email: boolean;
  password: boolean;
};

type TodoTouched = {
  title: boolean;
  description: boolean;
};

const MIN_NAME = 3;
const MAX_NAME = 100;
const MIN_PASSWORD = 8;
const MIN_TITLE = 3;
const MAX_TITLE = 100;
const MIN_DESCRIPTION = 3;


export const passwordValidation = (
  touched: UserTouched,
  password: string
): boolean => touched.password && password.length < MIN_PASSWORD;

export const nameValidation = (
  touched: UserTouched,
  name: string
): boolean =>
  touched.name && (name.length < MIN_NAME || name.length > MAX_NAME);

export const titleValidation = (
  touched: TodoTouched,
  title: string
): boolean =>
  touched.title && (title.length < MIN_TITLE || title.length > MAX_TITLE);

export const descriptionValidation = (
  touched: TodoTouched,
  description: string
): boolean =>
  touched.description && description.length < MIN_DESCRIPTION;