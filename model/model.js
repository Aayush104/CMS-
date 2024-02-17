module.exports = (sequelize, DataTypes) =>{
    const Blog = sequelize.define("blog",{
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        Title:{
type: DataTypes.STRING,
allowNull: false,
        },
        
        Email: {
            type : DataTypes.STRING,
            allowNull : false
        },
        Image: {
            type : DataTypes.STRING,
            allowNull : false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    return Blog
}


