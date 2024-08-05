-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema book_pitch_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema book_pitch_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `book_pitch_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `book_pitch_db` ;

-- -----------------------------------------------------
-- Table `book_pitch_db`.`pitch_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`pitch_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`pitch`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`pitch` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `create_at` TIMESTAMP NULL DEFAULT NULL,
  `update_at` TIMESTAMP NULL DEFAULT NULL,
  `pitch_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pitch_pitch_type_idx` (`pitch_type_id` ASC) VISIBLE,
  CONSTRAINT `fk_pitch_pitch_type`
    FOREIGN KEY (`pitch_type_id`)
    REFERENCES `book_pitch_db`.`pitch_type` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`time_slot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`time_slot` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_time` TIMESTAMP NULL DEFAULT NULL,
  `end_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`pitch_time`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`pitch_time` (
  `price` DOUBLE NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `pitch_id` INT NOT NULL,
  `time_slot_id` INT NOT NULL,
  PRIMARY KEY (`pitch_id`, `time_slot_id`),
  INDEX `fk_pitch_time_time_slot1_idx` (`time_slot_id` ASC) VISIBLE,
  CONSTRAINT `fk_pitch_time_pitch1`
    FOREIGN KEY (`pitch_id`)
    REFERENCES `book_pitch_db`.`pitch` (`id`),
  CONSTRAINT `fk_pitch_time_time_slot1`
    FOREIGN KEY (`time_slot_id`)
    REFERENCES `book_pitch_db`.`time_slot` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `fullname` VARCHAR(45) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT NULL,
  `create_at` TIMESTAMP NULL DEFAULT NULL,
  `update_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`pitch_booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`pitch_booking` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_at` TIMESTAMP NULL DEFAULT NULL,
  `update_at` TIMESTAMP NULL DEFAULT NULL,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `note` VARCHAR(45) NULL DEFAULT NULL,
  `pitch_time_pitch_id` INT NOT NULL,
  `pitch_time_time_slot_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pitch_booking_pitch_time1_idx` (`pitch_time_pitch_id` ASC, `pitch_time_time_slot_id` ASC) VISIBLE,
  INDEX `fk_pitch_booking_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_pitch_booking_pitch_time1`
    FOREIGN KEY (`pitch_time_pitch_id` , `pitch_time_time_slot_id`)
    REFERENCES `book_pitch_db`.`pitch_time` (`pitch_id` , `time_slot_id`),
  CONSTRAINT `fk_pitch_booking_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `book_pitch_db`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`bill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`bill` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_at` TIMESTAMP NULL DEFAULT NULL,
  `note` VARCHAR(255) NULL DEFAULT NULL,
  `pitch_booking_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_bill_pitch_booking1` (`pitch_booking_id` ASC) VISIBLE,
  CONSTRAINT `fk_bill_pitch_booking1`
    FOREIGN KEY (`pitch_booking_id`)
    REFERENCES `book_pitch_db`.`pitch_booking` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `star` INT NULL DEFAULT NULL,
  `content` VARCHAR(255) NULL DEFAULT NULL,
  `create_at` TIMESTAMP NULL DEFAULT NULL,
  `update_at` TIMESTAMP NULL DEFAULT NULL,
  `user_id` INT NOT NULL,
  `pitch_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_comment_user1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_pitch1_idx` (`pitch_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_pitch1`
    FOREIGN KEY (`pitch_id`)
    REFERENCES `book_pitch_db`.`pitch` (`id`),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `book_pitch_db`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `book_pitch_db`.`image`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `book_pitch_db`.`image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `pitch_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_pitch1_idx` (`pitch_id` ASC) VISIBLE,
  CONSTRAINT `fk_image_pitch1`
    FOREIGN KEY (`pitch_id`)
    REFERENCES `book_pitch_db`.`pitch` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
