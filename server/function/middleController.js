const jwt = require('jsonwebtoken');
require('dotenv').config();


// authenticateToken.apply..
const authenticateToken = async (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        try {
          const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
          req.user = verifyToken;
          next();
        } catch (error) {
          console.error(error); 
          res.status(401).json({ error: "Token verification failed" });
        }
      } else {
        res.status(401).json({ error: "Unauthorized user" });
      }
    } catch (error) {
      console.error(error); 
      res.status(400).json({ error: "Error from verification" });
    }
  };
  


module.exports = authenticateToken;
