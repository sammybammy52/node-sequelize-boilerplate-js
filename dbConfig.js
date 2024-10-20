
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("node-sequelize", "root", "", {
    host: "localhost",
    dialect:"mysql",
    logging: console.log 
  });
  
module.exports = sequelize;