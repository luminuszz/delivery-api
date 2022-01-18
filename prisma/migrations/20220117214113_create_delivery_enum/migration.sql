-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('pending', 'delivered', 'notDelivered');

-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "status" "DeliveryStatus" NOT NULL DEFAULT E'pending';
