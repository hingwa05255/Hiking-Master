var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var app = express();
var login = require('./routes/loginroutes');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.listen(3000, function() { console.log('App started!'); });

app.use(session({secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hiking_master'
});

app.get('/success', function (req, res) {
	res.render('pages/success')
});

app.get('/', function (req, res) {
	res.render('pages/default')
});

app.get('/route', function (req, res) {
	res.render('pages/route')
});

app.get('/tips', function (req, res) {
	res.render('pages/tips')
});

app.get('/welcome', function (req, res) {
	res.render('pages/welcome')
});

app.get('/group', function (req, res) {
	
	if (req.session.username != null)
		res.render('pages/group');
	else
		res.redirect('/login');
});

app.get('/activity', function(req,res){
	var activity_id = req.query.id;
	if (activity_id == null)	{
		var sql = 'SELECT * FROM activity;';
		connection.query(sql, null, function(err, rows){
			if (!err){
				res.send(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
		var sql = 'SELECT activity.*, DATE_FORMAT(activity_date, "%d/%m/%Y") AS formatted_date, member.member_name, trail_name FROM activity, member, trail WHERE trail_id = activity_trail_id AND activity_id = ? AND activity_creator_id = member_id;';
		var params = [activity_id];
		connection.query(sql, params, function(err, activities){
			if (!err && activities.length == 1){
				var activity = activities[0];
				res.send(activity);
			}else{
				console.log(err);
				res.send({'status':'failed'});
			}
			});
	}
});

app.get('/signup', function (req, res) {
	res.render('pages/signup')
});

app.get('/login', function (req, res) {
	res.render('pages/login')
});
app.get('/changepassword', function (req, res){
	res.render('pages/changepassword')
});

app.post('/changepassword', login.changepassword);

app.get('/logout', function (req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

app.get('/search', function(req,res){
	var trail_name = req.query.name;
	if(trail_name == null) {
		var sql = 'SELECT * FROM trail;';
		connection.query(sql,null, function(err, rows){
			if(!err){
				res.send(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
		var sql = 'SELECT * FROM trail_name WHERE trail_name LIKE %?%;';
		var params = [trail_name];
		connection.query(sql, params,function(err, trails){
			if(!err && trails.length == 1){
				var trail = trails[0];
				res.send(trail);

			}else{
				console.log(err);
				res.send({'status':'failed'});
			}
		});

	}
});

app.get('/trail', function(req,res){
	var trail_id = req.query.id;
	if (trail_id == null)	{
		var sql = 'SELECT * FROM trail;';
		connection.query(sql, null, function(err, rows){
			if (!err){
				res.send(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
		var sql = 'SELECT * FROM trail WHERE trail.trail_id = ?;';
		var params = [trail_id];
		connection.query(sql, params, function(err, trails){
			if (!err && trails.length == 1){
				var trail = trails[0];
				res.send(trail);
			}else{
				console.log(err);
				res.send({'status':'failed'});
			}
			});
	}
});

app.get('/text', function(req,res){
	var trail_id = req.query.id;
	if (trail_id == null)	{
		var sql = 'SELECT * FROM trail;';
		connection.query(sql, null, function(err, rows){
			if (!err){
				res.render(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
		var sql = 'SELECT * FROM trail WHERE trail_id = ?;';
		var params = [trail_id];
		connection.query(sql, params, function(err, trails){
			if (!err && trails.length == 1){
				var trail = trails[0];
				res.send(trail);
			}else{
				console.log(err);
				res.send({'status':'failed'});
			}
			});
	}
});

app.post('/register',login.register);
app.post('/login', login.login);
app.post('/join', function(req,res){
	var post_id = req.query.aid;
	var member_id = req.session.userid;
	connection.query('SELECT * FROM participate WHERE member_id = ? AND activity_id = ?;', [member_id, post_id], function(err, results, fields){
		if (err) {
				res.send({
				"code":400,
				"failed":"error ocurred"
				})
			}
		else{
			if(results.length>0){
					res.render('pages/error',{"code":500,"failed":"You have already joined this group!"});
				}
				else{
					var sql = 'INSERT INTO participate VALUES (?, ?);';
					connection.query(sql, [member_id, post_id],function(err,rows){
						if (err) {
							console.log("error ocurred",err);
							res.send({"code":402,"failed":"error ocurred"});
						}
						else{
							res.render('pages/success',{"code":500,"success":"You have successfully registered in this activity!"});
						}
					});
				}
		}
	});
});

app.get('/mygroups', function(req,res){
	var member_id = req.session.userid;
	var sql = 'SELECT DISTINCT * FROM participate WHERE member_id = ?;';
	connection.query(sql,[member_id], function(err, results){
		if(err){
			res.send({
				"code":401,
				"failed":"error ocurred"
			})
		}else{
			if(results.length > 0) {
				res.send(results);
			} else {
				res.render('pages/error',{"code":500,"failed":"You haven't joined any group yet."});
			}
		}
	});
});





