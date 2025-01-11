import { Card } from "@/components/ui/card";
import { SellForm } from "../components/sellerform/Sellform";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/sellerdb";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

// Fetch user data and check Stripe status
async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    redirect("/billing"); // Immediately redirect if Stripe is not connected
  }

  return data; // Return data if needed later
}

export default async function SellRoute() {
  noStore(); // Disable caching
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized"); // Handle unauthorized access
  }

  // Ensure user data is checked before rendering
  await getData(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
