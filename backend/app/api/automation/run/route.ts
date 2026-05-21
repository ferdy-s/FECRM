import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { automationService } from "@/services/automation.service";

export const POST = withError(async () => {
  const followup =
    await automationService.followUpReminder();

  const inactive =
    await automationService.inactiveLeadEscalation();

  return success({
    followup,
    inactive,
  });
});