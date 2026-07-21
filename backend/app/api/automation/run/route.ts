import { success } from "@/lib/response";

import { withError } from "@/middlewares/error.middleware";

import { automationService } from "@/services/automation.service";

export const POST = withError(async () => {

  const result =
    await automationService.runAll();

  return success(result);

});