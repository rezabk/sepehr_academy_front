export const termIdValidator = (termId) => {
  const hexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
  return hexRegExp.test(termId);
};
