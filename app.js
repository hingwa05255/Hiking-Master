var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function() { console.log('App started!'); });

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hiking_master'
});

app.get('/', function (req, res) {
	res.end('Hi there!');
})

app.post('/register', function(req, res) {
	var member_name = req.body.name;
	var member_gender = req.body.gender;
	var member_email = req.body.email;
	var member_password = req.body.password;
	var member_dateofbirth = req.body.dateofbirth;
	var member_active = req.body.active;
	var member_userid = req.body.userid;

	var sql = 'INSERT INTO member (member_name,member_email, member_userid,member_gender,member_active,member_dateofbirth,member_password) VALUES (?, ?, ?, ?, ?, ?, ?);';

	var parameters = [member_name,member_email, member_userid,member_gender,member_active,member_dateofbirth,member_password];

	connection.query(sql, parameters, function(err, rows)
	{
		var json = {};

		if (!err)
		{
			json.status = 'OK';
		}
		else
		{
			json.status = 'FAILED';

		}

		res.send(json);
	});
});

app.get('/route', function(req, res) {

	var user_id = req.query.id;

	console.log(user_id);

	if (user_id == null)
	{
		var sql = 'SELECT * FROM member;';

		connection.query(sql, null, function(err, rows)
		{
			if (!err)
			{
				res.send(rows);
			}
			else
			{
				console.log(err);
			}
		});
	}
	else
	{
		var sql = 'SELECT * FROM member WHERE user_id = ?;';

		var params = [user_id];

		connection.query(sql, params, function(err, members)
		{
			if (!err && members.length == 1)
			{
				var member = members[0];
				res.send(member);
			/*	sql = 'SELECT * FROM student_subject WHERE userid = ?;';

				connection.query(sql, params, function(err, student_subjects)
			{
					if (!err)
					{
				 		student['student_subjects'] = student_subjects;
						res.send(student);
					}
					else
					{
						console.log(err);
						res.send({'status':'failed'});
					}
				});   */
			}
			else
			{
				console.log(err);
				res.send({'status':'failed'});
			}
		});

	}

	

	// var route_1 = {};
	// route_1.name = "Phoenix hill hiking path";

	// var route_2 = {};
	// route_2.name = 'Tai mo shan hiking path'


	// var routes = [];
	// routes.push(route_1);
	// routes.push(route_2);

	// res.send(routes);
});