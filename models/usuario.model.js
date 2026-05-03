const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    const Usuario = sequelize.define('Usuario',{
        nombreCompleto:{
            type: DataTypes.STRING,
            allowNUll: false
        },
        email:{
            type: DataTypes.STRING,
            allowNUll:false,
            unique:true
        },
        password:{
            type: DataTypes.STRING,
            allowNUll:false
        }
    });
    return Usuario;
}