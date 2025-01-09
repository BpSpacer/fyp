import { Card } from "@/components/ui/card";

import { SellForm } from "../components/sellerform/Sellform";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import prisma from "../lib/sellerdb";
// import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

// async function getData(userId: string) {
//   const data = await prisma.user.findUnique({
//     where: {
//       id: userId,
//     },
//     select: {
//       stripeConnectedLinked: true,
//     },
//   });

//   if (data?.stripeConnectedLinked === false) {
//     return redirect("/billing");
//   }

//   return null;
// }

export default async function SellRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
