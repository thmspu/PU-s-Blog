var Comments = require('./model2');
var Article = require('./model');
var express = require('express');
var app = express();
var router = express.Router();
  
	router.get('/api/articles/:slug', function(req, res) {
	
		Article.findOne({slug:req.params.slug}, function(err, data) {
			if(err) throw err;
			else res.json(data);
		});
	});

	router.get('/api/feed', function(req, res) {
		if(req.query.tag) {
		Article.find({title:req.query.tag}, function(err, data) {
			if(err) throw err;
			else res.json(data);
		});
	    }
	    else {
	    	Article.find({}, function(err, data) {
			if(err) throw err;
			if(data) res.json(data);
			else res.json();
		});
	    }
	});

     router.get('/api/articles', function(req, res) {
		Article.find({}, function(err, data) {
			if(err) throw err;
			if(data) res.json(data);
			else res.json();
		});
	});

   router.delete('/api/articles/:params', function(req, res) {
		res.json(req);
   });

	router.put('/api/articles/:params', function(req, res) {
		res.json(req);
	});

    router.post('/api/articles', function(req, res) {
		var temp = new Article();
		temp.title=req.body.article.title;
		temp.description=req.body.article.description;
		temp.body=req.body.article.body;
		temp.tagList=req.body.article.tagList;
		temp.slug=Math.round(Math.random()*100000);
		temp.author = req.body.article.author;
        temp.createdAt = new Date();
        temp.favoritesCount = 0;
		temp.save(function(err, data) {
			if(err) throw err;
			else {
				console.log(data);
				res.json(data);
			}
		});
	});

	router.post('/api/articles/delete/all', function(req, res) {
           Article.remove({}, function(err, data){
              res.json("success");
           });
   });


	router.post('/api/articles/favorite/:slug/:counts', function(req, res) {
		console.log(req.params.counts);
          Article.findOneAndUpdate({slug: req.params.slug}, {favorited:true,
          	favoritesCount:req.params.counts}, function(err, data) {
			if(err) throw err;
			if(data) {
				console.log(data);
				res.json(data);}
		});
	});

	router.delete('/api/articles/favorite/:slug/:counts', function(req, res) {
           Article.findOneAndUpdate({slug: req.params.slug}, {favorited:false,
          	favoritesCount:req.params.counts}, function(err, data) {
			if(err) throw err;
			if(data) {
				console.log(data);
				res.json(data);}
		});
	});



	// router.get('/api/articles/:slug/Comments', function(req, res) {
 //           Article.remove({}, function(err, data){
 //              res.json("success");
 //           });
 //   });


	// router.post('/api/articles/:slug/Comments', function(req, res) {
 //          Article.findOneAndUpdate({slug: req.params.params}, {favorited:true}, function(err, data) {
	// 		if(err) throw err;
	// 		if(data) {
	// 			res.json(data);}
	// 	});
	// });

	// router.delete('/api/articles/:slug/Comments', function(req, res) {
 //           Article.findOneAndUpdate({slug: req.params.params}, {favorited:false}, function(err, data) {
	// 		if(err) throw err;
	// 		if(data) {
	// 			res.json(data);}
	// 	});
	// });


module.exports = router;
