const express = require('express');
const Tag = require('../models/tag');
const Bookmark = require('../models/bookmark');
const { v4: uuidv4 } = require('uuid');
const router = new express.Router();

router.post('/createTag',async(req,res)=>{
    const tag = new Tag({
        id:uuidv4(),
        ...req.body
    });
    try {
        await tag.save();
        res.status(201).send({
            status: 'success',
            data: tag
        })
    } catch (error) {
        res.status(201).send({
            status: 'failure',
            data: error.message
        })
    }
})
router.delete('/deleteTag/:id',async(req,res)=>{
    try{
        const tag = await Tag.findOneAndDelete({ id:req.params.id})
        for(let i=0 ; i< tag.bookmarksTagged.length; i++){
            const bookmark = await Bookmark.findOne({link :tag.bookmarksTagged[i]})
            const index = bookmark.tags.indexOf(tag.title);
            if(index> -1){
                bookmark.tags.splice(index,1);
            }
            await bookmark.save() 
        }

        if (!tag) {
            return res.status(404).send({
                status: 'failure',
                message: 'tag does not exist !!!'
            })
        }

        res.status(200).send({
            status: 'success',
            data: tag
        })
    }catch(error){
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
})
router.get('/tags' , async(req,res)=>{
    try{
        const tags = await Tag.find({})

        if (tags.length === 0) {
            return res.status(200).send({
                status: 'success',
                message: 'no tags present !!!'
            })
        }

        res.status(200).send({
            status: 'success',
            data: tags
        })
    }catch(error){
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
})
//////////////////TAG AND BOOKMARKS related apis///////////////////////////////

router.post('/addTagToBookmark', async(req,res)=>{
    
    //Request Body
    //link of the bookmark 
    //tagTitle of the tag

    const tag = await Tag.findOne({title: req.body.tagTitle});
    const bookmark = await Bookmark.findOne({link: req.body.link});

    try {
        if((!tag) || (!bookmark)){
            return res.status(400).send({
                status:'failure',
                message: 'Link or Title doesnot exist !!!'
            })
        } 
        if(!bookmark.tags.includes(req.body.tagTitle)){
            bookmark.tags.push(req.body.tagTitle)
            tag.bookmarksTagged.push(req.body.link)
        }   
        
        bookmark.timeUpdated = Date.now();
        await bookmark.save();
        await tag.save();
        res.status(200).send({
            status: 'success',
            data: bookmark
        })

    } catch (error) {
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
})

router.post('/removeTagInBookmark' , async(req,res)=>{
    
    //Request Body
    //link of the bookmark 
    //tagTitle of the tag

    // const tag = await Tag.findOne({title: req.body.tagTitle});
    const bookmark = await Bookmark.findOne({link: req.body.link});

    try {
        if((!bookmark)){
            return res.status(400).send({
                status:'failure',
                message: 'Link doesnot exist !!!'
            })
        }
        const index = bookmark.tags.indexOf(req.body.tagTitle);
        if(index> -1){
            bookmark.tags.splice(index,1);
        } 
        bookmark.timeUpdated = Date.now();
        await bookmark.save();

        res.status(200).send({
            status: 'success',
            data: bookmark
        })

    } catch (error) {
        res.status(500).send({
            status: 'failure',
            data: error.message
        })
    }
} )


module.exports = router