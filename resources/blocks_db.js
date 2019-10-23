var crypto = require("crypto")





async function getAllBlocks() {

    return new Promise(function(resolve, reject) {

        global.conn.collection("blocks").find({}).sort({ age: -1 }).limit(10).toArray(function(err, result) {
            if (err) throw err;


            resolve({
                "status": "success",
                "data": result
            })

        })




    })
}



async function getDifficulty() {

    return new Promise(function(resolve, reject) {

        global.conn.collection("blocks").find({}).sort({ age: 1 }).limit(1).toArray(function(err, result) {
            if (err) throw err;

            if (result.length == 0) {
                console.log("tere is no blocks");

                resolve({
                    "status": "error",
                    "data": {
                        "zeros": 0,
                        "info": "there is no block"
                    }

                })
            } else {

                let current_time = +new Date();
                let difficulty = 9 - (current_time - result[result.length - 1].timestamp) / (1000 * 60 * 60 * 3);
                console.log(difficulty);

                difficulty = difficulty > 0 ? Math.round(difficulty) : 0;

                resolve({
                    "status": "success",
                    "data": {
                        "zeros": Math.abs(difficulty),
                        "info": "the number of zeros needed in front of the 256 hash"
                    }
                })
            }
        })
    })
}


async function checkBlock(block, ip) {

    return new Promise(function(resolve, reject) {


        let hash = crypto.createHash('sha256')
            .update(block).digest('hex');



        getDifficulty().then((resp) => {


                let subHash = hash.substring(0, resp.data.zeros);
                let strZeros = "0".repeat(resp.data.zeros);
                blockArray = block.split('|')

                console.log("tatata" + subHash + resp.data.zeros);



                //block format: timestamp, nounce, dados

                let nowDate = new Date();

                if (subHash !== strZeros) {
                    resolve({
                        "status": "error",
                        "data": "different difficulty"
                    })

                }

                if (blockArray[2].lenght > 50) {
                    resolve({
                        "status": "error",
                        "data": "data more than 50 characters"
                    })

                }

                if (nowDate - new Date(blockArray[0]) > 5 * 60 * 1000) {
                    resolve({
                        "status": "error",
                        "data": "timestamp more than five minutes"
                    })

                }


                let data = {
                    timestamp: +new Date(),
                    block: block,
                    hash: hash,
                    ip: ip
                }

                global.conn.collection("blocks").insertOne(data) //TODO: Check promise results

                resolve({
                    "status": "success",
                    "data": "block inserted"
                })









            }).catch((err) => {

                blockArray = block.split('|')

                let nowDate = new Date();

                if (blockArray[2].lenght > 50) {
                    resolve({
                        "status": "error",
                        "data": "data more than 50 characters"
                    })

                }

                if (nowDate - new Date(blockArray[0]) > 5 * 60 * 1000) {
                    resolve({
                        "status": "error",
                        "data": "timestamp more than five minutes"
                    })

                }

                let data = {
                    timestamp: +new Date(),
                    block: block,
                    hash: hash,
                    ip: ip
                }

                global.conn.collection("blocks").insertOne(data);

            }) //TODO: Check promise results





    })
}







module.exports = {
    getAllBlocks,
    getDifficulty,
    checkBlock
};