SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `account` (
  `uid` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `social_name` varchar(255) NOT NULL,
  `nickname` varchar(255) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `email` (`email`),
  KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `character_setting` (
  `character_id` int(11) NOT NULL AUTO_INCREMENT,
  `model_path` varchar(255) NOT NULL COMMENT 'source folder of this model',
  PRIMARY KEY (`character_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `logins` (
  `uid` varchar(255) NOT NULL,
  `token` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expire` timestamp NULL DEFAULT NULL,
  `ip` varchar(16) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`uid`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `record` (
  `record_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `room_create_time` datetime NOT NULL COMMENT 'room create time',
  `uid` varchar(255) NOT NULL,
  `roomid` int(11) NOT NULL,
  `scene_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `height` int(11) NOT NULL COMMENT 'unit: meter',
  `time` int(11) NOT NULL COMMENT 'unit: second',
  `score` int(11) NOT NULL,
  PRIMARY KEY (`uid`,`record_time`),
  KEY `scene_id` (`scene_id`),
  KEY `character_id` (`character_id`),
  KEY `height` (`height`),
  KEY `time` (`time`),
  KEY `timestamp` (`room_create_time`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `scene_setting` (
  `scene_id` int(11) NOT NULL AUTO_INCREMENT,
  `model_path` varchar(255) NOT NULL COMMENT 'source folder of this model',
  PRIMARY KEY (`scene_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


ALTER TABLE `logins`
  ADD CONSTRAINT `logins_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`);

ALTER TABLE `record`
  ADD CONSTRAINT `record_ibfk_1` FOREIGN KEY (`scene_id`) REFERENCES `scene_setting` (`scene_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `record_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `account` (`uid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `record_ibfk_3` FOREIGN KEY (`character_id`) REFERENCES `character_setting` (`character_id`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
