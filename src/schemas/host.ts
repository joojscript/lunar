import * as z from 'zod';
import { CompleteUser, RelatedUserModel } from './index';

export const HostModel = z.object({
  id: z.string(),
  label: z.string(),
  hostname: z.string(),
  ownerId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteHost extends z.infer<typeof HostModel> {
  owner: CompleteUser;
}

/**
 * RelatedHostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHostModel: z.ZodSchema<CompleteHost> = z.lazy(() =>
  HostModel.extend({
    owner: RelatedUserModel,
  }),
);
