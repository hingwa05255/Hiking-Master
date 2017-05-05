//import all the required modules
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

//listen to port 3000
app.listen(3000, function() { console.log('App started!'); });

//create session 
app.use(session({secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

//connect to mysql database
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hiking_master'
});

//show success message
app.get('/success', function (req, res) {
	res.render('pages/success')
});

//load the create group page
app.get('/addgroup', function (req, res) {
	var sql = 'SELECT * FROM trail;';
	connection.query(sql, [], function(err, results){
		if(err) {
			console.log(err);
		} else {
			res.render('pages/addgroup', {data:results});
		}
	});
});

//post request to insert new activity in database
app.post('/addgroup', function (req, res) {
	var topic = req.body.topic;
	var date = req.body.date;
	var route = req.body.route;
	var description = req.body.description;
	var uid = req.session.userid;
	
	var sql = 'INSERT INTO activity (activity_topic, activity_creator_id, activity_trail_id, activity_content, activity_date) VALUES (?, ?, ?, ?, ?);';
	connection.query(sql, [topic, uid, route, description, date], function(err, results){
		if(err) {
			console.log(err);
		} else {
			res.render('pages/success', {"code":400,"success":"Your have successfully added an activity"});
		}
	});
});

//root path handler, check if the user has logged in
app.get('/', function (req, res) {
	if(req.session.username != null){
		res.render('pages/hello');
	
	}
	else{
		res.render('pages/default');
	}
});

//get the search result of routes
app.get('/searchtrail', function (req, res) {
	res.render('pages/searchtrail')
});

//load the route page
app.get('/route', function (req, res) {
	res.render('pages/route')
});

//load the tips page
app.get('/tips', function (req, res) {
	res.render('pages/tips')
});

//load the welcome page after login
app.get('/welcome', function (req, res) {
	res.render('pages/welcome')
});

//load the group page
app.get('/group', function (req, res) {
	
	if (req.session.username != null)
		res.render('pages/group',{"username":req.session.username});
	else
		res.redirect('/login');
});

//perform query to retrieve all activity
app.get('/activity', function(req,res){
	var activity_id = req.query.id;
	if (activity_id == null)	{
		//retrieve all activity if query is not used
		var sql = 'SELECT *, DATE_FORMAT(activity_date, "%d/%m/%Y") AS formatted_date FROM activity;';
		connection.query(sql, null, function(err, rows){
			if (!err){
				res.send(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
		//retrieve the activity specified in the query
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

//load the sign up page
app.get('/signup', function (req, res) {
	res.render('pages/signup')
});

//load the login page
app.get('/login', function (req, res) {
	res.render('pages/login')
});

//load the changepassword page
app.get('/changepassword', function (req, res){
	res.render('pages/changepassword')
});

//call the changepassword method of login module upon post request
app.post('/changepassword', login.changepassword);

//logout the system by emptying session
app.get('/logout', function (req, res) {
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

//call the searchRoute method of login module upon search post request
app.get('/search',login.searchRoute);

//perform query to retrieve route information
app.get('/trail', function(req,res){
	var trail_id = req.query.id;
	if (trail_id == null)	{
		//retrieve all routes if query is not used
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
		//retrieve specified route
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

//call the register method of login module
app.post('/register',login.register);

//call the login method of login module
app.post('/login', login.login);

//join an activity
app.post('/join', function(req,res){
	var post_id = req.query.aid;
	var member_id = req.session.userid;
	//check whether the user has joined the activity already
	connection.query('SELECT * FROM participate WHERE member_id = ? AND activity_id = ?;', [member_id, post_id], function(err, results, fields){
		if (err) {
				res.render('pages/error',{
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
							res.render('pages/success',{"code":400,"success":"You have successfully registered in this activity!"});
						}
					});
				}
		}
	});
});

//change the information of group
app.post('/changegroup', function(req,res){
	var member_id = req.session.userid;
	var post_id = req.query.id;
	var post_newtopic = req.body.topic;
	var post_newcontent = req.body.description;
	var post_newdate = req.body.date;
	var post_newroute = req.body.route;
	
	connection.query('SELECT * FROM activity WHERE activity_id = ? ;', [post_id], function(err, results, fields){
		if(err){
			res.send({"code":400,"failed":"error ocurred"});
		}else{
			if(results.length > 0){
				var sql = 'UPDATE activity set activity_topic = ?, activity_content = ?, activity_date = ? WHERE activity_id = ?;';
				connection.query(sql, [post_newtopic, post_newcontent, post_newdate, post_id],function(err,rows){
					if (err) {
						res.render("pages/error",{"code":400,"failed":"Error ocurred!"});
					}
					else{
						res.render("pages/success",{"code":400,"success":"The content of your activities is successfully changed!"});
					}
				});
			}else{
				res.render("pages/error",{"code":400,"failed":"Activity doesn't not exist!"});
			}
		}
	});
});

//load the change group page and fill the form with database information
app.get('/changegroup', function(req,res){
	var post_id = req.query.id;
	var member_id = req.session.userid;
	
	connection.query('SELECT *, DATE_FORMAT(activity_date, "%Y-%m-%d") AS formatted_date FROM activity WHERE activity_id = ?', [post_id], function(err, results, fields){
		if(err){
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		} else {
			if(results.length > 0){
				if(member_id == results[0].activity_creator_id){
					res.render('pages/changegroup',{"data":results[0]});
				} else {
					res.render('pages/error',{"code":500, "failed":"You have no right to modify this group!"});
				}
				
			}else{
					res.send({"code":204,"success":"activity does not exits"});
			}
		}
	});
});

//retrieve all comments of a specific group
app.get('/comment', function(req,res){
	var activity_id = req.query.id;
	connection.query('SELECT *, DATE_FORMAT(comment_date, "%Y-%m-%d") AS formatted_date FROM comment, member WHERE activity_id = ? AND member.member_id = comment.member_id', [activity_id], function(err, results, fields){
		if(err){
			res.send({
				"code":400,
				"failed":"error ocurred"
			})
		} else {
			if(results.length > 0){
				res.send(results);		
			}
		}
	});
});

//call the quitGroup function of login module to quit a group
app.post('/quitted',login.quitGroup);

//retrieve all the groups joined by the user
app.get('/mygroups', function(req,res){
	var member_id = req.session.userid;
	var sql = 'SELECT DISTINCT *, activity_topic, activity_creator_id FROM participate, activity WHERE member_id = ? AND participate.activity_id = activity.activity_id;';

	connection.query(sql,[member_id], function(err, results){
		if(err){
			res.send({
				"code":401,
				"failed":"error ocurred"
			})
		}else{
			if(results.length > 0) {
				res.render('pages/mygroups',{data:results});
			} else {
				res.render('pages/error',{"code":500,"failed":"You haven't joined any group yet."});
			}
		}
	});
});

//post the comment to the database
app.post('/postcomment', function(req,res){
	var content = req.body.content;
	var activity_id = req.body.id;
	var member_id = req.session.userid;
	var comment_date = "2017-04-13";
	console.log(activity_id);
	var sql = 'INSERT INTO comment (member_id, activity_id, comment_content, comment_date) VALUES (?,?,?,?);';
	
	connection.query(sql, [member_id, activity_id, content, comment_date], function(err, results){
		if(err){
			res.send({
				"code":401,
				"failed":"error ocurred"
			})
		}else{
				res.render('pages/group',{"username":req.session.username});
			}
	});
});

//retrieve all participant of an activity
app.get('/participant', function(req,res){
	var activity_id = req.query.id;

	var sql = 'SELECT member.member_id, member.member_name FROM participate, member WHERE activity_id = ? and participate.member_id = member.member_id ;';
	
	connection.query(sql, [activity_id], function(err, results){
		if(err){
			res.send({
				"code":401,
				"failed":"error ocurred"
			})
		}else{
				res.send(results);
			}
	});
});