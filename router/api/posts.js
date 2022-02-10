const express = require("express");
const { validationResult } = require("express-validator");
const mongodb = require("mongodb");
const Post    = require("../../models/Post")
const router = express.Router()

router.get("/",(req,res)=> {
    try{
        let posts =  Post.find({}).then(resp=>{
            res.json({ data:resp })
        });
    }
    catch(err){
        console.log(err.message)
        res.send(500).send('server error')
    }
});

router.post("/", (req,res)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { post, status } = req.body;

    try{
        let posts =  new Post({post,status});
        posts.save();
        res.json({ data:posts })
    }
    catch(err){
        console.log(err.message)
        res.send(500).send('server error')
    }
});

router.put("/", async (req,res)=> {
    try{
        const { post, status,_id } = req.body;
        console.log({post, status,_id})
        let posts = await Post.updateOne({_id:(req.body._id)},{post, status});
        if(!posts){
            return res.status(400).json({ errors: "No data found" });
        }
        res.send(200);
    }
    catch(err){
        console.log(err.message)
        res.send(500).sendStatus('server error')
    }
});

router.delete("/:id", async (req,res)=> {
    try{
        let posts = await Post.findByIdAndRemove(req.params.id);
        console.log(req.params.id);
        if(!posts){
            return res.status(400).json({ errors: "No data found" });
        }
        res.json({ data:"success" });
    }
    catch(err){
        console.log(err.message)
        res.send(500).send('server error')
    }
});

module.exports = router