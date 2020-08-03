module.exports = (sequelize, dataTypes) => {

   let alias = "ShoppingCart";

   let cols = {
      id: {
         type: dataTypes.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      id_usuario: {
         type: dataTypes.STRING(80)
      },
      id_producto: {
         type: dataTypes.STRING(4)
      },
      cantidad: { // es la cantidad de productos que el cliente va a comprar
         type: dataTypes.INTEGER
      }
   };

   let config = {
      tableName: "usuario_producto", // tabla que representa al carrito de compras
      timestamps: true,
      updatedAt: false // este campo no se utiliza
   }

   const ShoppingCart = sequelize.define(alias, cols, config);

   return ShoppingCart;
}
