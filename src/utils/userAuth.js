import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
