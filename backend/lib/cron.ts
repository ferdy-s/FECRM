import cron from "node-cron";

import { automationService } from "@/services/automation.service";

cron.schedule("0 0 * * *", async () => {
  console.log("RUNNING FOLLOW UP CHECK");

  await automationService.followUpReminder();

  await automationService.inactiveLeadEscalation();
});