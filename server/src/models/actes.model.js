var dbConn  = require('../../config/db.config');
var actes = function(actes){
   
}

// get all actess
actes.getAllactes = (result) =>{
    dbConn.query('SELECT * FROM actes', (err, res)=>{
        if(err){
            console.log('Error while fetching actes', err);
            result(null,err);
        }else{
            console.log('actes fetched successfully');
            result(null,res);
        }
    })
}
module.exports = actes;