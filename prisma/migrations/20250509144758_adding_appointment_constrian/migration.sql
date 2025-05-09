/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,serviceId,startTime]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_doctorId_serviceId_startTime_key" ON "Appointment"("doctorId", "serviceId", "startTime");
