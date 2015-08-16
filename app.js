var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var urlencodedBodyParser = bodyParser.urlencoded({extended: false});
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('threads');
app.use(express.static("style"));

app.use(urlencodedBodyParser);

app.use(methodOverride('_method'));

app.set('view_engine', 'ejs');

function getThreadData(){
	db.all('SELECT * FROM thread', function(err, rows){
		if(err){
			throw err
		} else {
			console.log(rows)
		}
		return parsedData
	});
	
}

// function getCurrentThread(id){

// }

app.get('/', function(req, res){
	res.redirect('/threads');
});

/////////////////////////////////////////////////////
// LISTs
app.get('/threads', function(req, res){
	db.all('SELECT thread.*, user.user_name FROM thread INNER JOIN user ON thread.author_id = user.user_id ORDER BY thread.votes DESC', function(err, rows){
		db.all('SELECT * FROM comments', function (err, commentcount){
		if(err){
			throw err
		} else {
			console.log(commentcount)
			res.render('index.ejs', {thread: rows, comments: commentcount})
		}
	})
	});	
});

/////////////////////////////////////////////////////////////
// FORM FOR NEW THREAD
app.get('/threads/new', function(req, res){
	db.all("SELECT * FROM user", req.params.id, function(err, row){
		if(err){
			throw err
		} else {
			db.all("SELECT * FROM thread", function(err, row2){
			res.render('new.ejs', {users: row, threads: row2})

			})
		}
	});
})

///////////////////////////////////////////////////////////////
// NEW USER form
app.get('/users/new', function(req, res){
	res.render('newuser.ejs');
});

//////////////////////////////////////////////////////////////
// CREATE USER
app.post('/users', function(req, res){
		db.run("INSERT INTO user(user_name, user_avatar) VALUES (?,?)", req.body.user_name, req.body.user_avatar, function(err){
		if(err){
			throw err;
		}
		res.redirect('/threads')
	});
});

//////////////////////////////////////////////////////////////
// SHOW a single thread
app.get('/threads/:id', function(req, res){
	var comments = req.body.content
	db.get("SELECT thread.*, user.user_name, user.user_avatar FROM thread INNER JOIN user ON thread.author_id = user.user_id WHERE thread.id=?", req.params.id, function(err, row){
		if(err){
			throw err
		} else {
			db.all("SELECT * FROM user", function(err, rows){
			db.all("SELECT * FROM comments WHERE thread_id=?", row.id, function(err, entry){
				console.log(entry)
			db.all("SELECT * FROM user WHERE user_id=?", entry.comment_author_id, function(err, avatar){
				db.all('SELECT * FROM comments INNER JOIN user ON comments.comment_author_id = user.user_id', function(err, commentname){
			//db.all("SELECT * FROM votes", function(err, votes){

			console.log(commentname)
				res.render('show.ejs', {thread: row, user: rows, comments: entry, avatar: avatar, commentname: commentname})	
			})	
			//})
			})
			})
			})
		} 
	});
});


////////////////////////////////////////////
//COMMENTS

app.post('/threads/:id/comments', function(req, res){
	db.run("INSERT INTO comments (comment_author_id, content, thread_id) VALUES (?,?,?)", req.body.comment_author_id, req.body.content, req.params.id, function(err){
		if(err){
			throw err;
		} else {
			res.redirect('/threads/'+ req.params.id)
		}
	})
})

//////////////////////////////////////////////////////////////
//VOTES

app.post('/threads/:id/votes', function(req, res){
	db.run("UPDATE thread SET votes=votes+1 where id=?", req.params.id, function(err){
		if(err){
			throw err;
		} else {
			res.redirect('/threads/'+req.params.id)
		}
		})
})

////////////////////////////////////////////
//AUTHOR OF COMMENTS

// app.post('/threads/:id/comments', function(req, res){
// 	//db.run("INSERT INTO user (user_name) VALUES (?)", req.body.user_name, function(err){
// 		db.run("INSERT user_name FROM user INNER JOIN user on comments.comment_author_id = user.user_name", function(err){
// 		if(err){
// 			throw err;
// 		} else {

// 			res.redirect('/threads/'+ req.params.id)
// 		}
// 	})
// })

//////////////////////////////////////////////////////////////
// CREATE THREAD
app.post('/threads', function(req, res){
	var id = req.params.id
		db.run("INSERT INTO thread (title, author_id, content, votes) VALUES (?,?,?,?)", req.body.title, req.body.author_id, req.body.content, 0, function(err){
		 if(err){
			throw err;
		} else {
		
		res.redirect('/threads/'+ this.lastID)
			
		 }
	});
});

/////////////////////////////////////////////////////////////////
//DELETE
app.delete('/threads/:id', function(req, res){
	db.run("DELETE FROM thread WHERE id=?", req.params.id, function(err){
		if(err){
			throw err
		}	res.redirect('/threads');
	});
});

/////////////////////////////////////////
// tell our app to listen on port 3000
app.listen(3000, function(){
	// log information for sanity
	console.log('listening on port 3000!')
});
