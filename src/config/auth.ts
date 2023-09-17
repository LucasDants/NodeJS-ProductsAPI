export default {
  jwt: {
    secretToken: String(process.env.JWT_SECRET_TOKEN),
    expiresIn: "1d",
  },
};
