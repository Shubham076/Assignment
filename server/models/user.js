const sequelize = require('sequelize');
const db = require("../db")

const User = db.define('user',{

    id: {
        type :sequelize.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },

    username : {
        type: sequelize.STRING,
        allowNull : false
    },

    email : {
        type : sequelize.STRING,
        allowNull : false
    },

    password : {
        type : sequelize.STRING,
        allowNull : false
    },

    admin: {
        type : sequelize.BOOLEAN,
        allowNull : false
    }
})

module.exports = User;