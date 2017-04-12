-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2017-04-12 17:45:43
-- 伺服器版本: 10.1.21-MariaDB
-- PHP 版本： 7.1.1

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
  `activity_id` int(11) NOT NULL,
  `activity_topic` char(50) NOT NULL,
  `activity_creator_id` int(11) NOT NULL,
  `activity_trail_id` int(11) NOT NULL,
  `activity_content` text NOT NULL,
  `activity_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `activity`
--

INSERT INTO `activity` (`activity_id`, `activity_topic`, `activity_creator_id`, `activity_trail_id`, `activity_content`, `activity_date`) VALUES
(1, 'Hiking at Temple Hill', 10, 5, '12/4/2017\r\n\r\nWe are planning to go hiking at Temple Hill together. We would confirm the trip once we have at least 5 people joining! Feel free to join!', '2017-04-12'),
(2, 'Hiking at Lion Rock', 3, 6, 'As titled', '2017-05-05'),
(3, 'Hiking at Dragon\'s Back', 16, 7, 'Good place to hike! Enjoy~\r\nThis spot is suitable for beginners in light of its beautiful scenario. If you are interested, leave your mobile phone in the comment or call us on 12345678!', '2017-05-31'),
(4, 'Hiking at Dragon\'s Back', 16, 7, 'Good place to hike!', '2017-05-31'),
(5, 'Hiking at Lion Rock', 16, 6, 'Not for beginners... if you are brave enough, just don\'t hesitate to join us :)', '2017-04-12');

-- --------------------------------------------------------

--
-- 資料表結構 `comment`
--

CREATE TABLE `comment` (
  `member_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `comment_content` text NOT NULL,
  `comment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `comment`
--

INSERT INTO `comment` (`member_id`, `activity_id`, `comment_content`, `comment_date`) VALUES
(2, 1, 'When will be the starting time?', '2017-04-12'),
(10, 1, 'Hi~ Dear hingwa, we will start at 9:00 am and wait outside Wong Tai Sin MTR station. Please contact us for more details :)', '2017-04-12');

-- --------------------------------------------------------

--
-- 資料表結構 `coor`
--

CREATE TABLE `coor` (
  `trail_id` int(11) NOT NULL,
  `lat1` float NOT NULL,
  `long1` float NOT NULL,
  `lat2` float NOT NULL,
  `long2` float NOT NULL,
  `lat3` float NOT NULL,
  `long3` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `coor`
--

INSERT INTO `coor` (`trail_id`, `lat1`, `long1`, `lat2`, `long2`, `lat3`, `long3`) VALUES
(5, 22.3342, 114.225, 22.349, 114.195, 22.3479, 114.226);

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `member_id` int(11) NOT NULL,
  `member_name` varchar(25) NOT NULL,
  `member_password` varchar(100) NOT NULL,
  `member_email` varchar(50) NOT NULL,
  `member_active` tinyint(1) NOT NULL,
  `member_dateofbirth` date NOT NULL,
  `member_gender` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `member`
--

INSERT INTO `member` (`member_id`, `member_name`, `member_password`, `member_email`, `member_active`, `member_dateofbirth`, `member_gender`) VALUES
(2, 'hingwa05255', '$2a$10$LAn8507x9jVmu53eWYdK.eQ.c5c2.hAaX6SK200Vh55kTccn9x2JK', 'hingwa05255@yagoo.com.hk', 0, '1996-04-13', 'M'),
(3, 'johnny091196', '$2a$10$yiEn9fM1hGNGpoiuHFvWJeJLZorzc8O2equ6Dfo.SrZFTF6byoUpW', 'hingwa05255@google.com', 0, '1997-01-02', 'M'),
(4, 's1155063930', '$2a$10$013O1Fu31cJ1pyfCDlfwLOB1BtLPa6nU3OPgV86j0xTEsnCAwJ2Va', 'hingwa05255@gmail.com', 0, '1994-01-01', 'M'),
(7, 'hingwa', '$2a$10$9mrw0StJ7CS2z44KnE2eb.yLhXT.6/Bx2E2d/ZVWnRH5s8VA6F7hK', 'johnny@google.com', 0, '1997-01-21', 'M'),
(9, 'admin3', '$2a$10$GmGD4h4hNEefvneVhavm3ezrG4sMEaVcnMpfFUGymmpGU0CLnrvHK', 'hingwa05255@hotmail.com', 0, '1989-02-07', 'M'),
(10, 'hi', '$2a$10$JmN94mi0uGmFKZnxNm4c.OjS2BR9.tMqNWnK.04uKA19g9jVpKnDW', 'hi@gmail.com', 0, '2013-11-30', 'M'),
(11, 'chris', '456', 'chris@yahoo.com.hk', 0, '1990-12-31', 'M'),
(15, 'johnny', '$2a$10$Gcd8QKGH2oGHRJ0Z4P1kEuEqK0HMCwj/OQyxkH5VTTABOKBbTqfIy', 'johnny@yahoo.com.hk', 0, '1996-12-31', 'M'),
(16, 'chris1', '$2a$10$XYZKWcDNTDb4X3COXZ1T/eu3gOMeog/42.xoLg5B8GnfO7IyasMzO', 'chris1@yahoo.com.hk', 0, '2017-04-01', 'M');

-- --------------------------------------------------------

--
-- 資料表結構 `participate`
--

CREATE TABLE `participate` (
  `member_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `participate`
--

INSERT INTO `participate` (`member_id`, `activity_id`) VALUES
(2, 1),
(2, 3),
(2, 2),
(2, 4),
(16, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `trail`
--

CREATE TABLE `trail` (
  `trail_id` int(11) NOT NULL,
  `trail_name` char(255) NOT NULL,
  `trail_district` char(50) NOT NULL,
  `trail_difficulty` int(1) NOT NULL,
  `trail_transport` char(255) NOT NULL,
  `trail_photo1` char(100) NOT NULL,
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

INSERT INTO `trail` (`trail_id`, `trail_name`, `trail_district`, `trail_difficulty`, `trail_transport`, `trail_photo1`, `trail_photo2`, `trail_photo3`, `trail_photo4`, `trail_photo5`, `trail_update_date`, `trail_description`) VALUES
(5, 'Temple Hill', 'Kowloon', 2, 'Starting Point:Minibus No.37A, Bus No. 2F/3C/3M/3P/15A\r\n\r\nEnd Point:Minibus No.37A, Bus No. 2F/3C/3M/3P/15A', 'temple_hill_1.jpg', 'temple_hill_2.jpg', 'temple_hill_3.jpg', 'temple_hill_4.jpg', 'temple_hill_5.jpg', '2017-04-11', 'Temple Hill is located next to Shatin Pass, where a concrete path leads to the signal station sitting on top. \r\n\r\nDisembark at the staircase behind Tsz Wan Shan North Bus Terminus. Follow the concrete steps and climb up to Shatin Pass.\r\n\r\nAscend from the concrete staircase by the restaurant to the top, join the sandy trail to the signal station and the road leading to Stage 5 of MacLehose Trail. Turn right and continue along the road back to the bus terminus via Shatin Pass.'),
(6, 'Lion Rock', 'Kowloon', 4, 'Starting Point: Minibus No. 37A, Bus No. 2F‧3C‧3M‧3P‧15A \r\nEnd Point: Bus No. 2‧112, Bus No. 796C‧970', 'lion_rock_1.jpg', 'lion_rock_2.jpg', 'lion_rock_3.jpg', 'lion_rock_4.jpg', 'lion_rock_5.jpg', '2017-04-11', 'Lion Rock, rises in the middle of Kowloon, is renowned for its shape of a crouching lion.\r\n\r\nIt starts at the staircase behind the Tsz Wan Shan North Bus Terminus. Follow the concrete steps and climb up to Shatin Pass. At the information board, follow the MacLehose Trail. Keep right at the crossing and then turn left at the next branch. Follow the steps and ascend to the Lion Rock. Leave at the side path adjacent to the lion head.\r\n\r\nJoin the MacLehose Trail and continue on the path to the Reunification Pavillion. Stay on the trail and cross Beacon Hill. At the next pavilion, turn left (the right path leads to Kowloon Reservoir)and leave the MacLehose Trail.\r\n\r\nStay left at the next fork and descend to Lung Cheung Road. Cross the highway and finish the walk at So Uk Estate.'),
(7, 'Dragon\'s Back', 'Hong Kong Island', 2, 'Starting Point: Bus No. 9, Minibus\r\nEnd Point: Bus No. 9 Minibus', 'dragons_back_1.jpg', 'dragons_back_2.jpg', 'dragons_back_3.jpg', 'dragons_back_4.jpg', 'dragons_back_5.jpg', '2017-04-11', 'Dragons\' Back, with a view overlooking Tathong Channel, was considered the “Best Urban Hike in Asia” by Time Magazine in 2004.\r\n\r\nThe trail starts at To Tei Wan. Climb up the trail by the information board. Turn right at the pavilion. After arriving a large platform, follow along the ridge and then drop to a crossing. Head right and continue along a flat path. Join the concrete trail and descent to Tai Long Wan Village and finish at Tai Long Wan.'),
(8, 'Tai Mo Shan', 'New Territories', 4, 'Starting Point: Bus No. 51\r\nEnd Point: Minibus No. 82', 'tai_mo_shan_1.jpg', 'tai_mo_shan_2.jpg', 'tai_mo_shan_3.jpg', 'tai_mo_shan_4.jpg', 'tai_mo_shan_5.jpg', '2017-04-11', 'Tai Mo Shan, the highest mountain in the territory, rises in the central of New Territories at an altitude of 957 meters. San On Yuen Chi, the district gazetteer written in 1820, records that the Tai Mo Shan resembles a big hat in the distance, with stone tower and tea plantation on the mountain. The gazetteer does not elaborate whether the stone tower was artificial or natural in nature, however, lots of magnificent rocks indeed scatter over the mountain. Traces of tea terraces can also be found on its northern slope.\r\n\r\nThe Tai Mo Shan area offers numerous hiking trails. Apart from Tai Mo Shan Road, the main passage to the signal station on top, there are many other lesser known but scenic routes available, including those starts at Tsuen Kam Au, Shing Mun Reservoir, Chuen Lung, Lung Mun Country Trail, Yuen Tun Ha, Ng Tung Chai and Kwun Yam Shan (Kadoorie Farm).\r\n\r\nSet out at Tsuen Kam Au. Follow the Tai Mo Shan Road (MacLehose Trail Stage 8 in reverse direction) and walk uphill. At the crossing, turn left and continue going up for a short distance (the road to the right leads to Youth Hostel). From there, leave the road, take the small path on the left and climb up to the signal station. Turn right and skirt around the station by the wire fence. Then join a downhill path to the right and follow a small catchwater. Climb down the paved slope and get back to Tai Mo Shan Road, joining the MacLehose Trail.\r\n\r\nAfter passing by the main gate of the signal station, the road dips down to a pavilion (the path behind leads down to Ng Tung Chai), where it joins a muddy path.\r\n\r\nThe trail later leads you down to Lead Mine Pass where you can take a rest at the pavilion. From there, turn right (the path to the left goes down to San Uk Ka, Tai Po) and follow along the serviced road around Shing Mun Reservoir. Keep to the right athe the crossings and proceed to Shing Mun Road via Pineapple Dam.');

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `activity_creator` (`activity_creator_id`),
  ADD KEY `activity_trail_id` (`activity_trail_id`);

--
-- 資料表索引 `comment`
--
ALTER TABLE `comment`
  ADD KEY `member_id` (`member_id`),
  ADD KEY `activity_id` (`activity_id`);

--
-- 資料表索引 `coor`
--
ALTER TABLE `coor`
  ADD PRIMARY KEY (`trail_id`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`member_id`),
  ADD UNIQUE KEY `member_name` (`member_name`),
  ADD UNIQUE KEY `member_email` (`member_email`);

--
-- 資料表索引 `participate`
--
ALTER TABLE `participate`
  ADD KEY `member_id` (`member_id`),
  ADD KEY `activity_id` (`activity_id`);

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
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- 使用資料表 AUTO_INCREMENT `member`
--
ALTER TABLE `member`
  MODIFY `member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- 使用資料表 AUTO_INCREMENT `trail`
--
ALTER TABLE `trail`
  MODIFY `trail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`activity_creator_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `activity_ibfk_2` FOREIGN KEY (`activity_trail_id`) REFERENCES `trail` (`trail_id`);

--
-- 資料表的 Constraints `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE;

--
-- 資料表的 Constraints `coor`
--
ALTER TABLE `coor`
  ADD CONSTRAINT `coor_ibfk_1` FOREIGN KEY (`trail_id`) REFERENCES `trail` (`trail_id`);

--
-- 資料表的 Constraints `participate`
--
ALTER TABLE `participate`
  ADD CONSTRAINT `participate_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  ADD CONSTRAINT `participate_ibfk_2` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
