const mysql = require('mysql');
// create here mysql connection
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projet_university'
});
dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})
module.exports = dbConn;