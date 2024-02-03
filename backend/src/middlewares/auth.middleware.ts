import token from "../lib/token";

const isAuthenticated = (req, res, next) => {
  try {
    const tok = req.headers.authorization?.split(" ")[1];
    if (!tok) {
      throw Error("Unauthorized");
    }

    const decodedToken = token.verify({ token: tok, type: "access" });
    res.locals.user = decodedToken;
    next();
  } catch {
    res.json({
      success: false,
      error: "Unauthorized",
    });
  }
};

export default isAuthenticated;
