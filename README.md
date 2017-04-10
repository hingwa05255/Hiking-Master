How to run:

1. Install Node.js
2. Install Xampp and turn on Apache and mysql
3. Go to localhost/phpmyadmin, create a new database named hiking_master
4. Run the SQL belw the create the member table
		CREATE TABLE `member` (
		 `member_id` int(11) NOT NULL AUTO_INCREMENT,
		 `member_name` varchar(25) NOT NULL,
		 `member_password` varchar(100) NOT NULL,
		 `member_email` varchar(50) NOT NULL,
		 `member_active` tinyint(1) NOT NULL,
		 `member_dateofbirth` date NOT NULL,
		 `member_gender` char(1) NOT NULL,
		 PRIMARY KEY (`member_id`),
		 UNIQUE KEY `member_name` (`member_name`),
		 UNIQUE KEY `member_email` (`member_email`)
		) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8
5. Clone this project
6. In terminal go to the project directory and run "npm install"
7. Run the main program by "node index.js"
8. Go to http://localhost:3000 and try