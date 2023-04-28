export default (req) => ({
  headers: {
    Authorization: req.headers.authorization,
  },
});
