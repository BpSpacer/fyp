import prisma from "@/app/lib/sellerdb";
import { stripe } from "@/app/lib/stripe";

import { headers } from "next/headers";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      case "account.updated": {
        const account = event.data.object;

        // Update the database using Prisma
        await prisma.user.update({
          where: {
            connectedAccountId: account.id,
          },
          data: {
            stripeConnectedLinked:
              account.capabilities?.transfers === "pending" ||
              account.capabilities?.transfers === "inactive"
                ? false
                : true,
          },
        });
        break;
      }
      default: {
        console.log("Unhandled event type:", event.type);
      }
    }
  } catch (err) {
    console.error("Webhook error:", err); // Use `err` to avoid unused variable
    return new Response("Webhook error", { status: 400 });
  }

  return new Response(null, { status: 200 });
}
