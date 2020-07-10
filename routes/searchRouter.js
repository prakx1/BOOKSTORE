var express=require('express');
var router=express.Router();
var Books=require('../models/books');

router.get('/',(req,res,next)=>{
         var query=req.query;
         console.log(query);
         Books.find({$text: {$search: req.query.q}},{ score: { $meta: "textScore" } })
                .sort( { score: { $meta: "textScore" } } )
                    .then((foundBooks)=>{
                        if (foundBooks != null){
                            res.sendStatus=200;
                            res.render('searchResult.ejs',{
                                foundBooks:foundBooks
                             })
                        }
                    })
                    .catch((err)=>{
                        next(err);
                        
                    })
})
module.exports=router;