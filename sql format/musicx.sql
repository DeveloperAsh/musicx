-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2022 at 08:14 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musicx`
--

-- --------------------------------------------------------

--
-- Table structure for table `music_master`
--

CREATE TABLE `music_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `artist` varchar(50) NOT NULL,
  `genre` varchar(50) NOT NULL,
  `music_path` varchar(500) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT 0,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `url_master`
--

CREATE TABLE `url_master` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `url` varchar(100) NOT NULL,
  `is_parent` int(1) NOT NULL DEFAULT 0,
  `parent_id` int(1) NOT NULL DEFAULT 0,
  `sequence` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `url_master`
--

INSERT INTO `url_master` (`id`, `name`, `url`, `is_parent`, `parent_id`, `sequence`) VALUES
(1, 'Music', '', 1, 0, 0),
(2, 'Show List', '/music-list', 0, 1, 0),
(3, 'Add New', '/add-new', 0, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music_master`
--
ALTER TABLE `music_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `url_master`
--
ALTER TABLE `url_master`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music_master`
--
ALTER TABLE `music_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `url_master`
--
ALTER TABLE `url_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
