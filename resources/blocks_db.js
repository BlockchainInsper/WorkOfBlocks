var crypto = require("crypto")





async function getAllBlocks() {

  return new Promise(function (resolve, reject) {
    
    global.conn.collection("blocks").find({}).sort( { age: -1 } ).limit(10).toArray(function(err, result) {
      if (err) throw err;
    
      
      resolve({
        "status": "success",
        "data": result
      })
      
    })
    



  })
}



async function getDifficulty() {

  return new Promise(function (resolve, reject) {
    
    global.conn.collection("blocks").find({}).sort( { age: -1 } ).limit(1).toArray(function(err, result) {
      if (err) throw err;

      let current_time = + new Date();
      let difficulty = (current_time - Number(result[-1]))/(1000 * 60 * 5);
      difficulty = difficulty > 0  ? difficulty : 0;
      
      resolve({
        "status": "success",
        "data": {
          "zeros": difficulty,
          "info": "the number of zeros needed in front of the 256 hash"
        }
      })
      
    })
    



  })
}







module.exports = {
  getAllBlocks,
  getDifficulty
};