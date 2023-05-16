const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require('axios');

const requireAuth = (req, res, next) => {
  const secret = process.env.MY_SECRET_KEY;
  const { authorization } = req.headers;
  console.log("Authorization Header:", authorization);
  if (!authorization) {
    console.log("No Authorization Header");
    return res.status(401).send({ error: 'Vous devez être connecté' });
  }
  const token = authorization.replace('Bearer ', '');
  console.log("Token:", token);
  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      console.log("JWT Verification Error:", err);
      return res.status(401).send({ error: 'Vous devez être connecté' });
    }
    console.log("JWT Verification Success, Payload:", payload);
    req.user = payload;
    next();
  });
};

module.exports =  requireAuth 
