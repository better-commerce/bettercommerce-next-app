import { apiHandler } from "@helpers/api-handler-wrapper";
import axios from "axios";

export default apiHandler({
  post: async (req, res) => {
    const { token } = req.body;
    const url = `${process.env.AUTH_BASE_URL}/api/v1/oauth/token/validate`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { status, data } = await axios.post(url, null, config);
      return res.status(status).json(data);
    } catch (err) {
      const { status, data } = err.response;
      return res.status(status).json({ error: data });
    }
  },
});
