const jwt = require('jsonwebtoken');
const secrets = require('../secrets/config');
const errorHandler = require('../middlewares/errorHandler');

// Permite autenticar a l aplicación cliente mediante JSON Web Token
let auth = (req, res, next) => {
    const token = req.header('token');
    if (!token)  {
      errorHandler.generate(null, 400, 'No existe el token.', req, res, next);
    }else{
      try {
        const decodificado = jwt.verify(token, secrets.jwt_user);
        let user = decodificado.user;
        req.user = user; // guadamos el usuario en req.user para usarlo en otros lugares
        next();
      } catch (error) { //invalid token
        errorHandler.generate(error, 400, error.message, req, res, next);
      }
    }
  }
module.exports = auth;
