import jwt from "jsonwebtoken";

export const decodeToken = (token) => {
  return jwt.decode(token, { complete: true });
};
// console.log(decodeToken);