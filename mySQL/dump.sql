-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: cookbook
-- ------------------------------------------------------
-- Server version	5.7.33-log

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
-- Table structure for table `flavortags`
--

DROP TABLE IF EXISTS `flavortags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flavortags` (
  `id` varchar(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flavortags`
--

LOCK TABLES `flavortags` WRITE;
/*!40000 ALTER TABLE `flavortags` DISABLE KEYS */;
INSERT INTO `flavortags` VALUES ('1','Spicy','2021-05-24 20:15:32'),('2','Sweet','2021-05-24 20:15:32'),('3','Savory','2021-05-24 20:15:32'),('4','Mild','2021-05-24 20:15:32'),('5','Beefy','2021-05-24 20:15:32'),('6','Medium','2021-05-24 20:15:32'),('7','Salty','2021-05-24 20:15:32'),('8','Sugary','2021-05-24 20:15:32');
/*!40000 ALTER TABLE `flavortags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` varchar(40) NOT NULL,
  `name` varchar(69) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES ('01d1e284-566d-4562-be49-21248ce71dfc','French Beans'),('0b691e4c-e077-47a2-96fa-c44de043bb42','Smoked Paprika'),('1','pasta'),('2','bread'),('23b54949-e6fd-43a0-82cb-8b7e76329173','Ginger'),('2e3e5134-21bc-4fb7-a9f7-d923ec7e08a5','Black Pepper'),('3','ham'),('332a1e1e-4dfa-47d5-a4dd-7ab58cd10eb0','Smoked Turmeric'),('4','cheese'),('5','brown mustard'),('5f281484-77d4-4255-8628-9f0a4cf746b2','Ribeye Steak'),('6e04a101-9ada-4406-9657-bbd372e3ff59','Sweet Onion'),('b4c0734b-d8b6-467b-bf1b-b5364624d1cd','Tomato'),('b81de4dd-e053-4868-97eb-10afddb15e1e','pizza'),('ba48dcbd-ab87-4f62-beba-fb7295d02408','Salt'),('f4a55934-8783-4bef-817d-8852ee8bc4cb','Garlic');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipeflavortags`
--

DROP TABLE IF EXISTS `recipeflavortags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipeflavortags` (
  `recipe_id` varchar(36) NOT NULL,
  `flavor_tag_id` varchar(36) NOT NULL,
  PRIMARY KEY (`recipe_id`,`flavor_tag_id`),
  KEY `flavor_tag_id` (`flavor_tag_id`),
  CONSTRAINT `recipeflavortags_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `recipeflavortags_ibfk_2` FOREIGN KEY (`flavor_tag_id`) REFERENCES `flavortags` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipeflavortags`
--

LOCK TABLES `recipeflavortags` WRITE;
/*!40000 ALTER TABLE `recipeflavortags` DISABLE KEYS */;
INSERT INTO `recipeflavortags` VALUES ('a9110630-19a9-4499-a0ce-b347268d890c','1'),('e2e9be05-26f1-44c1-99a0-fcb04b6773d3','1'),('a9110630-19a9-4499-a0ce-b347268d890c','2'),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','3'),('3b558296-bf37-476e-b05b-7b7de542d702','3'),('a9110630-19a9-4499-a0ce-b347268d890c','3'),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','4'),('a9110630-19a9-4499-a0ce-b347268d890c','4'),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','5'),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','6');
/*!40000 ALTER TABLE `recipeflavortags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipeingredients`
--

DROP TABLE IF EXISTS `recipeingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipeingredients` (
  `recipe_id` varchar(40) NOT NULL,
  `ingredient_id` varchar(40) NOT NULL,
  `ingredient_qty` varchar(420) DEFAULT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_id` (`ingredient_id`),
  CONSTRAINT `recipeingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`),
  CONSTRAINT `recipeingredients_ibfk_2` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipeingredients`
--

LOCK TABLES `recipeingredients` WRITE;
/*!40000 ALTER TABLE `recipeingredients` DISABLE KEYS */;
INSERT INTO `recipeingredients` VALUES ('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','1','2'),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','2','2'),('67494f8c-2f8e-4ab8-8e47-f0e3d4bea0f9','01d1e284-566d-4562-be49-21248ce71dfc',NULL),('67494f8c-2f8e-4ab8-8e47-f0e3d4bea0f9','2',NULL),('a9110630-19a9-4499-a0ce-b347268d890c','0b691e4c-e077-47a2-96fa-c44de043bb42',NULL),('a9110630-19a9-4499-a0ce-b347268d890c','23b54949-e6fd-43a0-82cb-8b7e76329173',NULL),('a9110630-19a9-4499-a0ce-b347268d890c','332a1e1e-4dfa-47d5-a4dd-7ab58cd10eb0',NULL),('a9110630-19a9-4499-a0ce-b347268d890c','f4a55934-8783-4bef-817d-8852ee8bc4cb',NULL),('bd79e2b3-0379-450d-8809-9924c1005ff6','1','2 slices'),('bd79e2b3-0379-450d-8809-9924c1005ff6','5','1 big squirt'),('e2e9be05-26f1-44c1-99a0-fcb04b6773d3','1','2 slices'),('e2e9be05-26f1-44c1-99a0-fcb04b6773d3','5','1 big squirt');
/*!40000 ALTER TABLE `recipeingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` varchar(36) NOT NULL,
  `title` varchar(60) NOT NULL,
  `summary` varchar(250) DEFAULT 'Add a Summary',
  `instructions` varchar(1000) DEFAULT ' David!!!, Just fold in the cheese...add your directions',
  `user_id` varchar(36) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES ('0011b2c2-639d-409d-b3e8-33e07777f5f2','multi post','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 20:38:40',NULL),('0c8da426-2f9f-4024-b53d-b6c0e8cf1d64','fdsdaf','dsfasdf','##### fdsafdfsasdf \n ---  \n ###### Just fold in the cheese, David!\n','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 06:00:03',NULL),('2da72b82-70e0-4220-84b5-4cb64303c9a7','which token','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-28 09:30:33',NULL),('334c6f4e-6f2f-4c2b-b5c9-85480547a14f','Belarussian','optical Rubber back solution-oriented Human','If we parse the protocol, we can get to the SMS firewall through the primary ADP feed!','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 19:33:11',NULL),('3b558296-bf37-476e-b05b-7b7de542d702','blue','white didactic reboot Sausages sticky','We need to back up the redundant HTTP driver!','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 19:32:21',NULL),('67494f8c-2f8e-4ab8-8e47-f0e3d4bea0f9','Supreme Steak Marinade','Makes enough for 4 steaks','##### In a bowl, mix:\n ---  \n 1. Coconut Aminos\n 2. Apple Cider Vinegar\n 3. Ginger\n 4. Garlic\n 5. Smoked Paprika\n','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 05:41:22','2021-05-27 17:36:25'),('6903b2f1-4871-4634-8c89-0f665ccab31c','jfkdls;a','jfkdsa;sdfj','  - What does that even mean?\n','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 06:07:01',NULL),('87f1490f-6968-422c-b981-31c8d37c9de2','multi post','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 20:33:18',NULL),('93c57cef-52d1-4eaa-8ce9-ff4b7d622274','today','5-27','##### Here\'s an example to get you started! \n ---  \n ###### Just fold in the cheese, David!\n  - What does that even mean?\n 1. Fold\n 2. in the\n 3. cheese!!!\n **Do You even know what it means?** \n *I most certainly do!!*','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-28 04:36:36',NULL),('9718a0ef-2c83-43f6-9849-440f519df2d8','Grilled Cheese','Quick Lunch','Warm skillet to medium temp, Add Butter, Bread with cheese, cook until lightly browned','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 15:22:46',NULL),('9974637b-bd63-498c-bab8-8fca1ec62cea','AI','next-generation indexing Krone invoice','Use the bluetooth FTP port, then you can synthesize the virtual alarm!','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 19:33:13',NULL),('a9110630-19a9-4499-a0ce-b347268d890c','South Asian Dry Rub','Great for meats','\n\n##### In a bowl, Mix:\n- All Ingredients\n- Knead into meats\n- Let rest, refrigerated for 6hrs ','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 15:30:58',NULL),('b674b85c-1b8e-46e6-b2fa-d971db5ae913','Test','Test summary','##### Test Markdown\n ---  \n *','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 05:57:58',NULL),('bd79e2b3-0379-450d-8809-9924c1005ff6','multi post','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 20:42:47',NULL),('e2e9be05-26f1-44c1-99a0-fcb04b6773d3','multi post','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 20:44:36',NULL),('ebfa73ce-99b2-446b-a02e-54f680454d3c','Test Mo','Mo Test','  - test markdown\n','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 06:08:51',NULL),('f8811cd8-1b1d-494a-9788-ca463abb3087','qwert','qwerty','  - qwertyyy\n','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 06:03:44',NULL),('f8cb8ebf-3ed9-4a5b-af88-bf09f7f60ee1','fdsaf','fdsafd','##### Here\'s afdsafdsn example to get you started! \n ---  \n ###### Just fold in the cheese, David!\n  - What does that even mean?\n 1. Fold\n 2. in the\n 3. cheese!!!\n **Do You even know what it means?** \n *I most certainly do!!*','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-27 06:00:40',NULL),('f9c0de26-afdf-4404-9341-153b75b70eb1','multi post','hope it works','press enter, and pray','2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','2021-05-24 20:41:22',NULL);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `role` tinyint(4) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2dbc86ff-67aa-44d5-98f3-7d81e9a99a15','testing1','testing1@testing.com','$2b$12$SVD91BCcNlxL9vqRIJ0Tp.dTEuc06KG5UrL5qlTYDY3cYsCt92dgO',1,'2021-05-24 15:13:44',NULL),('e6278ffe-57d2-470c-a436-c9b6712bace9','testing3','testing3@testing.com','$2b$12$Zp4J.qneISZmHgavuffka.zt1dIAiAzsEmaZO2fIP.TW6MJusXKb6',1,'2021-05-24 15:14:30',NULL),('fea1b302-5357-4341-8dc0-96a9a0861d8b','testing2','testing2@testing.com','$2b$12$Fj9h4YN6NJvT5GNpUEpoWecrbEh9iu5pMS2uN2nxGDZZfygZF3Yti',1,'2021-05-24 15:14:16',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'cookbook'
--
/*!50003 DROP PROCEDURE IF EXISTS `spConcatRecipeIngredients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `spConcatRecipeIngredients`(recipe_id VARCHAR(36))
BEGIN
		SELECT 
    r.*, 
    GROUP_CONCAT(i.name SEPARATOR '™') AS ingredients, 
    GROUP_CONCAT(ri.ingredient_id SEPARATOR'™') AS ingredient_ids,
    GROUP_CONCAT(ri.ingredient_qty SEPARATOR '™') AS quantities
        FROM Recipes r
            JOIN RecipeIngredients ri ON r.id = ri.recipe_id
            JOIN Ingredients i ON i.id = ri.ingredient_id
            WHERE r.id = recipe_id;
	END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-28 14:15:04
