const express = require("express")
const {auth} = require("../middlewares/auth.middleware")
const {NoteModel} = require("../models/note.models")

const noteRouter = express.Router();

noteRouter.use(auth);

/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *               type: object
 *               properties:
 *                       id:
 *                          type: string
 *                          description: The auto-generated id
 *                       name:
 *                           type: string
 *                           description: The User name
 *                       email:
 *                            type: string
 *                            description: The User Email
 *                       age:   
 *                          type: integer
 *                          description: The User age           
 */

/**
 * @swagger
 * /**
 * @swagger
 * /notes/create:
 *  post:
 *      summary: The post Details
 *      tag: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *               description: The list of all the users
 *               content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: "#/components/schemas/User"
 *          500:
 *              description: Some server error
 * 
 */
noteRouter.post("/create",async(req,res)=>{
 try{
    const note = new NoteModel(req.body);
    await note.save();
    res.status(200).json({msg:"A new note created !"})
 }catch(err){
    res.status(400).json({error:err})
 }
})


/**
 * @swagger
 * /notes:
 *  get:
 *      summary: This will get all the users data from the database
 *      tag: [Users]
 *      responses:
 *          200:
 *               description: The list of all the users
 *               content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: "#/components/schemas/User"
 * 
 */
noteRouter.get("/",async(req,res)=>{
    try{
      const notes = await NoteModel.find({userID:req.body.userID})
      res.status(200).json({notes})
    }catch(err){
        res.status(400).json({error:err})
    }
})

/**
 * @swagger
 * /notes/update/{id}:
 *  patch:
 *      summary: Remove the User
 *      tag: [Users]
 *      parameters:
 *          - in: 
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *               description: The list of all the users
 *               content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items: 
 *                                      $ref: "#/components/schemas/User"
 *          400:
 *              description: Some server error
 * 
 */
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


/**
 * @swagger
 * /notes/delete/{id}:
 *  delete:
 *      summary: Remove the User
 *      tag: [Users]
 *      parameters:
 *          - in: 
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *               description: The user was deleted
 *          400:
 *              description: Some server error
 * 
 */
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