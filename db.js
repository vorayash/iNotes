const mongoose = require('mongoose')

// const mongoURI  = "mongodb://0.0.0.0:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const mongoURI  = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.cvugq.mongodb.net/inotebook?retryWrites=true&w=majority`;

const connectTomongo =()=>{
    mongoose.connect(mongoURI,(err)=>{
        if(err) console.log(err);
        else console.log("connected successfully");
    })
}

module.exports=connectTomongo;