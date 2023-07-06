-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: hust-file
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(180) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `pathfileDownloadUri` varchar(150) DEFAULT NULL,
  `size` bigint DEFAULT NULL,
  `created_on` bigint DEFAULT NULL,
  `modified_on` bigint DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `folder_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (27,'01. Overview.pdf','Slide 1','application/pdf',NULL,392608,1687359291288,1688571505434,NULL,2,NULL),(28,'02. Java Basics.pdf','Slide ','application/pdf',NULL,392608,1687359291323,1687621082310,'D:/project/hust-file/back-end/upload/',1,NULL),(29,'03. Objects and Classes.pdf','Slide ','application/pdf',NULL,392608,1687359291339,1687620992241,'D:/project/hust-file/back-end/upload/',1,NULL),(30,'04. Collections.pdf','Slide ','application/pdf',NULL,392608,1687359291339,1687359291339,'D:/project/hust-file/back-end/upload/',1,NULL),(31,'05. Exceptions.pdf','Slide ','application/pdf',NULL,392608,1687359291356,1687359291356,'D:/project/hust-file/back-end/upload/',1,NULL),(32,'06. IO.pdf','Slide ','application/pdf',NULL,392608,1687359291371,1687359291371,'D:/project/hust-file/back-end/upload/',1,NULL),(33,'07. Concurrency.pdf','Slide ','application/pdf',NULL,392608,1687359291421,1687359291421,'D:/project/hust-file/back-end/upload/',1,NULL),(34,'08. GUI, Internationalization.pdf','Slide ','application/pdf',NULL,392608,1687359291438,1687359291438,'D:/project/hust-file/back-end/upload/',1,NULL),(35,'09. Graphics, Multimedia.pdf','Slide ','application/pdf',NULL,392608,1687359291438,1687359291438,'D:/project/hust-file/back-end/upload/',1,NULL),(36,'10. Networking.pdf','Slide ','application/pdf',NULL,392608,1687359291455,1687359291455,'D:/project/hust-file/back-end/upload/',1,NULL),(37,'11. Database.pdf','Slide ','application/pdf',NULL,392608,1687359291455,1687359291455,'D:/project/hust-file/back-end/upload/',1,NULL),(38,'12. Project Management.pdf','Slide ','application/pdf',NULL,392608,1687359291471,1687359291471,NULL,1,NULL),(39,'13. Web.pdf','Slide ','application/pdf',NULL,392608,1687359291471,1687359291471,NULL,1,NULL),(40,'Capture.PNG','File mới','image/png',NULL,202783,1687665848325,1687665848325,NULL,1,NULL),(41,'bill.jpg','','image/jpeg',NULL,6982,1688138453127,1688138453128,NULL,1,NULL),(42,'Capture.PNG','','image/png',NULL,686312,1688569189697,1688569189700,NULL,1,NULL),(43,'Capture.PNG','','image/png',NULL,686312,1688569607896,1688569607898,NULL,1,45),(44,'Capture.PNG','','image/png',NULL,686312,1688569684568,1688569684568,NULL,1,45),(45,'folder mới','','folder',NULL,686312,1688656065678,1688656065678,NULL,1,NULL);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-06 23:36:00
