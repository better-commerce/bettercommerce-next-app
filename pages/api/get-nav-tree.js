import api from "@services/base/api";
import { apiHandler } from "@helpers/api-handler-wrapper";
import { AUTH_BASE_URL, AUTH_CURRENT_MODULE } from "@utils/constants";

export default apiHandler({
    post: async (req, res) => {
        const { userId, token } = req.body;
        const url = `${AUTH_BASE_URL}/api/v1/navtreejson/user/${userId}`;
        try {
            const { data, status } = await api.post(url, null, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: { currentModule: AUTH_CURRENT_MODULE }
            });
            return res.status(status).json(data.result);
        } catch (err) {
            console.log(err);
            const { status, data } = err.response;
            return res.status(status).json({ error: data });
        }
    },
});
