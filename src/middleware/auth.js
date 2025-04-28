export const userAuth = (req, res, next) => {
  //   const token = req.headers["authorization"];
  const token = "token";
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
