import { decrypt } from "@utils/cipher";
import { TOKEN_INFO } from "@utils/constants";

export default () => {
  if (typeof localStorage !== "undefined") {
    const userInfo = localStorage.getItem(TOKEN_INFO);

    try {
      if (userInfo) {
        const info = JSON.parse(decrypt(userInfo));
        return info;
      }
    } catch (err) {
      return null;
    }
  }
  return undefined;
};
