import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string | null) => {
  if (token) {
    const decodedData = jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};
