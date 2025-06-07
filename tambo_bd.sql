CREATE DATABASE  IF NOT EXISTS `tambo_bd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tambo_bd`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: tambo_bd
-- ------------------------------------------------------
-- Server version	8.4.4

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
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` binary(16) NOT NULL,
  `address` varchar(255) NOT NULL,
  `alias` varchar(255) NOT NULL,
  `apartment` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `district` varchar(255) NOT NULL,
  `floor` varchar(255) DEFAULT NULL,
  `is_primary` bit(1) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `office` varchar(255) DEFAULT NULL,
  `reference` varchar(255) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbrvi7t6vo4g7pp8bij4dhlejv` (`user_id`),
  CONSTRAINT `FKbrvi7t6vo4g7pp8bij4dhlejv` FOREIGN KEY (`user_id`) REFERENCES `auth_user_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_authority`
--

DROP TABLE IF EXISTS `auth_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_authority` (
  `id` binary(16) NOT NULL,
  `role_code` varchar(20) NOT NULL,
  `role_description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_AUTH_AUTHORITY_CODE` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_authority`
--

LOCK TABLES `auth_authority` WRITE;
/*!40000 ALTER TABLE `auth_authority` DISABLE KEYS */;
INSERT INTO `auth_authority` VALUES (_binary '=9�M\�@��AVtI�','ADMIN','Administrador del sistema'),(_binary '�T�uhN��W\'�\�M\�l','USER','Usuario estándar');
/*!40000 ALTER TABLE `auth_authority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_authority`
--

DROP TABLE IF EXISTS `auth_user_authority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_authority` (
  `user_id` binary(16) NOT NULL,
  `authorities_id` binary(16) NOT NULL,
  KEY `FKn7t2r8oft6j1w61po11wnb19w` (`authorities_id`),
  KEY `FKo4vmid5kx45903pdsst9qu1p0` (`user_id`),
  CONSTRAINT `FKn7t2r8oft6j1w61po11wnb19w` FOREIGN KEY (`authorities_id`) REFERENCES `auth_authority` (`id`),
  CONSTRAINT `FKo4vmid5kx45903pdsst9qu1p0` FOREIGN KEY (`user_id`) REFERENCES `auth_user_details` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user_details`
--

DROP TABLE IF EXISTS `auth_user_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_details` (
  `id` binary(16) NOT NULL,
  `created_on` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `enabled` bit(1) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `last_password_reset_request` datetime(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime(6) DEFAULT NULL,
  `updated_on` datetime(6) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKi096w0jnvgjp70hpgqx5v1tbi` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` binary(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKoce3937d2f4mpfqrycbr0l93m` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (_binary '\�\�I��8Im�&x\�y\�@','Marca Prueba');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` binary(16) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKiwylx6fb2dqdw8kfc31vaiiyp` (`code`),
  UNIQUE KEY `UKt8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (_binary '~ݓ\�M��\�c�[�T�','cer21','aaa','Cervezas'),(_binary '�hF\�\�NM���yJ\��G','539134','asd','Cigarros y Vapes'),(_binary '͛�b��@C�-f\�!�ɀ','dasrtds','daaa','RTDs'),(_binary '\�ۄiJ���\�?��','com01','ada','Comidas');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_buttons`
--

DROP TABLE IF EXISTS `category_buttons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_buttons` (
  `id` binary(16) NOT NULL,
  `position` int NOT NULL,
  `category_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5klxtylj0v00v2gb34omjhr7f` (`category_id`),
  CONSTRAINT `FK5klxtylj0v00v2gb34omjhr7f` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_buttons`
--

LOCK TABLES `category_buttons` WRITE;
/*!40000 ALTER TABLE `category_buttons` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_buttons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_type`
--

DROP TABLE IF EXISTS `category_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_type` (
  `id` binary(16) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmgwrsyriidy42m9273cybb8tr` (`category_id`),
  CONSTRAINT `FKmgwrsyriidy42m9273cybb8tr` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_type`
--

LOCK TABLES `category_type` WRITE;
/*!40000 ALTER TABLE `category_type` DISABLE KEYS */;
INSERT INTO `category_type` VALUES (_binary 'Yd�q�Ce��u','sdad2','asdas','Sub categoria 1',_binary '�hF\�\�NM���yJ\��G');
/*!40000 ALTER TABLE `category_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveries`
--

DROP TABLE IF EXISTS `deliveries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveries` (
  `id` binary(16) NOT NULL,
  `assigned_at` datetime(6) DEFAULT NULL,
  `delivered_at` datetime(6) DEFAULT NULL,
  `delivery_notes` varchar(255) DEFAULT NULL,
  `status` enum('ASSIGNED','CANCELLED','DELIVERED','IN_TRANSIT','PENDING') NOT NULL,
  `tracking_link` varchar(255) DEFAULT NULL,
  `delivery_person_id` binary(16) DEFAULT NULL,
  `order_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKk36n9p5v7dd96hpgkwybvbogt` (`order_id`),
  KEY `FKob6pu1i2gc8o3l2k4tpum0ltm` (`delivery_person_id`),
  CONSTRAINT `FK7isx0rnbgqr1dcofd5putl6jw` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKob6pu1i2gc8o3l2k4tpum0ltm` FOREIGN KEY (`delivery_person_id`) REFERENCES `delivery_persons` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_persons`
--

DROP TABLE IF EXISTS `delivery_persons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_persons` (
  `id` binary(16) NOT NULL,
  `is_available` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `plate_number` varchar(255) DEFAULT NULL,
  `vehicle_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_persons`
--

LOCK TABLES `delivery_persons` WRITE;
/*!40000 ALTER TABLE `delivery_persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `id` binary(16) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `percentage` decimal(38,2) DEFAULT NULL,
  `start_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (_binary '��$��L|� ��\�\�\�\�','2025-07-05 02:16:00.000000',_binary '','Descuento 16%',16.00,'2025-06-01 02:16:00.000000');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` binary(16) NOT NULL,
  `item_price` double DEFAULT NULL,
  `product_variant_id` binary(16) DEFAULT NULL,
  `quantity` int NOT NULL,
  `order_id` binary(16) NOT NULL,
  `product_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` binary(16) NOT NULL,
  `discount` double DEFAULT NULL,
  `expected_delivery_date` datetime(6) DEFAULT NULL,
  `order_date` datetime(6) DEFAULT NULL,
  `order_status` enum('CANCELLED','DELIVERED','IN_PROGRESS','PENDING','SHIPPED') NOT NULL,
  `payment_method` tinyint NOT NULL,
  `razon_social` varchar(255) DEFAULT NULL,
  `receipt_type` enum('BOLETA','FACTURA') NOT NULL,
  `ruc` varchar(255) DEFAULT NULL,
  `shipment_tracking_number` varchar(255) DEFAULT NULL,
  `total_amount` double NOT NULL,
  `address_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKhlglkvf5i60dv6dn397ethgpt` (`address_id`),
  KEY `FK2r5d9dwditf15m06s7x6yusmf` (`user_id`),
  CONSTRAINT `FK2r5d9dwditf15m06s7x6yusmf` FOREIGN KEY (`user_id`) REFERENCES `auth_user_details` (`id`),
  CONSTRAINT `FKhlglkvf5i60dv6dn397ethgpt` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`),
  CONSTRAINT `orders_chk_1` CHECK ((`payment_method` between 0 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` binary(16) NOT NULL,
  `amount` double NOT NULL,
  `payment_date` datetime(6) NOT NULL,
  `payment_method` enum('EFECTIVO','PAYPAL','TARJETA_CREDITO','TARJETA_DEBITO','TRANSFERENCIA','YAPE') NOT NULL,
  `payment_status` enum('COMPLETED','FAILED','PENDING') NOT NULL,
  `order_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmf7n8wo2rwrxsd6f3t9ub2mep` (`order_id`),
  CONSTRAINT `FKlouu98csyullos9k25tbpk4va` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_discounts`
--

DROP TABLE IF EXISTS `product_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_discounts` (
  `discount_id` binary(16) NOT NULL,
  `product_id` binary(16) NOT NULL,
  KEY `FK569m0j2bdds7b29fmo0i9jmvl` (`product_id`),
  KEY `FK9933ii647qyyevk2lnjf5h8le` (`discount_id`),
  CONSTRAINT `FK569m0j2bdds7b29fmo0i9jmvl` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FK9933ii647qyyevk2lnjf5h8le` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_discounts`
--

LOCK TABLES `product_discounts` WRITE;
/*!40000 ALTER TABLE `product_discounts` DISABLE KEYS */;
INSERT INTO `product_discounts` VALUES (_binary '��$��L|� ��\�\�\�\�',_binary '(\�훑K���^��\\��');
/*!40000 ALTER TABLE `product_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_resources`
--

DROP TABLE IF EXISTS `product_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_resources` (
  `id` binary(16) NOT NULL,
  `is_primary` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `product_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3k1pn3x472fqhckh85qc6m6y7` (`product_id`),
  CONSTRAINT `FK3k1pn3x472fqhckh85qc6m6y7` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_resources`
--

LOCK TABLES `product_resources` WRITE;
/*!40000 ALTER TABLE `product_resources` DISABLE KEYS */;
INSERT INTO `product_resources` VALUES (_binary '+K��G��\�6K�\�\rZ',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/sfK4PG8SWMK4uHXFm-300-x.webp',_binary '8\�\ZVwR@���\�`e;'),(_binary 'M�4\�J1��n��x',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/AhF6wRHbAxXaCLbMw-300-x.webp',_binary 'U\��w\�C#���@�G'),(_binary 'k,�cO����\�\�N\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/FoNhYgzGtZJSWNrEa-300-x.webp',_binary 'e\�\�\nGU�\�q���\�\�'),(_binary '\�Ͼ#\�L��\�\�\���6N',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/5rBxpq428YvupuC4h-300-x.webp',_binary 'C\��\�O,��V:��='),(_binary '�N2�MI(��=Lh\�\�5',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/rh4Fhx5kg7cv8mDp4-300-x.webp',_binary '�#�G��\�-�5'),(_binary '\'\��%SH��\�FS);m�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/YtT9hRGDeCMtRjseZ-300-x.webp',_binary 'nH�\�\'\rBc��͎ʛ'),(_binary ';z���YES�\���\�4�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/35BkBCJRjeB2QkNh8-300-x.webp',_binary '��(\�\�)EƬB�0���'),(_binary 'DN\r�\�\�HD�m^K\�,�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/68yDPozXN8NLvjrv9-300-x.webp',_binary '�J�\�7LT�\�%�\��\�'),(_binary 'F:�\�B\rLk�\"+�z��\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/bhnFvCEMFasXwqb4P-300-x.webp',_binary 'ZC�wFgBz�\nяW9B\�'),(_binary 'G\�9\�AC�钅�\�x',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/HSjPtvG3qXFf2FE9k-300-x.webp',_binary '� \�\�\r7D���F��F&'),(_binary 'J{LeNFm�fm7�\'�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/EhLAExPzBSZBnJLYu-300-x.webp',_binary '̹�l\�\�Nc�pН\�+�\�'),(_binary '_�X#xzBʎ(dqU��',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/k6GboF6cnwxHjE3m9-300-x.webp',_binary 'Y[$*@��\�\� �u'),(_binary 'b�M��\�\�\�\�\�\�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/TLxCMJQamznCtymH3-300-x.webp',_binary '���X8C�F�����'),(_binary 'c�\�\���I6�P$:�r\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/xFsn3hrQEeWXvYTme-300-x.webp',_binary ')����\�Kk�\�K�8�$U'),(_binary 'dD_hDmNջ=�!M���',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/jooWjuJLo4nbXvCXz-300-x.webp',_binary 'j�׀[�E���ۍ\�\��'),(_binary '�\�\�M%\�Ku�N�5�a�\\',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/wZgncyQzKXYMdPtea-300-x.webp',_binary '���|��M˿\��]�\�\�\�'),(_binary '��\�zl6GA���q�L\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/mYgdr4Zc94c5LpHs2-300-x.webp',_binary '&�ei0DУ\�=�V=�\�'),(_binary '�\�apC\�JR���\��1P',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/AxSnab8tvo3fHfnaW-300-x.webp',_binary 'U*\�\�1A��wے>\�\Z'),(_binary '�\�^G,�小\��I�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/GL2cmPaKz9WYps4C9-300-x.webp',_binary '	]s}G��*�A\�'),(_binary '�^�\�\�N2��\�L\ZQ\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/BvRDsBuhD2SKqbFWt-300-x.webp',_binary '��m[�J��\����\�'),(_binary '�\��\�\�\�LT�\�c\�b�r',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/jdTTJEmAyuQcYxGfs-300-x.webp',_binary './\���MB*�7R\�\�\�\�'),(_binary '�<\\�\�N\Z�\�\�}\�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/GWvSSoPty464qBwcP-300-x.webp',_binary '\�$���QJٻ�\�\�;��'),(_binary '�7P\�s�J/��_�=w��',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/SQSHGg4z7uGHs5GYB-300-x.webp',_binary '�W\�I\�F�\��&I7\'�'),(_binary '\� \�/�J9�\r[\�0\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/tEtkfhQRghu7JnBEE-300-x.webp',_binary 'ʁ\�a�G��\�	�\�'),(_binary '\�È:\�tG���ZQf\�ƺ',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/zpEJpkqJ28aScaWhm-300-x.webp',_binary 'fX�t��K7�.��3�\n'),(_binary '\�E\�\�\�H7��PD��%\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/v6tLtAkyhmxoQ8wHT-300-x.webp',_binary '�>I\�\�\�I��˩b�95\�'),(_binary '\�ܚ�~Aț\��\�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/QxqEPefeNFS83zwgf-300-x.webp',_binary '(\�훑K���^��\\��'),(_binary '\�\�7L�bXLn\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/PS6kGjh2cLxz4RSR4-300-x.webp',_binary '�8\��\�D�\�5��\��J'),(_binary '�%�O���\�o�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/HdgRt69hCCm84eEsK-300-x.webp',_binary '\�\����C��ϩ`��\�\Z');
/*!40000 ALTER TABLE `product_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sections`
--

DROP TABLE IF EXISTS `product_sections`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sections` (
  `id` binary(16) NOT NULL,
  `max_products` int NOT NULL,
  `position` int NOT NULL,
  `category_id` binary(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4oiudweast37h9k0pdfxmo8v0` (`category_id`),
  CONSTRAINT `FK4oiudweast37h9k0pdfxmo8v0` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sections`
--

LOCK TABLES `product_sections` WRITE;
/*!40000 ALTER TABLE `product_sections` DISABLE KEYS */;
INSERT INTO `product_sections` VALUES (_binary ')\���G���6^�\�\�',8,0,_binary '\�ۄiJ���\�?��'),(_binary 'H1*\�KJ:��\�\���RZ',8,0,_binary '�hF\�\�NM���yJ\��G'),(_binary '\\%\�\�RrLh��M�%�',8,0,_binary '͛�b��@C�-f\�!�ɀ'),(_binary '�\�nq|\�B��k03zU\�\�',8,0,_binary '~ݓ\�M��\�c�[�T�');
/*!40000 ALTER TABLE `product_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` binary(16) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` text,
  `is_active` bit(1) NOT NULL,
  `is_new_arrival` bit(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `rating` float DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `brand_id` binary(16) NOT NULL,
  `category_id` binary(16) NOT NULL,
  `category_type_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKostq1ec3toafnjok09y9l7dox` (`slug`),
  KEY `FKa3a4mpsfdf4d2y6r8ra3sc8mv` (`brand_id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  KEY `FK2pw105qhy1aca2a6bqc19rbxn` (`category_type_id`),
  CONSTRAINT `FK2pw105qhy1aca2a6bqc19rbxn` FOREIGN KEY (`category_type_id`) REFERENCES `category_type` (`id`),
  CONSTRAINT `FKa3a4mpsfdf4d2y6r8ra3sc8mv` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (_binary '	]s}G��*�A\�','2025-06-05 20:47:34.392000','¡Llévate el mejor pack para tus reus! 3 empanadas de carne + 3 empanada de pollo + 1 Coca Cola. Encuéntralo solo en Tambo.peEste producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Pack (3 Empanada De Carne + 3 Empanada De Pollo + 1 Coca Cola x 1 Lt)',25.60,NULL,'sad86',10,'2025-06-05 20:47:34.392000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary 'ʁ\�a�G��\�	�\�','2025-06-05 02:05:32.648000','Llévate un sixpack Dragenburg en su presentación de 310 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.',_binary '',_binary '\0','Cerveza De Malta Y Maiz Dragenburg Sixpack 310 Ml',18.90,NULL,'as1234',12,'2025-06-05 02:05:32.648000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary '�W\�I\�F�\��&I7\'�','2025-06-05 02:15:04.559000','Pack de 2 bebidas RTD Smirnoff sabor a manzana verde lata de 350 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.',_binary '',_binary '\0',' Pack (2 Rtd Smirnoff Ice Green Apple Lata x 350 Ml)',17.20,NULL,'asd888',33,'2025-06-05 02:15:04.559000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary '��m[�J��\����\�','2025-06-05 20:45:59.251000','',_binary '',_binary '\0','Pack 2 RTD Mamitas 6% Vol. Mandarina 355ml',14.00,NULL,'jfgh776',5,'2025-06-05 20:45:59.251000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary 'e\�\�\nGU�\�q���\�\�','2025-06-05 20:49:03.502000','Llévate 10 empanadas Tambo, rellenitas de full carne. ¡Recíbelas en tan solo 30 minutos!Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0',' Pack (10 Empanada De Carne)',34.00,NULL,'asd867',8,'2025-06-05 20:49:03.502000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary '&�ei0DУ\�=�V=�\�','2025-06-05 02:11:50.352000','8 unidades de gelatina a base de alcohol Four Loko sabor a mango, fresa, manzana y uva. Solo en tambo.pe\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Jelly Shots Four Loko Surtido 8 und',14.90,NULL,'dg8',10,'2025-06-05 02:11:50.352000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary '(\�훑K���^��\\��','2025-06-05 02:10:47.396000','Llévate un sixpack Tres Cruces en su presentación de 473 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 6 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Six Pack Lata 473 ml',32.90,NULL,'asd77',22,'2025-06-05 02:10:47.396000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary ')����\�Kk�\�K�8�$U','2025-06-05 20:50:18.217000','¡Pack para compartir! 2 hamburguesas parrilleras Tambo + Coca Cola de 1L. ¡Recíbelo en tan solo en 30 minutos!',_binary '',_binary '\0',' Pack (1 Coca Cola x 1 Lt + 2 Hamburguesa Parrillera)',21.00,NULL,'asd6565',11,'2025-06-05 20:50:18.217000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary './\���MB*�7R\�\�\�\�','2025-06-05 02:06:51.494000','Llévate un fourpack Heineken en su presentación de lata 473 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Cerveza Heineken Fourpack Lata 473 ml',27.90,NULL,'asd241',11,'2025-06-05 02:06:51.494000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary '8\�\ZVwR@���\�`e;','2025-06-04 21:04:22.379000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Blueberry Ice 1500 Puff 1 und',32.00,NULL,'1as',36,'2025-06-05 01:46:36.985000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary 'C\��\�O,��V:��=','2025-06-05 02:14:32.892000','Pack de 2 bebidas RTD Smirnoff sabor a manzana verde botella de 355 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Pack (2 Rtd Smirnoff Ice Green Apple Botella 355 ml)',19.00,NULL,'asd124',11,'2025-06-05 02:14:32.892000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary 'U*\�\�1A��wے>\�\Z','2025-06-04 21:04:02.752000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Strawberry Mango 1500 Puff 1 und',32.00,NULL,'d22',36,'2025-06-05 01:47:59.640000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary 'U\��w\�C#���@�G','2025-06-05 02:14:00.825000','Pack de 3 bebidas RTD Smirnoff sabor a manzana verde lata de 350 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Pack (3 Rtd Smirnoff Ice Green Apple Lata x 350 Ml)',25.80,NULL,'asd123',11,'2025-06-05 02:14:00.825000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary 'Y[$*@��\�\� �u','2025-06-05 20:49:42.914000','La hamburguesa Prime de Tambo en colaboración con Renzo Garibaldi está bien servida con una hamburguesa de res bien contundente, tocino y queso acompáñala de tus salsas favoritas. ¡Recíbela en tan solo 30 minutos!',_binary '',_binary '\0','Hamburguesa Prime de Res Tocino Queso 1 und',12.90,NULL,'asd75',3,'2025-06-05 20:49:42.914000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary 'ZC�wFgBz�\nяW9B\�','2025-06-05 20:48:33.261000','',_binary '',_binary '\0','Pack 1 (Sandwich Prime Pulled Pork + Hamburguesa Prime de Res Tocino Queso + Gaseosa Coca Cola 500ml)',28.80,NULL,'ad32',2,'2025-06-05 20:48:33.261000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary 'fX�t��K7�.��3�\n','2025-06-05 20:50:41.331000','',_binary '',_binary '\0','Pack (1 Triple integral de pollo, espinaca y tocino + 1 Gaseosa Coca Cola Sin Azucar 300ml)',11.90,NULL,'asd1123',11,'2025-06-05 20:50:41.331000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary 'j�׀[�E���ۍ\�\��','2025-06-05 02:13:22.916000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Pack (2 Jelly Shots Four Loko Surtido x 8 Und)',29.80,NULL,'daqqq',11,'2025-06-05 02:13:22.916000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary 'nH�\�\'\rBc��͎ʛ','2025-06-05 01:58:41.497000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\n',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Alaska Mint 1500 Puff 1 und',32.00,NULL,'ds34',56,'2025-06-05 01:58:41.497000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary '��(\�\�)EƬB�0���','2025-06-04 21:03:38.572000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Grape Jelly 1500 Puff 1 und',32.00,NULL,'asjhdjas',11,'2025-06-05 01:48:31.727000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary '�J�\�7LT�\�%�\��\�','2025-06-05 01:57:29.670000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Strawberry Banana 1500 Puff 1 und',32.00,NULL,'da333',15,'2025-06-05 01:57:29.670000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary '���|��M˿\��]�\�\�\�','2025-06-05 02:09:42.597000','Llévate un sixpack Pilsen en su presentación de 355 ml a precio oferta y disfruta con tus patas. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Pilsen Callao Six Pack Lata 355 ml',28.90,NULL,'da555',11,'2025-06-05 02:09:42.597000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary '���X8C�F�����','2025-06-02 14:54:12.785000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Pina Colada 1500 Puff 1 und',32.00,NULL,'asd33',54,'2025-06-05 01:55:44.513000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary '�>I\�\�\�I��˩b�95\�','2025-06-05 20:44:43.648000','',_binary '',_binary '\0','Pack 1 Vino Altos Del Sur Rose Botella 750Ml + 1 Rtd Psyco Berry Crush + 1 Rtd Psyco Green Apple 473Ml',37.70,NULL,'d8565',10,'2025-06-05 20:44:43.648000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary '̹�l\�\�Nc�pН\�+�\�','2025-06-05 20:48:06.752000','¡Llévate el mejor pack para tu antojo! 5 empanadas de pollo + 5 empanadas de carne+ 1 Coca Cola de 1L. Encuéntralo solo en Tambo.peEste producto está limitado a 2 unidades por compra',_binary '',_binary '\0','Pack (5 Empanada De Carne + 5 Empanada De Pollo + 1 Coca Cola x 1 Lt)',32.20,NULL,'asd090',5,'2025-06-05 20:48:06.752000',_binary '\�\�I��8Im�&x\�y\�@',_binary '\�ۄiJ���\�?��',NULL),(_binary '\�$���QJٻ�\�\�;��','2025-06-05 20:46:32.710000','',_binary '',_binary '\0','Pack 2 RTD Mamitas 6% Vol. Piña 355ml',14.00,NULL,'asd63',6,'2025-06-05 20:46:32.710000',_binary '\�\�I��8Im�&x\�y\�@',_binary '͛�b��@C�-f\�!�ɀ',NULL),(_binary '\�\����C��ϩ`��\�\Z','2025-06-05 02:01:43.096000','Llévate un sixpack Tres Cruces en su presentación de 355 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Lager Six Pack Lata 355ml',24.90,NULL,'22jj',13,'2025-06-05 02:01:43.096000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary '� \�\�\r7D���F��F&','2025-06-05 02:06:11.896000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 10 unidades por compra',_binary '',_binary '\0','Cerveza Coronita Six Pack Botella 210 ml',20.90,NULL,'asd56',65,'2025-06-05 02:06:11.896000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL),(_binary '�8\��\�D�\�5��\��J','2025-06-05 01:59:24.194000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Berry Trio Ice 9000 Puff 1 und',65.00,NULL,'asd111',23,'2025-06-05 01:59:24.194000',_binary '\�\�I��8Im�&x\�y\�@',_binary '�hF\�\�NM���yJ\��G',NULL),(_binary '�#�G��\�-�5','2025-06-05 02:08:11.270000','Llévate un sixpack Tres Cruces en su presentación de 355 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Light Six Pack Lata X 310 Ml',23.90,NULL,'asd42',21,'2025-06-05 02:08:11.270000',_binary '\�\�I��8Im�&x\�y\�@',_binary '~ݓ\�M��\�c�[�T�',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider_images`
--

DROP TABLE IF EXISTS `slider_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slider_images` (
  `id` binary(16) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `position` int NOT NULL,
  `redirect_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider_images`
--

LOCK TABLES `slider_images` WRITE;
/*!40000 ALTER TABLE `slider_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `slider_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'tambo_bd'
--

--
-- Dumping routines for database 'tambo_bd'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-06  2:45:31
