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
	
	connection.query(sql, parameters, function(err, rows) {
		if (err) {
			console.log("error ocurred",err);
			res.send({"code":400,"failed":"error ocurred"})
		}else{
			console.log('The solution is: success');
			res.render('pages/success');
		}
	});
}

exports.login = function(req,res){
	
	var member_name = req.body.username;
	var member_password = req.body.password;
	connection.query('SELECT * FROM member WHERE member_name = ?',[member_name], function (err, results, fields) {
	if (err) {
		res.send({
		"code":400,
		"failed":"error ocurred"
		})
	}else{
    // console.log('The solution is: ', results);
		if(results.length > 0){
			bcrypt.compare(member_password, results[0].member_password, function(err, doesMatch){
			if(doesMatch){
				req.session.username = member_name;
				res.render('pages/welcome');
			
		}
		else{
			res.send({
				"code":204,
				"success":"Email and password does not match"
            });
		}
	});
    }
    else{
		res.send({
			"code":204,
			"success":"Email does not exits"
		});
    }
  }
  });
}

exports.changepassword = function(req,res){
	var member_name = req.session.username;
	var member_oldpassword = req.body.password;
	var member_newpassword = req.body.newpassword;
	var sql = 'INSERT INTO member (member_password) VALUES ?;';

	connection.query('SELECT * FROM member WHERE member_name = ?', [member_name], function(err, results, fields) {
	if (err) {
		res.send({
		"code":400,
		"failed":"error ocurred"
		})
	}else{
		if(results.length > 0){
			bcrypt.compare(member_password, results[0].member_password, function(err, doesMatch){
			if(doesMatch){
				connection.query(sql, [member_newpassword],function(err,rows){
					if (err) {
						console.log("error ocurred",err);
							res.send({"code":400,"failed":"error ocurred"})
					}
					else{
							res.send({
									"code":200,
									"success":"change sucessfull"
          					  })
					}
				});
			
		}
		else{
			res.send({
				"code":204,
				"success":"Email and password does not match"
            });
		}
	});
    }
    else{
		res.send({
			"code":204,
			"success":"Email does not exits"
		});
    }
  }
  });
}

















