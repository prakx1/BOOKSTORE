var express=require('express');
var router=express.Router();
var Books=require('../models/books')

router.get('/',(req,res,next)=>{
         console.log(req.query.q)

        Books.find({$text: {$search: req.query.q}},{ score: { $meta: "textScore" } })
                .sort( { score: { $meta: "textScore" } } )
            .then((foundBooks)=>{
                if (foundBooks != null){
                    console.log(foundBooks)
                    res.render('searchResult.ejs',{
                        foundBooks:foundBooks
                    })
                }
                else{
                   // res.sendStatus=400;
                    res.send('No books');
                }
                
               
            })
            .catch((err)=>{
                next(err)
                
            })
})
module.exports=router;