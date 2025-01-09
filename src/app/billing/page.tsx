import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
  import prisma from "../lib/sellerdb";
  import { CreateStripeAccoutnLink, GetStripeDashboardLink } from '../selleractions'
  import { Submitbutton } from '../components/sellerSubmitButtons'
  import { unstable_noStore as noStore } from "next/cache";
  
  async function getData(userId: string) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        stripeConnectedLinked: true,
      },
    });
  
    return data;
  }
  
  export default async function BillingRoute() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      throw new Error("Unauthorized");
    }
  
    const data = await getData(user.id);
    return (
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Find all your details regarding your payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data?.stripeConnectedLinked === false && (
              <form action={CreateStripeAccoutnLink}>
                <Submitbutton title="Link your Accout to stripe" />
              </form>
            )}
  
            {data?.stripeConnectedLinked === true && (
              <form action={GetStripeDashboardLink}>
                <Submitbutton title="View Dashboard" />
              </form>
            )}
          </CardContent>
        </Card>
      </section>
    );
  }
  