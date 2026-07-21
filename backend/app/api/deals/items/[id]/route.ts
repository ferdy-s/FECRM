import { success } from "@/lib/response";

import { requireAuth }
from "@/middlewares/auth.middleware";

import { withError }
from "@/middlewares/error.middleware";

import { dealItemService }
from "@/services/deal-item.service";

export const PATCH =
withError(

requireAuth(

async (

req: Request,

context: any,

) => {

const { id } =
await context.params;

const body =
await req.json();

const user =
(req as any).user;

const result =
await dealItemService.updateQuantity(

id,

body.quantity,

user,

);

return success(result);

},

),

);

export const DELETE =
withError(

requireAuth(

async (

req: Request,

context: any,

) => {

const { id } =
await context.params;

const user =
(req as any).user;

const result =
await dealItemService.remove(

id,

user,

);

return success(result);

},

),

);