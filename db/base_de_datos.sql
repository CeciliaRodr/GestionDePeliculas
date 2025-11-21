-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: tp_seminario_cine
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor` (
  `id_actor` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nacionalidad` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_actor`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (2,'John','Travolta','Estadounidense'),(3,'Keanu ','Reeves','Estadounidense'),(4,'Woody','Allen','Estadounidense'),(5,'Clint ','Eastwood','Estadounidense'),(6,'Meryl ','Streep','Suiza'),(7,'Arnold ','hahhahhsah','Austriaco'),(9,'Bruce ','Lee','Chino');
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `actor_premio`
--

DROP TABLE IF EXISTS `actor_premio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `actor_premio` (
  `id_actor` int(11) NOT NULL,
  `id_premio` int(11) NOT NULL,
  `anio_ganado` year(4) NOT NULL,
  PRIMARY KEY (`id_actor`,`id_premio`,`anio_ganado`),
  KEY `id_premio` (`id_premio`),
  CONSTRAINT `actor_premio_ibfk_1` FOREIGN KEY (`id_actor`) REFERENCES `actor` (`id_actor`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `actor_premio_ibfk_2` FOREIGN KEY (`id_premio`) REFERENCES `premio` (`id_premio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor_premio`
--

LOCK TABLES `actor_premio` WRITE;
/*!40000 ALTER TABLE `actor_premio` DISABLE KEYS */;
/*!40000 ALTER TABLE `actor_premio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelicula`
--

DROP TABLE IF EXISTS `pelicula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelicula` (
  `id_pelicula` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `anio_estreno` year(4) DEFAULT NULL,
  PRIMARY KEY (`id_pelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula`
--

LOCK TABLES `pelicula` WRITE;
/*!40000 ALTER TABLE `pelicula` DISABLE KEYS */;
INSERT INTO `pelicula` VALUES (2,'Pulp Fiction','Crimen',1994),(3,'Matrix','Ciencia Ficcion',1999),(4,'Los secretos de Harry','Comedia',1997),(7,'Operacion Dragon','Accion',1973),(8,'Zoolander','Comedia',2001),(9,'Titanic ','Drama',1997),(10,'Peloton','Belica',1986),(12,'La pistola desnuda','Comedia',2000),(14,'It','Terror',2017),(18,'La mano que mese la cuna','Suspenso',2005),(21,'Shrek','Animacion',2001),(22,'Terminator','Accion',1995),(25,'Shrek','Animacion',2001),(26,'La vida es bella','Drama',1999),(27,'mujercitas','infantil',2001);
/*!40000 ALTER TABLE `pelicula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelicula_actor`
--

DROP TABLE IF EXISTS `pelicula_actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelicula_actor` (
  `id_pelicula` int(11) NOT NULL,
  `id_actor` int(11) NOT NULL,
  `rol` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_pelicula`,`id_actor`),
  KEY `id_actor` (`id_actor`),
  CONSTRAINT `pelicula_actor_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelicula_actor_ibfk_2` FOREIGN KEY (`id_actor`) REFERENCES `actor` (`id_actor`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula_actor`
--

LOCK TABLES `pelicula_actor` WRITE;
/*!40000 ALTER TABLE `pelicula_actor` DISABLE KEYS */;
INSERT INTO `pelicula_actor` VALUES (2,2,'Protagonista'),(2,3,'secuandario'),(2,7,'Protagonista'),(2,9,'secuandario'),(3,2,'Protagonista'),(3,3,'Protagonista'),(4,4,'Protagonista'),(9,6,'Protagonista'),(27,6,'Protagonista');
/*!40000 ALTER TABLE `pelicula_actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pelicula_premio`
--

DROP TABLE IF EXISTS `pelicula_premio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pelicula_premio` (
  `id_pelicula` int(11) NOT NULL,
  `id_premio` int(11) NOT NULL,
  `anio_ganado` year(4) NOT NULL,
  PRIMARY KEY (`id_pelicula`,`id_premio`,`anio_ganado`),
  KEY `id_premio` (`id_premio`),
  CONSTRAINT `pelicula_premio_ibfk_1` FOREIGN KEY (`id_pelicula`) REFERENCES `pelicula` (`id_pelicula`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pelicula_premio_ibfk_2` FOREIGN KEY (`id_premio`) REFERENCES `premio` (`id_premio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pelicula_premio`
--

LOCK TABLES `pelicula_premio` WRITE;
/*!40000 ALTER TABLE `pelicula_premio` DISABLE KEYS */;
INSERT INTO `pelicula_premio` VALUES (2,2,1994),(2,2,1996),(2,3,0000),(2,4,1955),(2,5,1995),(3,3,1999),(4,4,1997),(8,2,2002),(10,3,1987),(12,2,2001);
/*!40000 ALTER TABLE `pelicula_premio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `premio`
--

DROP TABLE IF EXISTS `premio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `premio` (
  `id_premio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `organizacion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_premio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `premio`
--

LOCK TABLES `premio` WRITE;
/*!40000 ALTER TABLE `premio` DISABLE KEYS */;
INSERT INTO `premio` VALUES (2,'Oscar a Mejor Guion','La Academia de Hollywood'),(3,'Globo de Oro Mejor Actor','HFPA'),(4,'Bafta a Mejor Película','Academia Britanica'),(5,'Palma de Oro Mejor Actriz','Festival de Cine de Cannes'),(6,'Leon de Plata Mejor Direccion','Festival de Cine de Venecia');
/*!40000 ALTER TABLE `premio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tp_seminario_cine'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21 17:58:13
