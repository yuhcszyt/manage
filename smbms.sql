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

/*Table structure for table `model` */

DROP TABLE IF EXISTS `model`;

CREATE TABLE `model` (
  `icode` varchar(50) NOT NULL,
  `name` varchar(40) NOT NULL,
  `url` varchar(60) DEFAULT NULL,
  `parenticode` varchar(50) DEFAULT NULL,
  `level` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`icode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `model` */

insert  into `model`(`icode`,`name`,`url`,`parenticode`,`level`) values ('210236b9-c90d-11e7-806e-e03f4949199a','用户管理',NULL,NULL,'一级菜单=一级菜单'),('22432177-c91a-11e7-806e-e03f4949199a','个人信息',NULL,'69baf1ed-c919-11e7-806e-e03f4949199a','具体菜单菜单=具体菜单菜单'),('4dd82c04-c91a-11e7-806e-e03f4949199a','写邮件',NULL,'f0729e9a-c919-11e7-806e-e03f4949199a','具体菜单菜单=具体菜单菜单'),('54978995-c91a-11e7-806e-e03f4949199a','收邮件',NULL,'f0729e9a-c919-11e7-806e-e03f4949199a','具体菜单菜单=具体菜单菜单'),('583722a7-c91a-11e7-806e-e03f4949199a','垃圾邮件',NULL,'f0729e9a-c919-11e7-806e-e03f4949199a','具体菜单菜单=具体菜单菜单'),('69baf1ed-c919-11e7-806e-e03f4949199a','信息管理',NULL,'210236b9-c90d-11e7-806e-e03f4949199a','二级菜单=二级菜单'),('f0729e9a-c919-11e7-806e-e03f4949199a','邮件管理',NULL,'210236b9-c90d-11e7-806e-e03f4949199a','二级菜单=二级菜单');

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `icode` varchar(40) NOT NULL,
  `roleicode` varchar(40) NOT NULL,
  `modelicode` varchar(40) NOT NULL,
  PRIMARY KEY (`icode`),
  KEY `FK_permission` (`roleicode`),
  KEY `FK_permissionModelIcode` (`modelicode`),
  CONSTRAINT `FK_permission` FOREIGN KEY (`roleicode`) REFERENCES `role` (`icode`),
  CONSTRAINT `FK_permissionModelIcode` FOREIGN KEY (`modelicode`) REFERENCES `model` (`icode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `permission` */

insert  into `permission`(`icode`,`roleicode`,`modelicode`) values ('2e43433f-c9c7-11e7-a7f1-e03f4949199a','425b4463-4470-4ae3-abf5-d916da09f71c','22432177-c91a-11e7-806e-e03f4949199a'),('d7c5dad1-c9c6-11e7-a7f1-e03f4949199a','425b4463-4470-4ae3-abf5-d916da09f71c','4dd82c04-c91a-11e7-806e-e03f4949199a'),('dffe7d0b-c9c6-11e7-a7f1-e03f4949199a','425b4463-4470-4ae3-abf5-d916da09f71c','54978995-c91a-11e7-806e-e03f4949199a'),('e82ac6a3-c9c6-11e7-a7f1-e03f4949199a','425b4463-4470-4ae3-abf5-d916da09f71c','583722a7-c91a-11e7-806e-e03f4949199a');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `icode` varchar(50) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`icode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`icode`,`fullname`) values ('19a87b1a-a298-11e4-aa3c-08002735e4a4','游客'),('425b4463-4470-4ae3-abf5-d916da09f71c','超级管理员'),('d4cde3a3-472b-4ae6-8b74-864a4fb633c5','管理员'),('e5490a87-2248-47ec-aa79-5cf06fabf35f','销售总部');

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

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `icode` varchar(50) NOT NULL DEFAULT '',
  `usericode` varchar(50) NOT NULL,
  `roleicode` varchar(50) NOT NULL,
  PRIMARY KEY (`icode`),
  KEY `usericode` (`usericode`),
  KEY `roleicode` (`roleicode`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`usericode`) REFERENCES `user` (`ICODE`),
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`roleicode`) REFERENCES `role` (`icode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_role` */

insert  into `user_role`(`icode`,`usericode`,`roleicode`) values ('05be7a75-c944-11e7-806e-e03f4949199a','1','425b4463-4470-4ae3-abf5-d916da09f71c');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
