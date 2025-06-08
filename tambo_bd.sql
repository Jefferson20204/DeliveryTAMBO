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
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (_binary '��I��8Im','Marca Prueba');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (_binary '~ݓ�M��\�','cer21','aaa','Cervezas'),(_binary '͛�b��@C\�','dasrtds','daaa','RTDs'),(_binary '�ۄiJ��','com01','ada','Comidas'),(_binary '�hF��NM�','539134','asd','Cigarros y Vapes');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category_buttons`
--

LOCK TABLES `category_buttons` WRITE;
/*!40000 ALTER TABLE `category_buttons` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_buttons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `category_type`
--

LOCK TABLES `category_type` WRITE;
/*!40000 ALTER TABLE `category_type` DISABLE KEYS */;
INSERT INTO `category_type` VALUES (_binary 'Yd�q�Ce�\�','sdad2','asdas','Sub categoria 1',_binary '�hF��NM�');
/*!40000 ALTER TABLE `category_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `deliveries`
--

LOCK TABLES `deliveries` WRITE;
/*!40000 ALTER TABLE `deliveries` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliveries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `delivery_persons`
--

LOCK TABLES `delivery_persons` WRITE;
/*!40000 ALTER TABLE `delivery_persons` DISABLE KEYS */;
/*!40000 ALTER TABLE `delivery_persons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (_binary '��$��L|','2025-07-05 02:16:00.000000',_binary '','Descuento 16%',16.00,'2025-06-01 02:16:00.000000');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_discounts`
--

LOCK TABLES `product_discounts` WRITE;
/*!40000 ALTER TABLE `product_discounts` DISABLE KEYS */;
INSERT INTO `product_discounts` VALUES (_binary '��$��L|',_binary '(�훑K��\�');
/*!40000 ALTER TABLE `product_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_resources`
--

LOCK TABLES `product_resources` WRITE;
/*!40000 ALTER TABLE `product_resources` DISABLE KEYS */;
INSERT INTO `product_resources` VALUES (_binary '+K��G�\�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/sfK4PG8SWMK4uHXFm-300-x.webp',_binary '8�\ZVwR@��\�'),(_binary 'M�4�J1�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/AhF6wRHbAxXaCLbMw-300-x.webp',_binary 'U��w�C#\�'),(_binary 'k,�cO��\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/FoNhYgzGtZJSWNrEa-300-x.webp',_binary 'e��\nGU�\�'),(_binary '�Ͼ#�L�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/5rBxpq428YvupuC4h-300-x.webp',_binary 'C���O,\�'),(_binary '�N2�MI(�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/rh4Fhx5kg7cv8mDp4-300-x.webp',_binary '�#�G�\�'),(_binary '\'��%SH�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/YtT9hRGDeCMtRjseZ-300-x.webp',_binary 'nH��\'\rBc�\�'),(_binary ';z���YES\�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/35BkBCJRjeB2QkNh8-300-x.webp',_binary '��(��)E\�'),(_binary 'DN\r���HD\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/68yDPozXN8NLvjrv9-300-x.webp',_binary '�J��7LT\�'),(_binary 'F:��B\rLk�\"',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/bhnFvCEMFasXwqb4P-300-x.webp',_binary 'ZC�wFgBz�\nя'),(_binary 'G�9�AC�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/HSjPtvG3qXFf2FE9k-300-x.webp',_binary '� ��\r7D�'),(_binary 'J{LeNFm�fm7\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/EhLAExPzBSZBnJLYu-300-x.webp',_binary '̹�l��Nc\�'),(_binary '_�X#xzBʎ(dqU',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/k6GboF6cnwxHjE3m9-300-x.webp',_binary 'Y[$*@��\�'),(_binary 'b�M��\�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/TLxCMJQamznCtymH3-300-x.webp',_binary '���X8C\�'),(_binary 'c�����',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/xFsn3hrQEeWXvYTme-300-x.webp',_binary ')�����'),(_binary 'dD_hDmNջ=�!M\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/jooWjuJLo4nbXvCXz-300-x.webp',_binary 'j�׀[�E�\�'),(_binary '�%�O��',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/HdgRt69hCCm84eEsK-300-x.webp',_binary '�����'),(_binary '�<\\��N\Z\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/GWvSSoPty464qBwcP-300-x.webp',_binary '�$���QJ\�'),(_binary '� �/�J9\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/tEtkfhQRghu7JnBEE-300-x.webp',_binary 'ʁ�a�G�'),(_binary '�7P�s�J/\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/SQSHGg4z7uGHs5GYB-300-x.webp',_binary '�W�I�F\�'),(_binary '�E���H7\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/v6tLtAkyhmxoQ8wHT-300-x.webp',_binary '�>I���I\�'),(_binary '�^���N2\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/BvRDsBuhD2SKqbFWt-300-x.webp',_binary '��m[�J�'),(_binary '�È:�tG�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/zpEJpkqJ28aScaWhm-300-x.webp',_binary 'fX�t��K7\�'),(_binary '�ܚ�~Aț�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/QxqEPefeNFS83zwgf-300-x.webp',_binary '(�훑K��\�'),(_binary '��^G,�\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/GL2cmPaKz9WYps4C9-300-x.webp',_binary '	]s}G��*'),(_binary '��7L�b',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/PS6kGjh2cLxz4RSR4-300-x.webp',_binary '�8���D'),(_binary '��apC�JR\�',_binary '','image','image','https://tofuu.getjusto.com/orioneat-local/resized2/AxSnab8tvo3fHfnaW-300-x.webp',_binary 'U*��1A��'),(_binary '���M%�Ku',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/wZgncyQzKXYMdPtea-300-x.webp',_binary '���|��'),(_binary '���zl6GA\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/mYgdr4Zc94c5LpHs2-300-x.webp',_binary '&�ei0DУ�=\�'),(_binary '�����\�',_binary '','imagen','image','https://tofuu.getjusto.com/orioneat-local/resized2/jdTTJEmAyuQcYxGfs-300-x.webp',_binary './���MB*\�');
/*!40000 ALTER TABLE `product_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `product_sections`
--

LOCK TABLES `product_sections` WRITE;
/*!40000 ALTER TABLE `product_sections` DISABLE KEYS */;
INSERT INTO `product_sections` VALUES (_binary ')���G�\�',8,0,_binary '�ۄiJ��'),(_binary 'H1*�KJ:��',8,0,_binary '�hF��NM�'),(_binary '\\%��RrLh�\�',8,0,_binary '͛�b��@C\�'),(_binary '��nq|�B�',8,0,_binary '~ݓ�M��\�');
/*!40000 ALTER TABLE `product_sections` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (_binary '	]s}G��*','2025-06-05 20:47:34.392000','¡Llévate el mejor pack para tus reus! 3 empanadas de carne + 3 empanada de pollo + 1 Coca Cola. Encuéntralo solo en Tambo.peEste producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Pack (3 Empanada De Carne + 3 Empanada De Pollo + 1 Coca Cola x 1 Lt)',25.60,NULL,'sad86',10,'2025-06-05 20:47:34.392000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary 'ʁ�a�G�','2025-06-05 02:05:32.648000','Llévate un sixpack Dragenburg en su presentación de 310 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.',_binary '',_binary '\0','Cerveza De Malta Y Maiz Dragenburg Sixpack 310 Ml',18.90,NULL,'as1234',12,'2025-06-05 02:05:32.648000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary '�W�I�F\�','2025-06-05 02:15:04.559000','Pack de 2 bebidas RTD Smirnoff sabor a manzana verde lata de 350 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.',_binary '',_binary '\0',' Pack (2 Rtd Smirnoff Ice Green Apple Lata x 350 Ml)',17.20,NULL,'asd888',33,'2025-06-05 02:15:04.559000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary '��m[�J�','2025-06-05 20:45:59.251000','',_binary '',_binary '\0','Pack 2 RTD Mamitas 6% Vol. Mandarina 355ml',14.00,NULL,'jfgh776',5,'2025-06-05 20:45:59.251000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary 'e��\nGU�\�','2025-06-05 20:49:03.502000','Llévate 10 empanadas Tambo, rellenitas de full carne. ¡Recíbelas en tan solo 30 minutos!Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0',' Pack (10 Empanada De Carne)',34.00,NULL,'asd867',8,'2025-06-05 20:49:03.502000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary '&�ei0DУ�=\�','2025-06-05 02:11:50.352000','8 unidades de gelatina a base de alcohol Four Loko sabor a mango, fresa, manzana y uva. Solo en tambo.pe\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Jelly Shots Four Loko Surtido 8 und',14.90,NULL,'dg8',10,'2025-06-05 02:11:50.352000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary '(�훑K��\�','2025-06-05 02:10:47.396000','Llévate un sixpack Tres Cruces en su presentación de 473 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 6 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Six Pack Lata 473 ml',32.90,NULL,'asd77',22,'2025-06-05 02:10:47.396000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary ')�����','2025-06-05 20:50:18.217000','¡Pack para compartir! 2 hamburguesas parrilleras Tambo + Coca Cola de 1L. ¡Recíbelo en tan solo en 30 minutos!',_binary '',_binary '\0',' Pack (1 Coca Cola x 1 Lt + 2 Hamburguesa Parrillera)',21.00,NULL,'asd6565',11,'2025-06-05 20:50:18.217000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary './���MB*\�','2025-06-05 02:06:51.494000','Llévate un fourpack Heineken en su presentación de lata 473 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Cerveza Heineken Fourpack Lata 473 ml',27.90,NULL,'asd241',11,'2025-06-05 02:06:51.494000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary '8�\ZVwR@��\�','2025-06-04 21:04:22.379000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Blueberry Ice 1500 Puff 1 und',32.00,NULL,'1as',36,'2025-06-05 01:46:36.985000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary 'C���O,\�','2025-06-05 02:14:32.892000','Pack de 2 bebidas RTD Smirnoff sabor a manzana verde botella de 355 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Pack (2 Rtd Smirnoff Ice Green Apple Botella 355 ml)',19.00,NULL,'asd124',11,'2025-06-05 02:14:32.892000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary 'U*��1A��','2025-06-04 21:04:02.752000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Strawberry Mango 1500 Puff 1 und',32.00,NULL,'d22',36,'2025-06-05 01:47:59.640000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary 'U��w�C#\�','2025-06-05 02:14:00.825000','Pack de 3 bebidas RTD Smirnoff sabor a manzana verde lata de 350 ml, listo para tomar y disfrutar donde quieras. Compra en Tambo.pe\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Pack (3 Rtd Smirnoff Ice Green Apple Lata x 350 Ml)',25.80,NULL,'asd123',11,'2025-06-05 02:14:00.825000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary 'Y[$*@��\�','2025-06-05 20:49:42.914000','La hamburguesa Prime de Tambo en colaboración con Renzo Garibaldi está bien servida con una hamburguesa de res bien contundente, tocino y queso acompáñala de tus salsas favoritas. ¡Recíbela en tan solo 30 minutos!',_binary '',_binary '\0','Hamburguesa Prime de Res Tocino Queso 1 und',12.90,NULL,'asd75',3,'2025-06-05 20:49:42.914000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary 'ZC�wFgBz�\nя','2025-06-05 20:48:33.261000','',_binary '',_binary '\0','Pack 1 (Sandwich Prime Pulled Pork + Hamburguesa Prime de Res Tocino Queso + Gaseosa Coca Cola 500ml)',28.80,NULL,'ad32',2,'2025-06-05 20:48:33.261000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary 'fX�t��K7\�','2025-06-05 20:50:41.331000','',_binary '',_binary '\0','Pack (1 Triple integral de pollo, espinaca y tocino + 1 Gaseosa Coca Cola Sin Azucar 300ml)',11.90,NULL,'asd1123',11,'2025-06-05 20:50:41.331000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary 'j�׀[�E�\�','2025-06-05 02:13:22.916000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 3 unidades por compra',_binary '',_binary '\0','Pack (2 Jelly Shots Four Loko Surtido x 8 Und)',29.80,NULL,'daqqq',11,'2025-06-05 02:13:22.916000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary 'nH��\'\rBc�\�','2025-06-05 01:58:41.497000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\n\n',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Alaska Mint 1500 Puff 1 und',32.00,NULL,'ds34',56,'2025-06-05 01:58:41.497000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary '̹�l��Nc\�','2025-06-05 20:48:06.752000','¡Llévate el mejor pack para tu antojo! 5 empanadas de pollo + 5 empanadas de carne+ 1 Coca Cola de 1L. Encuéntralo solo en Tambo.peEste producto está limitado a 2 unidades por compra',_binary '',_binary '\0','Pack (5 Empanada De Carne + 5 Empanada De Pollo + 1 Coca Cola x 1 Lt)',32.20,NULL,'asd090',5,'2025-06-05 20:48:06.752000',_binary '��I��8Im',_binary '�ۄiJ��',NULL),(_binary '� ��\r7D�','2025-06-05 02:06:11.896000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 10 unidades por compra',_binary '',_binary '\0','Cerveza Coronita Six Pack Botella 210 ml',20.90,NULL,'asd56',65,'2025-06-05 02:06:11.896000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary '�#�G�\�','2025-06-05 02:08:11.270000','Llévate un sixpack Tres Cruces en su presentación de 355 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Light Six Pack Lata X 310 Ml',23.90,NULL,'asd42',21,'2025-06-05 02:08:11.270000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary '�$���QJ\�','2025-06-05 20:46:32.710000','',_binary '',_binary '\0','Pack 2 RTD Mamitas 6% Vol. Piña 355ml',14.00,NULL,'asd63',6,'2025-06-05 20:46:32.710000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary '�8���D','2025-06-05 01:59:24.194000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Berry Trio Ice 9000 Puff 1 und',65.00,NULL,'asd111',23,'2025-06-05 01:59:24.194000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary '�>I���I\�','2025-06-05 20:44:43.648000','',_binary '',_binary '\0','Pack 1 Vino Altos Del Sur Rose Botella 750Ml + 1 Rtd Psyco Berry Crush + 1 Rtd Psyco Green Apple 473Ml',37.70,NULL,'d8565',10,'2025-06-05 20:44:43.648000',_binary '��I��8Im',_binary '͛�b��@C\�',NULL),(_binary '�J��7LT\�','2025-06-05 01:57:29.670000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Strawberry Banana 1500 Puff 1 und',32.00,NULL,'da333',15,'2025-06-05 01:57:29.670000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary '��(��)E\�','2025-06-04 21:03:38.572000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electronico Geekbar Meloso Mini Grape Jelly 1500 Puff 1 und',32.00,NULL,'asjhdjas',11,'2025-06-05 01:48:31.727000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary '���X8C\�','2025-06-02 14:54:12.785000','Producto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.',_binary '',_binary '\0','Vapeador Electrónico Geekbar Meloso Pina Colada 1500 Puff 1 und',32.00,NULL,'asd33',54,'2025-06-05 01:55:44.513000',_binary '��I��8Im',_binary '�hF��NM�',NULL),(_binary '���|��','2025-06-05 02:09:42.597000','Llévate un sixpack Pilsen en su presentación de 355 ml a precio oferta y disfruta con tus patas. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Pilsen Callao Six Pack Lata 355 ml',28.90,NULL,'da555',11,'2025-06-05 02:09:42.597000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL),(_binary '�����','2025-06-05 02:01:43.096000','Llévate un sixpack Tres Cruces en su presentación de 355 ml a precio oferta. Compra en Tambo.pe y recibe tu pedido en 30 min.\n\n\n\nProducto exclusivo para mayores de edad (+18). Presenta tu documento de identidad a la entrega para comprobar tu edad.\nTomar bebidas alcohólicas en exceso es dañino.Este producto está limitado a 5 unidades por compra',_binary '',_binary '\0','Cerveza Tres Cruces Lager Six Pack Lata 355ml',24.90,NULL,'22jj',13,'2025-06-05 02:01:43.096000',_binary '��I��8Im',_binary '~ݓ�M��\�',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2025-06-07 20:29:55
