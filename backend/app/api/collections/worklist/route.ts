import { success } from "@/lib/response";

import { collectionService }
from "@/services/collection.service";

import { withError }
from "@/middlewares/error.middleware";

import { requireAuth }
from "@/middlewares/auth.middleware";

export const GET =
  withError(
    requireAuth(
      async () => {

        const result =
          await collectionService
            .worklist();

        return success(result);
      }
    )
  );