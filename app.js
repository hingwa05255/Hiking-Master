var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var filePath = __dirname+"/comment_history.txt";
var endPoint = "/message_board";

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

app.post('/register', function(req, res) {
	var member_name = req.body.name;
	var member_gender = req.body.gender;
	var member_email = req.body.email;
	var member_password = req.body.password;
	var member_dateofbirth = req.body.dateofbirth;
	var member_admin = req.body.admin;
	var sql = 'INSERT INTO member (name,email,gender,active,dateofbirth,password) VALUES (?, ?, ?, ?, ?, ?,?);';

	var parameters = [member_name,member_email, member_gender,0,member_dateofbirth,member_password,member_admin];

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

app.get('/group', function(req, res) {

});


app.post('/trail', function(req,res){
	var trail_name = req.body.name;
	var trail_district = req.body.district;
	var trail_diffculty = req.body.diffculty;
	var trail_transport = req.body.transport;
	var trail_comment = req.body.comment;
	var trail_update_date = req.body.updatedate;
	var trail_photo1 = req.body.photo1;
	var trail_photo2 = req.body.photo2;
	var trail_photo3 = req.body.photo3;
	var trail_photo4 = req.body.photo4;
	var trail_photo5 = req.body.photo5;
	var sql = 'INSERT INTO trail (trail_name,trail_district,trail_diffculty,rail_transport, trail_update_date,trail_comment,trail_photo1,trail_photo2,trail_photo3,trail_photo4,trail_photo5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
	var parameters = [trail_name,trail_district,trail_diffculty,rail_transport, trail_update_date,trail_comment,trail_photo1,trail_photo2,trail_photo3,trail_photo4,trail_photo5];
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


app.post('/activity', function(req,res){
	var post_topic = req.body.topic;
	var post_content = req.body.content;
	var post_date = req.body.date;
 	var sql = 'INSERT INTO activity (post_topic,post_content,post_date) VALUES (?, ?, ?);';
 	var parameters = [post_topic,post_content,post_date];
 	connection.query(sql, parameters, function(err,rows)
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

app.get('/activity', function(req,res){
	var activity_id = req.query.id;
		console.log(activity_id);

	if (activity_id == null)
	{
		var sql = 'SELECT * FROM activity;';

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
	else{
		var sql = 'SELECT * FROM activity WHERE activity_id = ?;';

		var params = [activity_id];

		connection.query(sql, params, function(err, activities)
		{
			if (!err && activities.length == 1)
			{
				var activity = activities[0];
				res.send(activity);
				}

			else
			{
				console.log(err);
				res.send({'status':'failed'});
			}
			});
	}
});

app.get(endPoint, function(req,res){
	res.header('Access-Control-Allow-Origin'  ,'*');
	res.sendFile(filePath);
});

function stripUserInput(input){
	if(input)
		return input.replace(/(<([^>]+)>)/ig,"");
}

app.post(endPoint, function(req,res){
	res.header('Access-Control-Allow-Origin'  ,'*');
	var newMessageObj = {};
	 newMessageObj.name = stripUserInput(req.body.name);
    newMessageObj.email = stripUserInput(req.body.email);
    newMessageObj.message = stripUserInput(req.body.comment);
    newMessageObj.website = stripUserInput(req.body.website);

    var historyComments;
    try{
    	historyComments = getFileDataInJson();
    }catch(err){
    	historyComments = [];
    }
    historyComments.push(newMessageObj);
    fs.writeFile(filePath, JSON.stringify(historyComments,NULL,4),
    	function(err){
    		if(err){
    			res.end("Failed to leave comment. Sorry!");
    			return;
    		}
    		res.end("Your public comment was sent successfully. thank you!");
    	});

});
