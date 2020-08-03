const yup = require('yup');

let productValidator = {
  create: (req, res, next) => {
    const data = req.body;
    const schema = yup.object().shape({
      codigo: yup.string().required().max(4),
      nombre: yup.string().required().min(3).max(255),
      origen: yup.string().required().min(2).max(100),
      email: yup.string().email().max(80),
      stock: yup.number().required().positive().integer().max(9999)
    });
    const options = {abortEarly: false}; //muestra todos los errores, no sólo el primmero
    schema.validate(data,options)
    .then(result => { next(); })
    .catch(err => {
      err.httpStatusCode = 400;
      next(err);
    });
  },
//------------------------------------------------------------------------------
  edit: (req, res, next) => {
    const data = req.body;
    const schema = yup.object().shape({
      nombre: yup.string().required().min(3).max(255),
      origen: yup.string().required().min(2).max(100),
      email: yup.string().email().max(80),
      stock: yup.number().required().positive().integer().max(9999)
    });
    const options = {abortEarly: false};
    schema.validate(data)
    .then(result => { next() })
    .catch(err => {
      err.httpStatusCode = 400; //400-bad-request
      next(err);
    });
  }
}
module.exports = productValidator;
