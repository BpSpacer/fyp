import prisma from "@/app/lib/sellerdb";
import { stripe } from "@/app/lib/stripe";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Something went wrong...");
  }

  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    const account = await stripe.accounts.create({
      email: user.email as string,
      controller: {
        losses: {
          payments: "application",
        },
        fees: {
          payer: "application",
        },
        stripe_dashboard: {
          type: "express",
        },
      },
    });

    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        connectedAccountId: account.id,
      },
    });
  }

  // Automatically redirect to `/api/auth/creation`
  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/auth/creation"
      : "https://fypiqra.vercel.app/api/auth/creation"
  );
}
  