/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.40 : Database - manage
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`manage` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `manage`;

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `ICODE` varchar(40) NOT NULL,
  `NO` varchar(20) DEFAULT NULL,
  `NAME` varchar(40) NOT NULL,
  `PHONE` varchar(20) DEFAULT NULL,
  `EMAIL` varchar(40) DEFAULT NULL,
  `STOPFLAG` int(11) DEFAULT NULL,
  `LOGINNAME` varchar(20) NOT NULL,
  `PASSWORD` varchar(20) NOT NULL,
  `AREAICODE` varchar(40) NOT NULL,
  PRIMARY KEY (`ICODE`),
  UNIQUE KEY `LOGINNAME` (`LOGINNAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`ICODE`,`NO`,`NAME`,`PHONE`,`EMAIL`,`STOPFLAG`,`LOGINNAME`,`PASSWORD`,`AREAICODE`) values ('1',NULL,'管理员',NULL,NULL,0,'admin','admin','1');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
