import axios from "axios";
import { apiHandler } from "@helpers/api-handler-wrapper";

export default apiHandler({
  post: async (req, res) => {
    const { email, password } = req.body;

    const url = `${process.env.AUTH_BASE_URL}/oauth/token`;
    const reqData = `username=${email}&password=${password}&grant_type=password`;
    const config = {
      headers: {
        "Content-Type": "text/plain"
      }
    };

    try {
      const { status, data } = await axios.post(url, reqData, config);
      res.status(status).json(data);
    } catch (err) {
      const { status, data } = err.response;
      return res.status(status).json({ error: data });
    }
  },
});
