var express=require('express');
var router=express.Router();
var Books=require('../models/books');

router.get('/',(req,res,next)=>{
         var query=req.query;
         console.log(query);
         if (req.query.Filter=='book'){
            Books.find({$text: {$search: req.query.search2}},{ score: { $meta: "textScore" } })
            .sort( { score: { $meta: "textScore" } } )
                    .then((foundBooks)=>{
                        if (foundBooks != null){
                            res.sendStatus=200;
                            console.log(foundBooks)
                            res.render('searchResult.ejs',{
                                foundBooks:foundBooks
                            })
                           //res.json(foundBooks)
                        
                        }
                    })
                    .catch((err)=>{
                        next(err);
                        
                    })
                }
               else if (req.query.Filter=='author'){
                    Books.find({ 'author' :{$regex: new RegExp( req.query.search2,'i')}}).hint("author_-1")
                               .then((foundBooks)=>{
                                   if (foundBooks != null){
                                       res.sendStatus=200;
                                       console.log(foundBooks)
                                       res.render('searchResult.ejs',{
                                           foundBooks:foundBooks
                                       })
                                    //res.json(foundBooks)
                                   }
                               })
                               .catch((err)=>{
                                   next(err);
                                   
                               })
                           }
              else  if (req.query.Filter=='publication'){
                        Books.find({ 'publisher' :{$regex: new RegExp( req.query.search2,'i')}}).hint('publisher_-1')
                                .then((foundBooks)=>{
                                    if (foundBooks != null){
                                        res.sendStatus=200;
                                        console.log(foundBooks)
                                        res.render('searchResult.ejs',{
                                            foundBooks:foundBooks
                                        })
                                        //res.json(foundBooks)
                                         }
                                       })
                                       .catch((err)=>{
                                           next(err);
                                           
                                       })
                                   }          
})
module.exports=router;