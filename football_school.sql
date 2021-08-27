-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 26, 2021 at 08:00 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `football_school`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `birth` date NOT NULL,
  `height` int(3) NOT NULL COMMENT '(cm)',
  `weight` float NOT NULL COMMENT '(kg)',
  `parent_income` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `address`, `birth`, `height`, `weight`, `parent_income`, `created_at`, `updated_at`) VALUES
(2, 'Dimasv', 'Maulana', 'Jl. Puskesmas I Gg. Mawar Medan Sunggal', '1996-11-20', 155, 60, 3500000, '2021-08-24 23:12:28', '2021-08-27 00:48:39'),
(4, 'Hanif', 'Maulanaz', 'Jl. Puskesmas I Gg. Mawar Medan Sunggal', '1996-11-02', 160, 61, 4800000, '2021-08-25 08:32:30', '2021-08-26 15:31:00'),
(6, 'Elaine', 'Slaters', 'Nulla dignissimos in', '2010-05-01', 167, 78, 260, '2021-08-25 21:14:50', '2021-08-27 00:52:24'),
(7, 'Myles', 'Francis', 'Officia enim nostrum', '2007-10-09', 73, 74, 794, '2021-08-25 21:28:19', '2021-08-25 22:15:01'),
(15, 'Destiny', 'Wiggins', 'Repellendus Omnis d', '1996-11-20', 177, 78, 0, '2021-08-27 00:50:17', '2021-08-27 00:50:17'),
(16, 'Brittany', 'Wagner', 'Recusandae Consequu', '1996-11-20', 166, 83, 0, '2021-08-27 00:51:12', '2021-08-27 00:51:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
