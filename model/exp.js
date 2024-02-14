const dbconfig = require('../Config/dbconfig')

const {Sequelize, DataTypes, HasMany} = require("sequelize");

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD,{
    host: dbconfig.HOST,
    dialect: dbconfig.dialect,
    operatorsAliases: false,
    pool:{
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle,
    },

});

sequelize
    .authenticate()
    .then(()=>{
        console.log("CONNECTED!!")
    })

    .catch((err)=>{
        console.log("Error" + err);
    });

    const db = {};


    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.blogs = require('./model.js')(sequelize, DataTypes);
    db.users = require('./UserModel.js')(sequelize, DataTypes);


    //Relationship

    db.users.hasMany(db.blogs)
    db.blogs.belongsTo(db.users)

db.sequelize.sync({ force: false}).then(() =>{
    console.log("la suru garam")
})

module.exports = db;