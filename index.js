var express = require('express');
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

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hiking_master'
});

app.get('/', function (req, res) {
	res.render('pages/default')
});

app.get('/ttt', function (req, res) {
	res.render('pages/lionrock')
});


app.get('/signup', function (req, res) {
	res.render('pages/signup')
});

app.get('/login', function (req, res) {
	res.render('pages/login')
});

app.get('/trail', function(req,res){
	var trail_id = req.query.id;
	console.log(trail_id);

	if (trail_id == null)
	{
		var sql = 'SELECT * FROM trail;';

		connection.query(sql, null, function(err, rows)
		{
			if (!err)
			{
				res.send(rows);
				res.render('pages/lionrock');
			}
			else
			{
				console.log(err);
			}
		});
	}
	else{
		var sql = 'SELECT * FROM trail WHERE trail_id = ?;';

		var params = [trail_id];

		connection.query(sql, params, function(err, trails)
		{
			if (!err && trails.length == 1)
			{
				var trail = trails[0];
				res.send(trail);
				}
			
			else
			{
				console.log(err);
				res.send({'status':'failed'});
			}
			});
	}
});

app.post('/register',login.register);
app.post('/login',login.login);