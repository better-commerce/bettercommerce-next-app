import { stringToBoolean } from "./parse-util";

export const APP_ROUTES = {
  SSO_MIDDLEWARE: "/account/sso",
  LOGIN: "/login",
  LOGIN_ERROR: "/account/login/error",
  HOME: "/",
};

export const UNPACKING_PAYLOAD = "Unpacking payload...";
export const VALIDATING_PAYLOAD = "Validating payload...";
export const FETCHING_DATA = "Fetching data...";

export const METHOD_GET = "GET";
export const METHOD_POST = "POST";
export const METHOD_PUT = "PUT";
export const METHOD_PATCH = "PATCH";
export const METHOD_DELETE = "DELETE";

// API Endpoints
export const RTK_API_BASE_URL = "/api";
export const LOGIN_URL = "auth/login";
export const VALIDATE_TOKEN_URL = "auth/validate-token";
export const NAV_TREE_URL = "get-nav-tree";

//API Messages
export const DEFAULT_ERROR_MESSAGE = "Something went wrong!";

// Keys
export const API_TOKEN = "st/a1";
export const AUTH_TOKEN = "st/a2";
export const NAV_TREE = "st/nt";
export const TOKEN_INFO = "st/i";
export const GRID_COL_FIELDS = "st/gcf";
export const AUTHORIZATION_HEADER = "Authorization";

export const HREF_PAGES = "/pages";
export const COOKIE_CHECK_AUTH_COOKIE = "checkLogout";
export const COOKIE_SUID = "SUID";
export const COOKIE_SOID = "SOID";

export const AUTH_BASE_URL = process.env.AUTH_BASE_URL;
export const BASE_URL = process.env.BASE_URL;
export const API_URL = process.env.API_URL;
export const AUTH_CURRENT_MODULE = process.env.AUTH_CURRENT_MODULE;
export const AUTH_COOKIE_VALIDATION_ENABLED = process.env.AUTH_COOKIE_VALIDATION_ENABLED;
export const BETTERSITE_PREVIEW_URL = process.env.BETTERSITE_PREVIEW_URL;
export const DAMENSCH_PREVIEW_URL = process.env.DAMENSCH_PREVIEW_URL;
export const GRID_PAGE_SIZE = process.env.GRID_PAGE_SIZE;
export const GRID_PAGING_ENABLED = process.env.GRID_PAGING_ENABLED;
export const EDIT_PAGE_AUTO_SAVE_ENABLED = process.env.EDIT_PAGE_AUTO_SAVE_ENABLED ? stringToBoolean(process.env.EDIT_PAGE_AUTO_SAVE_ENABLED) : false;
export const EDIT_PAGE_AUTO_SAVE_INTERVAL_IN_SECS = process.env.EDIT_PAGE_AUTO_SAVE_INTERVAL_IN_SECS;
export const CIPHER_ENCRYPTION_KEY = process.env.CIPHER_ENCRYPTION_KEY;
export const ENABLE_ALERT_LOG = stringToBoolean(process.env.ENABLE_ALERT_LOG);
export const DEFAULT_PARENT_SLUG = "/";

// grid constants
export const PAGINATION_PAGE_SIZE = 40
export const SUPPRESS_GRID_COLS_FROM_TOOL_PANEL = [ "stockcode" ]
export const DEFAULT_GRID_COLS_IN_LIST_VIEW = [ "stockcode", "name", "category", "sellprice", "listprice", "image" ]
export const CHECKBOX_ENABLED_GRID_COLS = [ "stockcode" ]
export const DYNAMIC_CELL_RENDERER_FIELDS = {
  "LISTPRICE": "listprice",
  "SELLPRICE": "sellprice",
  "IMAGE": "image",
}
export const GRID_COL_WIDTH = 250

export const TREE_SELECT = {
  valueName: 'value',
  labelName: 'key',
  nestedOptsName: 'items',
}
