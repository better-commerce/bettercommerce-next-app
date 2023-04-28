import api from "@services/base/api";
import { apiHandler } from "@helpers/api-handler-wrapper";
import getReqHeaders from "@helpers/get-req-headers";
import { METHOD_GET, SORT_ORDER } from "@utils/constants";

export default apiHandler({
    get: async (req, res) => {
        try {
            const { skip, take, totalRecords, sortBy, sortOrder } = req.query;
            const reqData = JSON.stringify(!take
                ? {}
                : {
                    skip: skip ? parseInt(skip) : 0,
                    take: take ? parseInt(take) : 0,
                    totalRecords: totalRecords ? parseInt(totalRecords) : 0,
                    sortBy: sortBy ? parseInt(sortBy) : 0,
                    sortOrder: sortOrder ? parseInt(sortOrder) : SORT_ORDER.DESCENDING,
                });
            const config = {
                method: METHOD_GET,
                url: `${process.env.API_URL}/role`,
                headers: { ...getReqHeaders(req)?.headers, ...{ "Content-Type": "application/json", } },
                data: reqData,
            }
            const { data } = await api(config);

            if (data.statusCode !== 200) {
                return res.status(data.statusCode).json(data);
            }
            return res.status(data.statusCode).json(data.result);
        } catch ({ response }) {
            return res.status(response.status).json({ error: response.data });
        }
    },
});
