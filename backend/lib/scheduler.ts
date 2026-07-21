import cron from "node-cron";

import { automationService } from "@/services/automation.service";

let started = false;

export function startScheduler() {

  if (started) {

    console.log(
      "[Scheduler] Already running."
    );

    return;

  }

  started = true;

  const expression =
    process.env.AUTOMATION_CRON ??
    "*/1 * * * *";

  console.log("");

  console.log(
    "======================================"
  );

  console.log(
    "[Scheduler] Started"
  );

  console.log(
    "[Scheduler] Cron:",
    expression
  );

  console.log(
    "======================================"
  );

  console.log("");

  cron.schedule(
    expression,
    async () => {

      console.log("");

      console.log(
        "[Scheduler] Tick",
        new Date().toLocaleString()
      );

      await automationService.schedulerJob();

    }
  );

}