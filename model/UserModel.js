module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user",{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Email:{
type: DataTypes.STRING,
allowNull: false,
        },
        
        Username: {
            type : DataTypes.STRING,
            allowNull : false
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
     
    });
    return User
}


