import prisma from "@/app/lib/sellerdb";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
    const data = await prisma.user.findMany({
        orderBy: {
            id: "desc",
        },
    });

    return data;
}

export default async function ManageSeller() {
    noStore();
    const data = await getData();
    return (
        <>
            <div className="flex items-center justify-end">
                <Button asChild className="flex gap-x-2">
                    <Link href="/dashboard/sellercontrol/create">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Add Seller</span>
                    </Link>
                </Button>
            </div>

            <Card className="mt-5">
                <CardHeader>
                    <CardTitle>Sellers</CardTitle>
                    <CardDescription>Manage Sellers</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>FirstName</TableHead>
                                <TableHead>LastName</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Stripe Account</TableHead>
                                <TableHead className="text-end">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image
                                            alt="Seller Image"
                                            src={item.profileImage || '/sellers.jpeg'}
                                            width={64}
                                            height={64}
                                            className="rounded-lg object-cover h-16 w-16"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.firstName}</TableCell>
                                    <TableCell className="font-medium">{item.lastName}</TableCell>
                                    <TableCell className="font-medium">{item.email}</TableCell>
                                    <TableCell className="font-medium">
                                        {item.stripeConnectedLinked ? (
                                            <CheckCircle className="text-green-500" size={20} />
                                        ) : (
                                            <XCircle className="text-red-500" size={20} />
                                        )}
                                    </TableCell>
                                    <TableCell className="text-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/sellercontrol/${item.id}/edit`}>
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/dashboard/sellercontrol/${item.id}/delete`}>
                                                        Delete
                                                    </Link>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}