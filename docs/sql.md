```sql
-- Web3 Compass 数据库结构设计 (v4)
-- 变更: 1. users表适配第三方登录。 2. projects表移除dapp_url和whitepaper_url。

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(50) NOT NULL,
  `password_hash` VARCHAR(255) NULL COMMENT '本地注册时使用，第三方登录时为NULL',
  `auth_provider` VARCHAR(20) NOT NULL DEFAULT 'local' COMMENT '认证方式 (local, google, etc.)',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` INT UNSIGNED NULL DEFAULT NULL COMMENT '父分类ID，用于实现层级关系',
  `name` VARCHAR(100) NOT NULL COMMENT '分类名称',
  `slug` VARCHAR(100) NOT NULL COMMENT '用于URL的唯一标识',
  `description` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_parent_id` (`parent_id` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `tagline` VARCHAR(255) NULL COMMENT '一句话简介',
  `description` TEXT NULL COMMENT '项目概述',
  `logo_url` VARCHAR(255) NULL,
  `website_url` VARCHAR(255) NULL,
  `status` ENUM('published', 'pending', 'rejected') NOT NULL DEFAULT 'pending',
  `category_id` INT UNSIGNED NULL,
  `submitter_id` INT UNSIGNED NULL,
  `chains` JSON NULL COMMENT '存储公链信息, 例如: ["Ethereum", "Solana"]',
  `tags` JSON NULL COMMENT '存储标签信息, 例如: ["Staking", "Layer2"]',
  `social_links` JSON NULL COMMENT '存储社交链接, 例如: { "twitter": "...", "discord": "..." }',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_category_id` (`category_id` ASC),
  INDEX `idx_submitter_id` (`submitter_id` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `user_favorites`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_favorites` (
  `user_id` INT UNSIGNED NOT NULL,
  `project_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `project_id`)
) ENGINE = InnoDB;

```