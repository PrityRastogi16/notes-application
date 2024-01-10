const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const {NoteModel} = require("../models/note.models")

const noteRouter = express.Router();

noteRouter.use(auth);

noteRouter.post("/create",async(req,res)=>{
 try{
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).json({msg:"A new note created !"})
 }catch(err){
    res.status(400).json({error:err})
 }
})

noteRouter.get("/",async(req,res)=>{
    try{
      const notes = await NoteModel.find({userID:req.body.userID})
      res.status(200).json({notes})
    }catch(err){
        res.status(400).json({error:err})
    }
})


noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID} = req.params;
    const payload = req.body;
    try{
      if(payload.userID === req.body.userID){
        await NoteModel.findByIdAndUpdate({_id:noteID},payload);
        res.status(200).json({msg:"Notes Updated"})
      }
    }catch(err){
        res.status(400).json({err})
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID} = req.params;
    const payload = req.body;
    try{
      if(payload.userID === req.body.userID){
        await NoteModel.findByIdAndDelete({_id:noteID},payload);
        res.status(200).json({msg:"Notes deleted"})
      }
    }catch(err){
        res.status(400).json({err})
    }
})


module.exports = {
    noteRouter
}