
const mysql = require('mysql');
// create here mysql connection
const dbConn = mysql.createConnection({

  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
dbConn.connect(function(error){
  if(error) throw error;
  console.log('Database Connected Successfully!!!');
})
module.exports = dbConn;
