import { decrypt } from "@utils/cipher";
import { AUTH_TOKEN } from "@utils/constants";

export default () => {
  if (typeof localStorage !== "undefined") {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    try {
      if (authToken) {
        const token = JSON.parse(decrypt(authToken));
        return token;
      }
    } catch (err) {
      return null;
    }
  }
  return undefined;
};
