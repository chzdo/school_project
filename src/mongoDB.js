var mongoClient = require('mongodb').MongoClient


url= "mongodb://localhost/27017"


var client = new mongoClient(url);


exports.db = async (table)=>{



  
  return   await (await client.connect()).db(process.env.DATABASE_NAME).collection(table)
}



  
