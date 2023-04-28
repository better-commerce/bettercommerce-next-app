// Package Imports
import jwt_decode from "jwt-decode";

export const decodeToken = (token) => {
    var value = jwt_decode(token);
    return value;
};

export const isValidToken = (value) => {
    if (value) {
        const tokenValue = decodeToken(value);
        if (tokenValue && tokenValue.exp) {
            const dtExpiry = new Date(tokenValue.exp * 1000);
            const dtNow = new Date();
            const isValid = dtNow.getTime() < dtExpiry.getTime();
            return isValid;
        }
    }
    return false;
} 