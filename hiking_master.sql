-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- 主機: localhost
-- 產生時間： 2017 年 04 月 11 日 08:10
-- 伺服器版本: 10.1.21-MariaDB
-- PHP 版本： 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `hiking_master`
--

-- --------------------------------------------------------

--
-- 資料表結構 `activity`
--

CREATE TABLE `activity` (
  `post_id` int(11) NOT NULL,
  `post_topic` char(100) NOT NULL,
  `post_content` text NOT NULL,
  `post_date` date NOT NULL,
  `post_creator_id` int(11) NOT NULL,
  `post_participant_id` int(11) NOT NULL,
  `trail_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `name` char(25) NOT NULL,
  `email` char(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gender` char(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `dateofbirth` date NOT NULL,
  `password` char(25) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`name`, `email`, `user_id`, `gender`, `active`, `dateofbirth`, `password`, `admin`, `comment`) VALUES
('nwk', 'nwk@gmail.com', 1, 'M', 0, '0000-00-00', '123', 0, ''),
('johnny', 'johnny@cuhk.edu.hk', 2, 'M', 0, '2007-01-02', 'johnny', 0, ''),
('Long', 'long@cuhk.edu.hk', 3, 'F', 0, '1987-12-01', 'long', 0, '');

-- --------------------------------------------------------

--
-- 資料表結構 `route`
--

CREATE TABLE `route` (
  `start_latitude` float NOT NULL,
  `start_longitude` float NOT NULL,
  `end_latitude` float NOT NULL,
  `end_longitude` float NOT NULL,
  `point1_latitude` float NOT NULL,
  `point2_latitude` float NOT NULL,
  `point3_latitude` float NOT NULL,
  `point1_longtitude` float NOT NULL,
  `point2_longtitude` float NOT NULL,
  `point3_longtitude` float NOT NULL,
  `trail_id` int(11) NOT NULL,
  `type` char(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `trail`
--

CREATE TABLE `trail` (
  `trail_id` int(11) NOT NULL,
  `trail_name` char(255) NOT NULL,
  `trail_district` char(50) NOT NULL,
  `trail_diffculty` char(10) NOT NULL,
  `trail_transport` char(255) NOT NULL,
  `trail_photo1` varchar(255) NOT NULL,
  `trail_photo2` char(100) NOT NULL,
  `trail_photo3` char(100) NOT NULL,
  `trail_photo4` char(100) NOT NULL,
  `trail_photo5` char(100) NOT NULL,
  `trail_update_date` date NOT NULL,
  `trail_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `trail`
--

INSERT INTO `trail` (`trail_id`, `trail_name`, `trail_district`, `trail_diffculty`, `trail_transport`, `trail_photo1`, `trail_photo2`, `trail_photo3`, `trail_photo4`, `trail_photo5`, `trail_update_date`, `trail_description`) VALUES
(1, 'Temple Hill', 'Kowloon', 'Easy', 'Starting Point:Minibus No.37A Bus No. 2F/3C/3M/3P/15A End Point:Minibus No.37A Bus No. 2F/3C/3M/3P/15A', '', '', '', '', '', '0000-00-00', ''),
(2, 'Kowloon Peak', 'Kowloon', 'Hard', 'Starting Point: Minbus No. 1/1A End Point: Minibus 37A Bus No. 2F/3C/3M/3P/15A', 'kowloon_peak_1.jpg', 'kowloon_peak_2.jpg', '', '', '', '0000-00-00', ''),
(3, 'Lion Rock', 'Kowloon', 'Diffcult', 'Starting Point: Minibus No. 37A Bus No.2F/3C/3M/3P/15A End Point: Bus No. 2/112/796C/970', '', '', '', '', '', '0000-00-00', '');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`post_id`,`post_creator_id`,`post_participant_id`,`trail_id`),
  ADD KEY `post_creator_id` (`post_creator_id`),
  ADD KEY `post_participant_id` (`post_participant_id`),
  ADD KEY `trail_id` (`trail_id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`user_id`);

--
-- 資料表索引 `route`
--
ALTER TABLE `route`
  ADD KEY `trail_id` (`trail_id`);

--
-- 資料表索引 `trail`
--
ALTER TABLE `trail`
  ADD PRIMARY KEY (`trail_id`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用資料表 AUTO_INCREMENT `route`
--
ALTER TABLE `route`
  MODIFY `trail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- 使用資料表 AUTO_INCREMENT `trail`
--
ALTER TABLE `trail`
  MODIFY `trail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`post_creator_id`) REFERENCES `member` (`user_id`),
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`post_participant_id`) REFERENCES `member` (`user_id`),
  ADD CONSTRAINT `activity_ibfk_3` FOREIGN KEY (`trail_id`) REFERENCES `trail` (`trail_id`);

--
-- 資料表的 Constraints `route`
--
ALTER TABLE `route`
  ADD CONSTRAINT `route_ibfk_1` FOREIGN KEY (`trail_id`) REFERENCES `trail` (`trail_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
