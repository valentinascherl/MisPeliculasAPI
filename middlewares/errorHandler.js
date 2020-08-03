
let errorHandler = {
  //---------------------------------------------------------------------------
  //Genera un nuevo error y lo envía al manejador de errores (errorHandler)
  generate: function (err, statusCode, message, req, res, next) {
    let error;
    if (err) {
      error = err;
      if(typeof err.statusCode == 'undefined'){
        error.statusCode = statusCode;
      }
      if(typeof err.message == 'undefined'){
        error.message = message;
      }
    } else {
      error = new Error()
      error.message = message;
      error.statusCode = statusCode;
    }
    next(error);
  },
  //---------------------------------------------------------------------------
  send: function(err, req, res, next) {
    //let pila = err.stack; //en producción no se muestra
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'not specified';
    let reqUrl = req.url;
    switch (err.statusCode) {
      case 400: // bad-request
        err.name = err.name || '400-Bad-Request';
        break;
      case 403: // forbidden
        err.name = err.name || '403-Forbidden';
        break;
      case 404: // not found
        err.name = err.name || '404-Not-Found';
        break;
      case 410: // resource gone
        err.name = err.name || '410-Gone';
        break;
      case 500: // internal server error
        err.name = err.name || '500-Internal-Server-Error';
        break;
      default:
        break;
    }
    let respuesta = {status: 'ERROR', reqUrl, detail: err};
    res.status(err.statusCode).json(respuesta);
  }
}
module.exports = errorHandler;
