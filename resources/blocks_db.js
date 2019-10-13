var crypto = require("crypto")





async function getAllBlocks() {

  return new Promise(function (resolve, reject) {
    
    global.conn.collection("blocks").find({}).limit(10).toArray(function(err, result) {
      if (err) throw err;
    
      
      resolve({
        "status": "success",
        "data": result
      })
      
    })
    



  })
}


module.exports = {
  getAllBlocks
};