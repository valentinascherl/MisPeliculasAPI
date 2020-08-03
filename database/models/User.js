module.exports = (sequelize, dataTypes) => {

   let alias = "User";

   let cols = {
      nombre: {
         type: dataTypes.STRING(150)
      },
      apellido: {
         type: dataTypes.STRING(150)
      },
      email: {
         type: dataTypes.STRING(80),
         primaryKey: true
      },
      avatar: {
         type:dataTypes.STRING
      },
      contraseña:{
         type: dataTypes.STRING(255)
      }
   };

   let config = {
      tableName: "usuarios",
      timestamps: true  //Gestiona los campos createdAt y updatedAT.
                        //DataTypes.DATE en sequelize es el equivalente a DATETIME en mysql
   }

   const User = sequelize.define(alias, cols, config);

  // Relaciones
   User.associate = function(models){
      User.belongsToMany(models.Product,{ // N:M --> un usuario puede comprar varios productos
         as: 'products',
         through: models.ShoppingCart,
         foreignKey: 'id_usuario',
         otherKey: 'id_producto'
      });
   }
   return User;
}
