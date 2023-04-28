// @utils
import { GRID_COL_FIELDS } from "@utils/constants";

export default () => {
  if (typeof localStorage !== "undefined") {
    const gridColumnFields = localStorage.getItem(GRID_COL_FIELDS);

    try {
      if (gridColumnFields) {
        const info = JSON.parse(gridColumnFields);
        return info;
      }
    } catch (err) {
      return null;
    }
  }
  return undefined;
};
