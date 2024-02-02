import { jwtDecode } from "jwt-decode";

const isJwtValid = (token) => {
  try {
    const decoded = jwtDecode(token);
    return Boolean(decoded);
  } catch (error) {
    localStorage.clear();
    return false;
  }
};

export default isJwtValid;
