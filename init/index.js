const mongoose = require("mongoose"); 
main() 
.then(() => {  
    console.log("connection successful"); 
}) 
.catch(err => console.log(err));  
async function main(){  
    await mongoose.connect(`mongodb://127.0.0.1:27017/wanderlust`);  //mongoose
}  

const Content = require("../models/content.js");
const initdata = require("./data.js");

const initDB = async () => {
    await Content.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner: "693adefbd7f31aee8c7b3048",
    }));
    await Content.insertMany(initdata.data);
    console.log("data was initalized");
};
initDB();