import { AUTH_BASE_URL } from "./constants";

export const getLoginUrl = (orgId = "", domainId = "") => {
    let url = `${AUTH_BASE_URL}?appUrl=${encodeURI(window.location.origin)}&source=external`;
    if (orgId) {
        url = `${url}&orgId=${orgId}`;

        if (domainId) {
            url = `${url}&domainId=${domainId}`;
        }
    }
    return url;
}

export const getLogoutUrl = () => {
    return `${AUTH_BASE_URL}/Account/Logout?appUrl=${window.location.origin}&source=external`;
}
