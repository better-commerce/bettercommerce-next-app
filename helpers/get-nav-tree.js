import { decrypt } from "@utils/cipher";
import { NAV_TREE } from "@utils/constants";

export default () => {
  if (typeof localStorage !== "undefined") {
    const navTree = localStorage.getItem(NAV_TREE);

    try {
      if (navTree) {
        const data = JSON.parse(decrypt(navTree));
        return data;
      }
    } catch (err) {
      return null;
    }
  }
  return undefined;
};
