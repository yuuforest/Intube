CREATE DATABASE  IF NOT EXISTS `intube` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `intube`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 52.78.72.74    Database: intube
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `applicant`
--

DROP TABLE IF EXISTS `applicant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applicant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `applicant_state` tinyint NOT NULL DEFAULT '1',
  `interview_time_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_interviewTime_TO_applicant_1_idx` (`interview_time_id`),
  KEY `FK_user_TO_applicant_1_idx` (`user_id`),
  CONSTRAINT `FK_interviewTime_TO_applicant_1` FOREIGN KEY (`interview_time_id`) REFERENCES `interview_time` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_applicant_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applicant`
--

LOCK TABLES `applicant` WRITE;
/*!40000 ALTER TABLE `applicant` DISABLE KEYS */;
/*!40000 ALTER TABLE `applicant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmark`
--

DROP TABLE IF EXISTS `bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `interview_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_interview_TO_bookmark_1` (`interview_id`),
  KEY `FK_user_TO_bookmark_1` (`user_id`),
  CONSTRAINT `FK_interview_TO_bookmark_1` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_bookmark_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmark`
--

LOCK TABLES `bookmark` WRITE;
/*!40000 ALTER TABLE `bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference`
--

DROP TABLE IF EXISTS `conference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `call_start_time` datetime DEFAULT NULL,
  `call_end_time` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `interview_time_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_conference_interview_time1_idx` (`interview_time_id`),
  CONSTRAINT `fk_conference_interview_time1` FOREIGN KEY (`interview_time_id`) REFERENCES `interview_time` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference`
--

LOCK TABLES `conference` WRITE;
/*!40000 ALTER TABLE `conference` DISABLE KEYS */;
/*!40000 ALTER TABLE `conference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_history`
--

DROP TABLE IF EXISTS `conference_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conference_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `action` tinyint DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_conference_TO_conference_history_1` (`conference_id`),
  KEY `FK_user_TO_conference_history_1` (`user_id`),
  CONSTRAINT `FK_conference_TO_conference_history_1` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_conference_history_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_history`
--

LOCK TABLES `conference_history` WRITE;
/*!40000 ALTER TABLE `conference_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `conference_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conference_result`
--

DROP TABLE IF EXISTS `conference_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conference_result` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conference_id` bigint NOT NULL,
  `question_id` bigint DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`id`),
  KEY `FK_conference_TO_conference_result_1` (`conference_id`),
  KEY `fk_conference_result_question1_idx` (`question_id`),
  CONSTRAINT `fk_conference_result_question1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_conference_TO_conference_result_1` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conference_result`
--

LOCK TABLES `conference_result` WRITE;
/*!40000 ALTER TABLE `conference_result` DISABLE KEYS */;
/*!40000 ALTER TABLE `conference_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dialog`
--

DROP TABLE IF EXISTS `dialog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dialog` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `conference_id` bigint NOT NULL,
  `question_id` bigint DEFAULT NULL,
  `content` text,
  `timestamp` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_dialog_1` (`user_id`),
  KEY `FK_conference_TO_dialog_1` (`conference_id`),
  KEY `FK_question_TO_dialog_1` (`question_id`),
  CONSTRAINT `FK_conference_TO_dialog_1` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_question_TO_dialog_1` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_dialog_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dialog`
--

LOCK TABLES `dialog` WRITE;
/*!40000 ALTER TABLE `dialog` DISABLE KEYS */;
/*!40000 ALTER TABLE `dialog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `owner_id` bigint NOT NULL,
  `category_id` bigint NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text,
  `interview_state` tinyint NOT NULL DEFAULT '1',
  `estimated_time` varchar(45) DEFAULT NULL,
  `start_standard_age` int DEFAULT NULL,
  `end_standard_age` int DEFAULT NULL,
  `gender` char(1) NOT NULL,
  `max_people` int NOT NULL,
  `standard_point` int NOT NULL,
  `apply_start_time` datetime DEFAULT NULL,
  `apply_end_time` datetime DEFAULT NULL,
  `download_expiration` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_TO_interview_1` (`owner_id`),
  KEY `FK_interview_category_TO_interview_1` (`category_id`),
  CONSTRAINT `FK_interview_category_TO_interview_1` FOREIGN KEY (`category_id`) REFERENCES `interview_category` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_interview_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (31,21,2,'자동차 관련 좌담회','서울 및 수도권 거주 20~49세 남여로 아래 차종을 보유하고 계신 분 혹은 구입할 의향이 있으신 분(보유자는 차량 등록증 지참 가능하신 분)',4,'1',20,40,'M',10,10000,'2023-02-08 10:13:58','2023-02-20 13:00:00','2023-03-11 00:00:00'),(32,21,1,'피자 브랜드 관련 인터뷰','최근 1개월 내 피자 전문점에서 피자를 구입하여 드셔본 경험이 있는 만 25-34세 남여 서울 및 수도권 거주 기준',4,'2',25,34,'O',1,12000,'2023-02-08 10:17:05','2023-02-25 13:00:00','2023-03-11 00:00:00'),(33,21,1,'의류 브랜드 관련 인터뷰','의류 브랜드에 대한 간단한 인터뷰입니다. 대상 : 여 2021~2022년에 구입한 적이 있는 의류 제품을 생각해서 인터뷰에 참여해주세요.',4,'2',17,24,'F',1,15000,'2023-02-08 10:21:15','2023-03-08 12:00:00','2023-03-11 00:00:00'),(38,16,1,'메가커피 소비자 인터뷰','메가커피를 일주일에 3일이상 가시는 분을 모집하고 있습니다.',4,'1',20,40,'O',1,2500,'2023-02-15 10:32:31','2023-02-18 23:59:59','2023-03-11 00:00:00'),(39,16,2,'최근1년내 쇼파 구입자 좌담회','최근 1년내 쇼파를 구입하신 분들 모집하고 있습니다',4,'1',40,60,'W',5,3000,'2023-02-15 10:34:12','2023-02-18 23:59:59','2023-03-11 00:00:00'),(43,21,1,'진정한 나와의 인터뷰','나와의 인터뷰로 재미있고 유쾌한 질문들과 함께 인터뷰해보세요~',4,'1',10,30,'O',1,5000,'2023-02-15 13:51:34','2023-02-18 23:59:59','2023-03-11 00:00:00'),(44,16,1,'테마파크 이용자 좌담회','에버랜드, 롯데월드 이용자 인터뷰를 모집합니다.',4,'1',30,60,'O',1,1500,'2023-02-15 13:52:16','2023-02-18 23:59:59','2023-03-11 00:00:00'),(45,16,2,'가정간편식/밀키트 관련 좌담회','가정 내에서 간편하게 먹을 수 있는 제품으로, 열에 데우기만 해서 먹는 제품, 바로 먹는 제품, 양념과 재료들이 들어있어 끓이기만 하는 제품, 집에 있는 재료에 양념만 넣으면 요리가 되는 양념/소스류 등을 말합니다. \nEx) 국/탕류, 덮밥/비빔밥류, 찌개류, 죽/스프류, 냉동반찬류, 양념소스류 등',4,'1',20,59,'W',3,1000,'2023-02-15 13:53:56','2023-02-18 23:59:59','2023-03-11 00:00:00'),(46,16,3,'G90 신형(풀체인지) 모델 차량 보유자 조사','G90 신형(풀체인지) 모델 차량 본인이 운전 하시는 분, G90 신형(풀체인지) 모델 차량 기사가 운전 하시는 분 인터뷰 모집합니다.',4,'1',30,70,'M',1,2000,'2023-02-15 13:55:40','2023-02-18 23:59:59','2023-03-11 00:00:00'),(47,21,2,'네일아트 관련 인터뷰','이 인터뷰는 네일아트를 평소에 즐겨하시는 분들을 위한 인터뷰입니다.',4,'2',10,40,'O',10,3000,'2023-02-15 13:56:51','2023-02-18 23:59:59','2023-03-11 00:00:00'),(49,16,2,'역삼역 메가커피 소비자 인터뷰','역삼역 메가커피 소비자 인터뷰입니다.',4,'1',20,30,'O',10,500,'2023-02-15 14:29:44','2023-02-22 05:29:00','2023-03-11 00:00:00'),(50,27,1,'대학생활 만족도 인터뷰','코로나19 이전과 그 후의 대학생활 만족도 차이를 조사하려 합니다.\n다음과 같은 내용에 대한 인터뷰를 진행할 예정입니다.\n\n1. 비대면 수업에 대한 만족도\n2. 동아리 활동에 대한 만족도\n3. 학생회에 대한 만족도\n4. 학과 교수님에 대한 만족도',4,'1',20,30,'O',1,1000,'2023-02-15 15:46:32','2023-02-22 06:39:00','2023-03-11 00:00:00'),(51,27,2,'패딩/다운자켓 구매자 좌담회','최근 2년 이내 패딩/다운자켓을 구매한 분들 모집하고 있습니다.',4,'1',25,50,'O',10,500,'2023-02-15 15:55:57','2023-02-22 06:51:00','2023-03-11 00:00:00'),(52,27,2,'스키장 이용자 관련 좌담회','22/23시즌 (2022년 12월~현재) 스키장 이용자 모집합니다.',4,'2',30,55,'O',5,3000,'2023-02-15 16:01:22','2023-02-22 06:58:00','2023-03-11 00:00:00'),(53,27,1,'치킨 맛테스트 인터뷰','치킨을 좋아하시는 분 모집합니다.',4,'2',20,30,'O',1,5000,'2023-02-15 16:07:23','2023-02-22 07:04:00','2023-03-11 00:00:00'),(54,26,1,'알림 앱 피드백 인터뷰','개인 프로젝트로 알림 앱을 개발 중인 학생입니다. 테스트 후 피드백 해주실 분들 구해요!\n',4,'1',9,40,'O',1,300,'2023-02-15 16:10:38','2023-02-22 06:44:00','2023-03-11 00:00:00'),(55,27,1,'중고생 자녀가 있는 부모님 대상 인터뷰','중고생 자녀가 있는 부모님 모집합니다.',4,'2',30,50,'O',1,10000,'2023-02-15 16:18:29','2023-02-22 07:15:00','2023-03-11 00:00:00'),(56,26,2,'기계식 키보드 만족도 인터뷰','단 한번이라도, 기계식 키보드를 사용한 경험이 있으신 분들을 대상으로 인터뷰 진행합니다. \n자신이 사용한 기계식 키보드의 정보가 정확히 있으신 분들이셨으면 좋겠습니다. ',4,'2',20,50,'O',4,500,'2023-02-15 16:23:22','2023-02-22 07:13:00','2023-03-11 00:00:00'),(57,26,3,'버티컬 마우스 소지자 인터뷰','현재 버티컬 마우스를 사용 중이신 분들을 대상으로 인터뷰를 진행하고자 합니다. 어떠한 버티컬 마우스를 사용하시고 계신지, 또 어떤 마우스 관련된 제품들을 사용하고 계신지 궁금합니다. ',4,'1',20,40,'O',1,300,'2023-02-15 16:30:07','2023-02-22 07:23:00','2023-03-11 00:00:00'),(58,26,2,'스터디 카페 경험자 인터뷰','기존과는 다른, 새로운 스터디 카페를 창업하려고 합니다. 여러분들의 스터디 카페 경험담을 들려주세요!',4,'2',14,47,'O',4,800,'2023-02-15 16:42:15','2023-02-22 07:39:00','2023-03-11 00:00:00'),(59,19,1,'역삼,강남역 퇴근길 대중교통 선호도 조사','퇴근길에 사람들이 어떤 대중교통을 선호하는지 조사하고 싶습니다.\n역삼역 혹은 강남역 부근에서 퇴근을 하는 답변자들이 필요합니다\n포인트 많이 걸었으니 많이 참여해주세요!!!! ?',4,'0.5',20,40,'W',1,3000,'2023-02-15 16:42:49','2023-02-22 07:35:00','2023-03-11 00:00:00'),(60,26,1,'운동 관련 인터뷰','여러분들은 어떤 운동을 해보셨나요? 여러분이 경험한 운동에 대한 이야기가 듣고싶어요!',4,'1',20,40,'W',1,500,'2023-02-15 16:49:55','2023-02-22 07:47:00','2023-03-11 00:00:00'),(61,19,3,'싸피 점심 10층 선호도 조사','멀티캠퍼스 10층에서 무엇으르 먹나요?\n궁금합니다',4,'1',20,30,'O',1,1000,'2023-02-15 17:15:44','2023-02-22 08:14:00','2023-03-11 00:00:00'),(62,19,2,'배스킨라빈스 아이스크림 선호도 조사','아이스크림 선호도 조사입니다\n남녀노소 많은 사람들이 참여했으면 좋겠습니다\n포인트는 500 드립니다\n배스킨라빈스 안좋아하는 사람들은 참여하지 말아주세요',4,'10',10,70,'O',10,500,'2023-02-15 20:02:09','2023-02-22 10:57:00','2023-03-11 00:00:00'),(63,16,1,'파스쿠치 젤라또 인터뷰','파스쿠치 젤라또 인터뷰입니다',4,'1',20,40,'M',1,200,'2023-02-15 20:59:32','2023-02-22 11:58:00','2023-03-11 00:00:00'),(64,19,1,'싸피 8기 건강 현황 조사','싸피 8기 건강 현황을 조사합니다\n많이 참여해주세요',4,'1',20,31,'O',1,100,'2023-02-16 10:55:36','2023-02-23 01:52:00','2023-03-11 00:00:00'),(65,30,3,'예주의 아바타 인터뷰 테스트장','아바타 인터뷰 테스트합니다!',4,'1',20,30,'W',1,1000,'2023-02-16 12:52:51','2023-02-23 03:51:00','2023-03-11 00:00:00'),(66,19,3,'아바타 인터뷰 하실 분 오세요','제 아바타가 대신 질문해줍니다!',4,'1',20,40,'O',1,300,'2023-02-16 12:56:17','2023-02-23 03:54:00','2023-03-11 00:00:00');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_category`
--

DROP TABLE IF EXISTS `interview_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_category`
--

LOCK TABLES `interview_category` WRITE;
/*!40000 ALTER TABLE `interview_category` DISABLE KEYS */;
INSERT INTO `interview_category` VALUES (1,'1:1'),(2,'1:N'),(3,'AVATA');
/*!40000 ALTER TABLE `interview_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview_time`
--

DROP TABLE IF EXISTS `interview_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview_time` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `interview_id` bigint NOT NULL,
  `interview_start_time` datetime NOT NULL,
  `modify_result_state` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_interview_TO_interviewTime_idx` (`interview_id`),
  CONSTRAINT `FK_interview_TO_interviewTime` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview_time`
--

LOCK TABLES `interview_time` WRITE;
/*!40000 ALTER TABLE `interview_time` DISABLE KEYS */;
INSERT INTO `interview_time` VALUES (10,31,'2023-02-20 15:00:00',0),(11,31,'2023-02-21 16:00:00',0),(12,31,'2023-02-22 17:00:00',0),(13,31,'2023-02-23 18:00:00',0),(14,32,'2023-02-20 15:00:00',0),(15,32,'2023-02-21 16:00:00',0),(16,32,'2023-02-22 17:00:00',0),(17,32,'2023-02-23 18:00:00',0),(18,33,'2023-03-11 15:00:00',0),(19,33,'2023-03-12 16:00:00',0),(20,33,'2023-03-13 17:00:00',0),(21,33,'2023-03-14 18:00:00',0),(29,38,'2023-02-15 10:30:00',0),(30,39,'2023-02-15 10:30:00',0),(41,43,'2023-03-01 18:30:00',0),(42,43,'2023-03-02 18:30:00',0),(43,44,'2023-02-15 16:00:00',0),(44,44,'2023-02-16 17:00:00',0),(45,44,'2023-02-17 20:00:00',0),(46,45,'2023-02-16 13:00:00',0),(47,45,'2023-02-17 13:00:00',0),(48,47,'2023-02-22 17:00:00',0),(49,47,'2023-02-23 17:00:00',0),(50,47,'2023-02-24 17:00:00',0),(52,49,'2023-02-15 16:30:00',0),(53,50,'2023-02-20 10:00:00',0),(54,51,'2023-02-28 13:30:00',0),(55,52,'2023-03-15 19:30:00',0),(56,53,'2023-02-15 16:00:00',0),(57,54,'2023-02-20 15:00:00',0),(58,54,'2023-02-21 15:00:00',0),(59,54,'2023-02-22 15:00:00',0),(60,55,'2023-02-20 10:00:00',0),(61,56,'2023-02-27 21:00:00',0),(62,58,'2023-02-23 20:30:00',0),(63,58,'2023-02-24 20:30:00',0),(64,59,'2023-02-15 16:00:00',0),(65,60,'2023-02-21 14:00:00',0),(66,60,'2023-02-21 15:00:00',0),(67,60,'2023-02-21 16:00:00',0),(68,57,'2023-02-15 17:19:00',0),(69,57,'2023-02-15 17:19:00',0),(70,61,'2023-02-15 17:26:00',0),(71,46,'2023-02-15 19:39:00',0),(72,57,'2023-02-15 19:43:00',0),(73,62,'2023-02-08 20:00:00',0),(74,62,'2023-02-15 20:00:00',0),(75,62,'2023-02-14 20:00:00',0),(76,62,'2023-02-16 20:00:00',0),(77,63,'2023-02-15 22:00:00',0),(78,63,'2023-02-16 22:00:00',0),(79,64,'2023-02-16 08:30:00',0),(80,64,'2023-02-17 08:30:00',0),(81,64,'2023-02-18 08:30:00',0),(82,65,'2023-02-16 12:53:00',0),(83,66,'2023-02-16 12:56:00',0),(84,66,'2023-02-16 13:05:00',0);
/*!40000 ALTER TABLE `interview_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mark`
--

DROP TABLE IF EXISTS `mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conference_id` bigint NOT NULL,
  `mark_time` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mark_conference_idx` (`conference_id`),
  CONSTRAINT `fk_mark_conference` FOREIGN KEY (`conference_id`) REFERENCES `conference` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mark`
--

LOCK TABLES `mark` WRITE;
/*!40000 ALTER TABLE `mark` DISABLE KEYS */;
/*!40000 ALTER TABLE `mark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `interview_id` bigint NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_interview_TO_question_1` (`interview_id`),
  CONSTRAINT `FK_interview_TO_question_1` FOREIGN KEY (`interview_id`) REFERENCES `interview` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (10,31,'현재 구입하신 자동차 모델명이 무엇이고 그 모델의 장점과 단점을 설명해주세요.'),(11,31,'폭스바겐 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(12,31,'벤츠 AMG 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(13,31,'포르쉐 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(14,31,'현대 N 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(15,32,'최근 먹어본 피자와 브랜드는 어떻게 되는지 설명해주세요.'),(16,32,'피자헛 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(17,32,'피자마루 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(18,32,'도미노피자 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(19,33,'최근 관심있는 의류 브랜드에 대해 설명해주세요.'),(20,33,'캉골 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(21,33,'스노우피크 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(22,33,'나이키 브랜드의 기업 이미지에 대해서 어떻게 생각하시나요?'),(28,38,'메가커피 메뉴 추천해주세요'),(29,38,'메가커피 비추 메뉴는?'),(30,39,'어떤 브랜드의 쇼파를 구매하셨나요?'),(31,39,'구매하신 쇼파의 장점은?'),(37,43,'지금의 마음은 어떠신가요?'),(38,43,'요즘 가장 기뻤던 순간은 언제였나요?'),(39,43,'최근 가장 마음이 아팠던 적 있나요?'),(40,43,'가장 좋아하는 음식을 언제 먹었나요?'),(41,43,'일상생활에서 즐거움을 주는 것은 무엇인가요?'),(42,43,'최근 목표를 달성한 경험이 있다면, 목표 달성 후 기분이 어땠나요?'),(43,44,'에버랜드 이용해보신적 있나요?'),(44,44,'에버랜드의 장점은?'),(45,44,'롯데월드 이용해보신적 있나요?'),(46,44,'롯데월드의 장점은?'),(47,45,'가정간편식/밀키트의 장점은 무엇인가요?'),(48,45,'가정간편식/밀키트의 단점은 무엇인가요?'),(49,46,'G90 장점은 무엇이라고 생각하십니까?'),(50,46,'G90 이전에 타던 차와 어떤 차이가 있나요?'),(51,46,'승차감이 좋나요?'),(52,46,'하차감이 좋나요?'),(53,47,'가장 최근에 받은 네일이 언제였나요?'),(54,47,'어떤 디자인의 네일아트를 좋아하시나요?'),(55,47,'지인에게 추천했던 적이 있나요?'),(56,47,'네일아트의 장점과 단점에 대해 알려주세요. '),(57,47,'마지막으로 하고 싶은 말씀해주시길 바랍니다.'),(59,49,'메가커피 메뉴 추천해주세요'),(60,50,'비대면 수업에 대한 만족도'),(61,50,'동아리 활동에 대한 만족도'),(62,50,'학생회에 대한 만족도'),(63,50,'학과 교수님에 대한 만족도'),(64,51,'어떤 브랜드의 패딩을 구매하셨나요?'),(65,51,'구매하신 이유가 무엇인가요?'),(66,51,'광고하는 연예인의 영향을 받으셨다고 생각하시나요?'),(67,51,'패딩을 구매했을 때, 브랜드의 영향이 크다고 생각하시나요?'),(68,52,'어떤 스키장을 가셨나요?'),(69,52,'스키장을 간 이유가 무엇인가요?'),(70,52,'숙소는 스키장 내를 이용하셨나요?'),(71,52,'스키장 내 숙소가 스키장을 결정하는데 큰 역할을 했나요?'),(72,52,'숙소에서 바뀌었음 하는 점이 있을까요?'),(73,53,'어떤 치킨을 좋아하시나요?'),(74,53,'신상이 나오면 먹어보는 편인가요?'),(75,53,'브랜드마다 치킨의 특색이 있다고 생각하시나요?'),(76,53,'브랜드 특색에 대해 느끼시는 것에 대해서 말씀해주세요'),(77,53,'블랙 치킨하면 느끼시는 분위기가 무엇인가요?'),(78,54,'나이가 어떻게 되시나요?'),(79,54,'평소 어떤 알림 프로그램을 사용 중이신가요?'),(80,54,'사용 중인 알림 앱이 있다면, 그 프로그램의 사용 이유가 무엇인가요?'),(81,54,'사용 중인 알림 앱이 없다면, 사용하지 않으시는 이유가 무엇인가요?'),(82,54,'제 알림 앱을 사용한 후기가 궁금해요'),(83,54,'제 알림 앱의 장점이 무엇이라고 생각하시나요?'),(84,54,'제 알림 앱의 단점이 무엇이라고 생각하시나요?'),(85,54,'혹시 알림 앱에 추가했으면 하는 기능이 있으신가요?'),(86,54,'제 알림 앱을 지속적으로 사용하실 의향이 있으신가요?'),(87,55,'학원을 보내시고 계신가요?'),(88,55,'몇 개의 학원을 보내시고 계신가요?'),(89,55,'학원을 보내시는 이유가 무엇일까요?'),(90,55,'과외 대신 학원을 보내시는 이유는 무엇일까요?'),(91,55,'앞으로도 학원을 보내실 예정이신가요?'),(92,56,'사용해 본 모든 기계식 키보드에 대해서 말씀해 주세요!'),(93,56,'어떠한 경로로 기계식 키보드를 사용하시게 되었나요?'),(94,56,'일반 키보드와 기계식 키보드 중 어떤 키보드를 선호하시나요?'),(95,56,'그 키보드를 선호하시는 이유가 무엇인가요?'),(96,56,'기계식 키보드를 사용하시면서 불편했던 점이 무엇인가요?'),(97,57,'현재 어떤 버티컬 마우스를 사용하고 계신가요?'),(98,57,'어떠한 이유로 현재 버티컬 마우스를 사용하고 계신가요?'),(99,57,'버티컬 마우스의 장점은 뭐라고 생각하세요?'),(100,57,'버티컬 마우스의 단점은 뭐라고 생각하세요?'),(101,57,'이후에도 버티컬 마우스를 계속 사용하실 예정이신가요? 이유도 함께 말씀해주세요'),(102,58,'스터디 카페를 사용해 본 경험이 있으신가요?'),(103,58,'어떤 경로로 스터디 카페를 방문하셨었나요?'),(104,58,'독서실, 카페와는 다른 스터디 카페의 특징이 뭐라고 생각하세요?'),(105,58,'방문하셨던 스터디 카페에서 불편했던 점이 있으셨다면, 어떤 점이었나요?'),(106,58,'방문하셨던 스터디 카페에서 좋았던 점이 있으셨다면, 어떤 점이었나요?'),(107,58,'여러분들이 원하시는 스터디 카페는 무엇인가요?'),(108,59,'어디에서 퇴근을 하시나요?'),(109,59,'어떤 대중교통을 이용하시나요?'),(110,59,'현재 대중교통에 만족을 하시나요?'),(111,59,'불만족 하신다면 어떤 부분이 불만족스러우신가요?'),(112,59,'인터뷰에 응해주셔서 감사합니다'),(113,60,'어떤 운동을 해보셨나요? 모두 말씀해주세요!'),(114,60,'해 보신 운동에 대해서 장점과 단점에 대해 말씀해주세요'),(115,60,'해보신 운동 이외의 다른 어떤 운동을 해보고 싶으신가요?'),(116,61,'10층 가서 무엇을 먹나요?'),(117,61,'샐러드를 먹는다면 만족도는 어떠신가요?'),(118,61,'도시락을 먹는다면 만족도는 어떠신가요?'),(119,61,'샌드위치를 먹는다면 만족도는 어떠신가요?'),(120,62,'가장 좋아하는 배스킨라빈스 아이스크림 맛이 무엇인가요?'),(121,62,'엄마는 외계인에 대해서 어떻게 평가하시나요?'),(122,62,'아몬드 봉봉에 대해서 어떻게 평가하시나요?'),(123,62,'체리쥬빌레에 대해서 어떻게 평가하시나요?'),(124,62,'배스킨라빈스 녹차맛이 맛이 없다는 것에 동의하시나요?'),(125,63,'젤라또 메뉴 추천해주세요'),(126,64,'오늘 건강 상태는 어떤가요?'),(127,64,'요새 힘든 점이 있나요?'),(128,64,'있다면 뭐가 힘든가요?'),(129,64,'코로나는 걸린 적이 있나요?'),(130,64,'코로나를 언제 걸렸나요?'),(131,64,'설문에 응해주셔서 감사합니다'),(132,65,'아바타 인터뷰 잘 되나요?'),(133,65,'음성 인식 기능은 어떤가요?'),(134,65,'녹화는 잘 되나요?'),(135,66,'아바타 인터뷰입니다 환영합니다'),(136,66,'제 캐릭터는 어떤가요?'),(137,66,'좋은 부분을 알려주세요!'),(138,66,'싫거나 개선되어야 하는 부분을 알려주세요!'),(139,66,'감사합니다! 나가주시면 됩니다');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `gender` char(1) NOT NULL,
  `birth` datetime NOT NULL,
  `introduction` text,
  `temperature` double NOT NULL DEFAULT '36',
  `is_phone_authorized` tinyint(1) NOT NULL DEFAULT '0',
  `is_email_authorized` tinyint(1) NOT NULL DEFAULT '0',
  `point` int NOT NULL DEFAULT '5000',
  `profile_url` varchar(2083) DEFAULT NULL,
  `is_kakao` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'eosun77@naver.com','$2a$10$ugFkPUAUSiWjXV..zSX7EusZD.XFBz2T7th1OVgxQXxeuV1H/D0Ni','주대선','로컬주','','M','1997-07-24 00:00:00','안녕하세요 인터뷰에 진심인 남자 로컬주입니다',36.166666666666664,0,1,999999,'profile/0c7a745f-abac-447e-86ca-1abce4cbf28a_20230215161839.jpg',0),(17,'qweasd@asd.com','$2a$10$ZeiK07Rc.39svAvv1AG7Quki1ewetGPSLKeaVN1WF2fDVTxLKWGGu','주대선','이거됌?','','M','1997-07-24 00:00:00','이거 되나요?',36.5,0,1,999999,'profile/user.png',0),(18,'ssafy123@ssafy.com','$2a$10$LsPuQYfMx29Fq8DwadetgejHXP7Fp2Wy4wdNCMKMt.jO1YobSqfy2','싸피맨','싸피맨','','F','1997-07-24 00:00:00','아니여',36.5,0,1,999999,'profile/user.png',0),(19,'abcdq12345@naver.com','$2a$10$VAbTGfpVxe1Cm3AxQxQxgu.2zZRh/M2INWT/CfgnHlD95stgq/bhi','장예주','안녕나는예주','01012341234','F','1999-10-20 00:00:00','자기소개입니다~~',36.833333333333336,0,1,999999,'profile/6fdeff4f-282a-4f42-8403-37d90f716fa2_20230215200417.JPG',1),(21,'slhyj95@naver.com','$2a$10$87NIrDtBgBz2CHfvqdZ4E.yaHzPAApNd7vijjEno8UGnPXJoFcDl.','영싸피이','영길동','','M','1999-07-13 00:00:00','저는 성실한 인터뷰이입니다!',38.5,0,1,999999,'profile/c4427bc4-e2fd-4ee7-98fa-779525ca3b5e_20230215140718.jpg',1),(24,'wsji9404@gmail.com','$2a$10$WOOtEj8VWzlETp0RYFW/jeRuVOozb0cqtNXA8IG0oknGkzQgTGOCq','지원석','지원석','01099130059','M','1994-04-26 00:00:00','안녕하세요. 성실히 인터뷰에 임하겠습니다.',36.5,0,1,999999,'profile/751d18c1-2da0-4641-8272-8fd1c14a2863_20230216131926.jpg',0),(25,'eosun77@gmail.com','$2a$10$GcGZgsDnanpqQblj/9V4Met7cW2BlnlFhcsKSOTL0T9E9GR/rhVYq','카카오주','카카오주','01012341234','M','1997-07-25 00:00:00','안녕하세요 해외에서 살고 있는 카카오 주입니다',36.5,0,1,999999,'profile/user.png',1),(26,'yurimkang20@gmail.com','$2a$10$jwBJMwT630CE5Vdb1VD2fOWX/riG6/QW/7BEa3cCNiiOpp9PKGxVO','강유림','쌀보리','01055868908','F','1997-03-09 00:00:00','안녕하세요! 저는 맛밤을 좋아해요',36,0,1,999999,'profile/040b21eb-f8d9-4cee-a5de-3e0416246d53_20230215175027.png',0),(27,'dlgkssk38@naver.com','$2a$10$Ka3p..jaPDtg1xhcYYc2YOir2Y2kAxWsMs.9d0Q0PlFgwvVo0i1sW','이한나','똥개','01023523277','F','1999-12-20 00:00:00','안녕하세요! 졸업하고 싶은 대학원생입니다..!\n서로 열심히 으쌰으쌰 해봅시다!',36,0,1,999999,'profile/64dd63fb-6a50-4abb-9900-2784fcf1b5bd_20230215154809.jpg',1),(28,'withfavor@hanmail.net','$2a$10$TZxAuDZ6PEutNHFjsHV8W.P7YlpwapVtobCgmQHoNLTfxv8F6NyNG','최재희','재링','01091529149','F','1998-10-27 00:00:00','안녕하세요..',36,0,1,999999,'profile/user.png',1),(30,'jyj01068662778@gmail.com','$2a$10$cFrdfZ8rJ1UqJ43F7foJme5NVJsxHGPa0txWolkfs.AdTcsNkAt2m','구예주','장예주','01012341234','F','1999-10-20 00:00:00','안녕하세요 저는 구예주입니다!',36.5,0,1,999999,'profile/user.png',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-16 13:23:29
