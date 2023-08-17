import * as z from "zod"
import { Identity } from "@prisma/client"
import { CompleteHost, RelatedHostModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  identity: z.string(),
  identityType: z.nativeEnum(Identity),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Hosts: CompleteHost[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Hosts: RelatedHostModel.array(),
}))
