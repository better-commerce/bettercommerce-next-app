import { decrypt } from "@utils/cipher";
import { API_TOKEN } from "@utils/constants";

export default () => {
  if (typeof localStorage !== "undefined") {
    const apiToken = localStorage.getItem(API_TOKEN);

    try {
      if (apiToken) {
        const token = JSON.parse(decrypt(apiToken));
        return token;
      }
    } catch (err) {
      return null;
    }
  }
  return undefined;
};
