var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var session = require('express-session');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'hiking_master'
});

var app = express();

app.use(session({secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

exports.register = function(req,res){
	var member_name = req.body.username;
	var member_gender = req.body.gender;
	var member_email = req.body.email;
	var member_password = bcrypt.hashSync(req.body.password, 10);
	var member_dateofbirth = req.body.dateofbirth;
	var member_active = 0;
	
	var sql = 'INSERT INTO member (member_name, member_password, member_email, member_active, member_dateofbirth, member_gender) VALUES (?, ?, ?, ?, ?, ?);';
	var parameters = [member_name, member_password, member_email, member_active, member_dateofbirth, member_gender];
	
	connection.query('SELECT * FROM member WHERE member_name = ?',[member_name], function(err, results) {
		if (err) {
			res.render('pages/error',{"code":100,"failed":"Error Ocurred!"});
		}else{
			if(results.length > 0){
			res.render('pages/error',{"code":100,"failed":"The username has been used!"});
			return;
			} else {
				connection.query('SELECT * FROM member WHERE member_email = ?',[member_email], function(err, results1) {
					if (err) {
						res.render('pages/error',{"code":100,"failed":"Error Ocurred!"});
					}else{
						if(results1.length > 0){
						res.render('pages/error',{"code":100,"failed":"The email has been used!"});
						return;
						} else {
							connection.query(sql, parameters, function(err, rows) {
								if (err) {
									res.render('pages/error',{"code":100,"failed":"Error Ocurred!"});
								}else{
									res.render('pages/success',{"code":100,"success":"You have successfully registered!"});
								}
							});
						}
					}
				});
			}
		}
	});
}

exports.login = function(req,res){
	
	var member_name = req.body.username;
	var member_password = req.body.password;
	connection.query('SELECT * FROM member WHERE member_name = ?',[member_name], function (err, results, fields) {
	if (err) {
		res.render('pages/error',{"code":200,"failed":"Error Ocurred!"});
	}else{
    // console.log('The solution is: ', results);
		if(results.length > 0){
			bcrypt.compare(member_password, results[0].member_password, function(err, doesMatch){
			if(doesMatch){
				req.session.username = member_name;
				req.session.userid = results[0].member_id;
				res.render('pages/success',{"code":200,"success":"You have successfully logged in!"});
			
		}
		else{
			res.render('pages/error',{"code":200,"failed":"Your username or password is incorrect!"});
		}
	});
    }
    else{
		res.render('pages/error',{"code":200,"failed":"Your username or password is incorrect!"});
    }
  }
  });
}

exports.changepassword = function(req,res){
	var member_name = req.session.username;
	var member_oldpassword = req.body.password;
	var member_newpassword = bcrypt.hashSync(req.body.newpassword, 10);
	
	connection.query('SELECT * FROM member WHERE member_name = ?', [member_name], function(err, results, fields) {
		if (err) {
			res.render('pages/error',{"code":300,"failed":"Error Ocurred!"});
		}else{
			if(results.length > 0){
				bcrypt.compare(member_oldpassword, results[0].member_password, function(err, doesMatch){
					if(doesMatch){
						var sql = 'UPDATE member SET member_password = ? WHERE member_name = ?;';
						connection.query(sql, [member_newpassword, member_name],function(err,rows){
							if (err) {
								res.render('pages/error',{"code":300,"failed":"Error Ocurred!"});
							}
							else{
								res.render('pages/success',{"code":300,"success":"You have successfully changed your password!"});
							}
						});
					}else{
						res.render('pages/error',{"code":300,"failed":"Your original password is incorrect!"});
					}
				});
			}else{
				res.render('pages/error',{"code":300,"failed":"Username does not exits"});
			}
		}
	});
}

exports.searchRoute = function(req,res){
	var trailname = req.query.search;
	if(trailname == null) {
		var sql = 'SELECT * FROM trail;';
		connection.query(sql,null, function(err, rows){
			if(!err){
				console.log("i shouldn't be here");
				res.send(rows);
			}else{
				console.log(err);
			}
		});
	}
	else{
 		var sql2 = 'SELECT * FROM trail WHERE trail_name Like ?;';
 		var params = ["%" + trailname + "%"];

		connection.query(sql2,params,function(err, trails){
			//console.log(trails);
			if(!err ){
				res.send(trails);
			}else{
				res.send({'status':'failed.............'});
			}
		});

	}
}

exports.quitGroup = function(req,res){
	var act_id = req.body.activity_id;
	var member_id = req.session.userid;

	var sql = 'DELETE FROM participate WHERE member_id = ? AND activity_id = ?;';
	var sql2 = 'SELECT activity_creator_id FROM activity WHERE ? = activity_creator_id;';
	var parameters = [member_id,act_id];

	connection.query(sql,parameters, function(err,results){
		if(err){
			res.render('pages/error',{"code":100,"failed":"The userid not found !"});
			return;
		}
		else{
			res.render('pages/success',{"code":500,"success":"You have successfully quit the group!"});
			return;
		}

	})
}













