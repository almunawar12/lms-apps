-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 30, 2025 at 09:07 AM
-- Server version: 8.0.30
-- PHP Version: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_lms`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `instructor_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `instructor_id`, `start_date`, `created_at`, `updated_at`) VALUES
('3bff9200-2b12-41fb-87b0-8b57304da60c', 'Data Analyst', '', '12378a98-1253-4c54-b35e-4607e9624933', '2025-08-30 00:00:00.000', '2025-08-30 05:38:58.847', '2025-08-30 05:38:58.847'),
('f01c8e33-f1cf-4cc6-bcc9-26eb0d17bb7a', 'Pemrograman', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.', '12378a98-1253-4c54-b35e-4607e9624933', '2025-08-31 00:00:00.000', '2025-08-30 06:51:28.321', '2025-08-30 06:53:47.926'),
('fb3fef02-e070-47cd-871a-e130888becb2', 'Dasar Pemrograman', 'Dasar Pemrograman', '12378a98-1253-4c54-b35e-4607e9624933', '2025-08-31 00:00:00.000', '2025-08-30 04:24:15.688', '2025-08-30 04:24:15.688');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `enrollment_date` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `enrollment_date`) VALUES
('354a3a95-2ef8-40fb-a895-7800a911dd74', '228b86ca-d6f1-446c-878f-f3ae778c1cb1', 'f01c8e33-f1cf-4cc6-bcc9-26eb0d17bb7a', '2025-08-30 08:10:42.641'),
('85b07350-01f3-4ab9-8485-631396dd29e9', '4b3a9eb7-c594-4345-b9ac-2102767cd38c', 'f01c8e33-f1cf-4cc6-bcc9-26eb0d17bb7a', '2025-08-30 08:12:52.145'),
('937ebe96-59ef-40c8-a7d8-84514603c703', '4b3a9eb7-c594-4345-b9ac-2102767cd38c', 'fb3fef02-e070-47cd-871a-e130888becb2', '2025-08-30 04:29:03.443'),
('df1cf904-b2ea-4b6f-bbce-88ee7f18d0bb', '7a183498-a1de-4996-93a0-65f1ae07fbcf', 'f01c8e33-f1cf-4cc6-bcc9-26eb0d17bb7a', '2025-08-30 08:11:04.116');

-- --------------------------------------------------------

--
-- Table structure for table `modules`
--

CREATE TABLE `modules` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `course_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `modules`
--

INSERT INTO `modules` (`id`, `title`, `course_id`, `created_at`, `updated_at`, `code`, `content`) VALUES
('86710b05-29b3-4492-a598-71fb93d413eb', 'Nested', '3bff9200-2b12-41fb-87b0-8b57304da60c', '2025-08-30 06:22:47.225', '2025-08-30 06:22:52.190', NULL, NULL),
('ec5932c6-aac7-4daf-ac41-a8dc8d17a346', 'Pemrograman Frontend Modern dengan React dan Angular', 'fb3fef02-e070-47cd-871a-e130888becb2', '2025-08-30 06:59:18.348', '2025-08-30 07:42:51.424', 'L1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '),
('f93512bd-5439-42be-a53e-61b9f6f9ff50', 'Array', 'fb3fef02-e070-47cd-871a-e130888becb2', '2025-08-30 04:26:18.897', '2025-08-30 04:26:18.897', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` decimal(65,30) NOT NULL,
  `enrollment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `module_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `score`, `enrollment_id`, `module_id`, `created_at`) VALUES
('204c9628-e7aa-42c8-8383-336189806496', '1250.000000000000000000000000000000', '85b07350-01f3-4ab9-8485-631396dd29e9', 'ec5932c6-aac7-4daf-ac41-a8dc8d17a346', '2025-08-30 08:13:27.242'),
('20fb13c3-2b13-49c0-84e6-abdf82eb1ecb', '1230.000000000000000000000000000000', 'df1cf904-b2ea-4b6f-bbce-88ee7f18d0bb', 'ec5932c6-aac7-4daf-ac41-a8dc8d17a346', '2025-08-30 08:11:40.989'),
('815ea977-786d-43d2-988c-27356136e8b9', '1220.000000000000000000000000000000', '354a3a95-2ef8-40fb-a895-7800a911dd74', 'ec5932c6-aac7-4daf-ac41-a8dc8d17a346', '2025-08-30 08:12:19.796');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','student','instructor') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'student',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `updated_at`) VALUES
('12378a98-1253-4c54-b35e-4607e9624933', 'yosep', 'yosep@lms.com', '$2b$10$KJ3iGENI9gUbb9c5dSnUy.cjOwc7rCUgdhMIYG2toVqbmLTGbHlsK', 'instructor', '2025-08-30 04:22:26.345', '2025-08-30 06:50:57.122'),
('228b86ca-d6f1-446c-878f-f3ae778c1cb1', 'Adit', 'adit@lms.com', '$2b$10$zQ5pdF51SWDlLgTfX.8o9ed0wj7FpE8CzMh4OaGgswDCV49vGtOOS', 'student', '2025-08-30 08:10:26.749', '2025-08-30 08:10:26.749'),
('4b3a9eb7-c594-4345-b9ac-2102767cd38c', 'Rifki', 'rifki@lms.com', '$2b$10$H6VfP9/wKEvQs7wRSwa7oOViyQsel0Unay.a2OTXqJCdHQ8t2zLQq', 'student', '2025-08-30 03:33:50.302', '2025-08-30 03:33:50.302'),
('7a183498-a1de-4996-93a0-65f1ae07fbcf', 'Dani', 'dani@lms.com', '$2b$10$j.zpJptWT3WQ.zBdvOgrtulNGumqmN3w9AZI3nsULGkPhyNJehSP6', 'student', '2025-08-30 08:10:17.887', '2025-08-30 08:10:17.887');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2a1a9de2-2a17-45f0-8843-0434a47eb845', '6d8732df922268a13efecc4d080fe285e5eefe72193718cc0dc1bec5079d6d9f', '2025-08-30 03:30:32.040', '20250829172854_update', NULL, NULL, '2025-08-30 03:30:31.368', 1),
('3a3e2baf-b133-456d-af52-18712c4a9320', '659eeddb3935d631467380c9e22c256953599a6727db3f3e1ee28afcb5c8cc2a', '2025-08-30 03:30:31.365', '20250829153614_init', NULL, NULL, '2025-08-30 03:30:30.915', 1),
('73070de4-fcae-4cdc-b734-dd8c5a5749b0', 'c305a463ba1d8c183f682f56181c2775aadc5ad4a9c2996b8c0a3bd2c64049bd', '2025-08-30 06:57:01.753', '20250830065701_update_table_module', NULL, NULL, '2025-08-30 06:57:01.689', 1),
('97e02858-1e2a-497d-ad78-6e3bd3eeffd4', 'fca80cd5a2c1fc6e32147bf6e9feec9d1a576ab70c4e6f1f199ef7a9371c5c05', '2025-08-30 07:33:50.453', '20250830073350_update', NULL, NULL, '2025-08-30 07:33:50.347', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_instructor_id_fkey` (`instructor_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `enrollments_user_id_course_id_key` (`user_id`,`course_id`),
  ADD KEY `enrollments_course_id_fkey` (`course_id`);

--
-- Indexes for table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modules_course_id_fkey` (`course_id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scores_enrollment_id_fkey` (`enrollment_id`),
  ADD KEY `scores_module_id_fkey` (`module_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `enrollments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_enrollment_id_fkey` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `scores_module_id_fkey` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
