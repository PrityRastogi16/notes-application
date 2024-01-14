const express = require("express");
const {connection} = require("./db")
const {userRouter} = require("./routes/user.routes");
const {noteRouter} = require("./routes/notes.routes")
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")
const app = express();
app.use(express.json());
app.use(cors());
const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"User Management System",
            version:"1.0.0"
        },
        servers:[
            {
                url:"http://localhost:2001"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const openApiSpec = swaggerJsDoc(options);
 app.use("/crudapi",swaggerUi.serve,swaggerUi.setup(openApiSpec))

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