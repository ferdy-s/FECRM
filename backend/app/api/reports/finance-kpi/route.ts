import { success }
from "@/lib/response";

import {
  collectionService,
} from "@/services/collection.service";

import {
  requireAuth,
} from "@/middlewares/auth.middleware";

import {
  withError,
} from "@/middlewares/error.middleware";

export const GET =
  withError(
    requireAuth(
      async () => {

        const result =
          await collectionService
            .financeKpi();

        return success(
          result
        );
      }
    )
  );