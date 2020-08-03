module.exports = (sequelize, dataTypes) => {

   let alias = "Product";

   let cols = {
      codigo: {
         type: dataTypes.STRING(4),
         primaryKey: true
      },
      nombre: {
         type: dataTypes.STRING
      },
      origen: {
         type: dataTypes.STRING(100)
      },
      stock: {
         type: dataTypes.INTEGER
      },
      email: {
         type: dataTypes.STRING(80)
      }
   };

   let config = {
      tableName: "productos",
      timestamps: false
   }

   const Product = sequelize.define(alias, cols, config);

   // Relaciones
   Product.associate = function(models){
      Product.belongsToMany(models.User,{ // N:M --> un producto puede ser comprado por varios usuarios
         as: 'users',
         through: models.ShoppingCart,
         foreignKey: 'id_producto',
         otherKey: 'id_usuario'
      });
   }

   return Product;
}
