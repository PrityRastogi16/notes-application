const express = require("express");
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes");
const {noteRouter} = require("./routes/notes.routes")
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/user",userRouter);
app.use("/notes",noteRouter)

app.get("/",(req,res)=>{
    res.json({msg:"Working fine"})
})

app.listen(2002, async()=>{
    try{
    await connection
    console.log("DB is connected")
    console.log("server is running on port 2002") 
    }catch(err){
        console.log(err);
    }
   
})