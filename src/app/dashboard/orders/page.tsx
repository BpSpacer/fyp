import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store!</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {item.User?.profileImage && (
                      <img
                        src={item.User.profileImage}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.User?.firstName}</p>
                      <p className="hidden md:flex text-sm text-muted-foreground">
                        {item.User?.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>Order</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US").format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat("en-US").format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}