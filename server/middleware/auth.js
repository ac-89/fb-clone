import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorisation");
    if (!token) {
      return res.status(401).send("Access denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
