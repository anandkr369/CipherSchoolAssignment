const jsonwebtoken = require("jsonwebtoken");

function verifyToken(req, res, next) {
  // Correct way to access the Authorization header
  let token = req.headers["authorization"];

  // Check if the token exists
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  // If the token is prefixed with "Bearer", remove the prefix
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  // Verify the token
  jsonwebtoken.verify(token, "saikey", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ message: "Unauthorized! Please login ..." });
    }
    console.log(decoded); // decoded token data
    req.user = decoded; // store decoded token in request object
    next();
  });
}

module.exports = verifyToken;
