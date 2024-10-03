-- CreateTable
CREATE TABLE `PRODUCT` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(50) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `cost_price` DECIMAL(10, 2) NULL,
    `reorder_level` INTEGER NULL,
    `discontinued` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `PRODUCT_sku_key`(`sku`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
