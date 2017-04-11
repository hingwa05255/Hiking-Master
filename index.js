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
	console.log(trail_name);
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
	console.log(trail_id);
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