const express = require('express');
const Bookmark = require('../models/bookmark');
const { v4: uuidv4 } = require('uuid');
const router = new express.Router();

router.post('/createBookmark', async(req,res)=>{
    const bookmark = new Bookmark({
        id: uuidv4(),
        ...req.body
    })

    try {
        await bookmark.save();
        res.status(201).send({
            status: 'success',
            data: bookmark
        })
    } catch (error) {
        res.status(201).send({
            status: 'failure',
            data: error.message
        })
    }
})
router.delete('/deleteBookmark/:id',async(req,res)=>{
    try{
        const bookmark = await Bookmark.findOneAndDelete({ id:req.params.id})

        if (!bookmark) {
            return res.status(404).send({
                status: 'failure',
                message: 'bookmark does not exist !!!'
            })
        }

        res.status(200).send({
            status: 'success',
            data: bookmark
        })
    }catch(error){
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
})
router.get('/bookmarks' , async(req,res)=>{
    try{
        const bookmarks = await Bookmark.find({})

        if (bookmarks.length === 0) {
            return res.status(200).send({
                status: 'success',
                message: 'no tags present !!!'
            })
        }

        res.status(200).send({
            status: 'success',
            data: bookmarks
        })
    }catch(error){
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
})

module.exports = router 