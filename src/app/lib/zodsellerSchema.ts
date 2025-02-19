import { z } from "zod";

export const sellerControl = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  profileImage: z.string(),
  stripeConnectedLinked: z.boolean(),
  connectedAccountId: z.string(),
});
