const mongoose =require('mongoose')

mongoose.connect(process.env.MONGO_DB,{
        useNewUrlParser:true
}).then(()=>{
    console.log("DB Connected Successfully");
}).catch((e)=>{
    console.log('DB not Connected');
});