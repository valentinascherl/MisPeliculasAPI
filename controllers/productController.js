const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');
const item_category = 'Product';
const route_products = '/api/products/';
const errorHandler = require('../middlewares/errorHandler');

let controller = {
  //------------------------------------------------------------------------------------------------
  productList: (req, res, next) => {
    db.Product.findAll().then(function(products){
      if (products.length > 0) {
        let arrProducts = new Array(products.length);
        products.forEach((product, i) => {
          arrProducts[i] = {
            item_id: product.codigo,
            item_link: req.protocol+'://'+req.get('host')+req.originalUrl+'/'+product.codigo,
            item:product
          }
        });
        res.status(200).json({estado: 'OK', item_category, item_count: products.length, items: arrProducts});
      }else{
        errorHandler.generate(null, 404, null, req, res, next);
      }
    }).catch((error)=>{
      errorHandler.generate(error, error.statusCode, null, req, res, next);
    });
  },
  //------------------------------------------------------------------------------------------------
  productDetails: (req, res, next) => {
    db.Product.findByPk(req.params.codigo).then(function(product){
      if (product) {
        let item_link =req.protocol+'://'+req.get('host')+req.originalUrl;
        res.status(200).json({estado: 'OK', item_category, item_link, item_id: product.codigo, item: product});
      }else{ //product not found
        errorHandler.generate(null, 404, null, req, res, next);
      }
    }).catch((error)=>{
      errorHandler.generate(error, error.statusCode, null, req, res, next);
    });
  },
  //------------------------------------------------------------------------------------------------
  newProduct: (req, res, next)=>{
    let prod = { codigo: req.body.codigo, nombre: req.body.nombre, origen: req.body.origen, stock: req.body.stock, email: req.body.email }
    db.Product.create(prod)
    .then((product)=>{
      let mensaje = 'El producto se creó correctamente.';
      let item_link =req.protocol+'://'+req.get('host')+route_products+product.codigo;
      res.status(201).json({estado: 'OK', mensaje, item_category, item_link, item_id: prod.codigo, item: prod});
    }).catch((error)=>{
      errorHandler.generate(error, error.statusCode, null, req, res, next);
    });
  },
  //------------------------------------------------------------------------------------------------
  editProduct: function(req,res, next){
    let prod = {codigo: req.params.codigo, nombre: req.body.nombre, origen: req.body.origen, stock: req.body.stock, email: req.body.email};
    (async function(){
      try {
        let product = await db.Product.findByPk(prod.codigo);
        if (product) {
          let cantFilasActualizadas = await db.Product.update({ //update a product
            nombre: prod.nombre, origen: prod.origen, email: prod.email },{ where: { codigo: prod.codigo }});
          if (cantFilasActualizadas == 1) { //product updated
            let mensaje = "El producto se editó correctamente.";
            let item_link =req.protocol+'://'+req.get('host')+route_products+product.codigo;
            res.status(200).json({estado: 'OK', mensaje, item_category, item_link, item_id: prod.codigo, item: prod});
          }else{ //product don't updated
            let message= "No se modificó ningún campo."
            errorHandler.generate(null, 403, message, req, res, next); //403-forbidden: prohibido. (No sé modificó ningún campo)
          }
        }else{ //The product not exist
          errorHandler.generate(null, 404, null, req, res, next);
        }
      }catch (error) { //something went wrong
        errorHandler.generate(error, error.statusCode, null, req, res, next);
      }
    })();
  },
  //-------------------------------------------------------------------------------------------
  deleteProduct: (req, res, next)=>{
    db.Product.destroy({ where: { codigo: req.params.codigo }})
    .then((cantRegistrosEliminados)=>{
      if (cantRegistrosEliminados===1) {
        let mensaje='El producto fue eliminado.';
        res.status(200).json({estado: 'OK', mensaje, item_category, item_id: req.params.codigo}); //The Product has been deleted
      }else if(cantRegistrosEliminados===0){
        errorHandler.generate(null, 404, null, req, res, next); //product not exist
      }
    }).catch((error)=>{
      errorHandler.generate(error, error.statusCode, null, req, res, next); //internal server error
    });
  },
  //-------------------------------------------------------------------------------------------
  // busca un producto cuyo nombre contenga la cadena recibida por parametro
  searchByName: function(req, res, next){
    db.Product.findAll({ where:{ nombre:{ [Op.substring]: req.query.nombre }}})
    .then(products =>{
      if (products.length != 0) {
        let arrProducts = new Array(products.length);
        products.forEach((product, i) => {
          arrProducts[i] = {
            item_id: product.codigo,
            item_link: req.protocol+'://'+req.get('host')+route_products+product.codigo,
            item: product
          }
        });
        res.status(200).json({estado: 'OK', item_category, item_count: products.length, items: arrProducts});
      }else{
        message= "No se encontraron productos con el criterio de búsqueda utilizado";
        errorHandler.generate(null, 404, message, req, res, next);
      }
    }).catch(error => {
      errorHandler.generate(error, error.statusCode, null, req, res, next);
    });
  },
};

module.exports = controller;
