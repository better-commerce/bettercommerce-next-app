
export const uriParams = (uri) => {
    if (uri) {
        let url = decodeURI(uri);
        url = url.substring(url.indexOf("?") + 1);
        const params = url.replace('?', '')
            .split('&')
            .map(param => param.split('='))
            .reduce((values, [key, value]) => {
                values[key] = value;
                return values;
            }, {});

        return params;
    }
    return null;
}