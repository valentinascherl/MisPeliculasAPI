const express = require("express");
//let indexRouter = require('./routes/index.js');
//let userRouter = require('./routes/user.js');
let errorHandler = require('./middlewares/errorHandler');
let productRouter = require('./routes/products');

const app = express();
app.use(express.json());

//app.use('/api', indexRouter);
//app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// Captura error 404
app.use(function(req, res, next) {
  let error = new Error();
  error.statusCode = 404;
  next(error);
});

// Manejador de errores
app.use(errorHandler.send);

app.listen(process.env.PORT || '3030', () =>
  console.log("Server Runnning in Port 3030")
);
