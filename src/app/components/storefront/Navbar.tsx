import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import logo from "@/public/cul.png";
import Image from "next/image";
import { UserNav } from "../sellerUserNav";


export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  let cart: Cart | null = null;
  try {
    cart = user?.id ? await redis.get(`cart-${user.id}`) : null;
  } catch (error) {
    console.error("Error fetching cart from Redis:", error);
  }

  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-7xl max-h-20 mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between bg-blue-100 rounded-full">
      <div className="flex items-center">
      <div className="mb-4">
      <Link href="/">
          <Image
          src={logo}
          alt="logo"
          height={40}
          width={40}
          />
        </Link>
      </div>
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            Cultural<span className="text-primary">Hatti</span>
          </h1>
        </Link>
        <NavbarLinks />
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link href="/bag" className="group p-2 flex items-center mr-2">
              <ShoppingBagIcon className="h-6 w-6 text-primary group-hover:text-[#4781ff]" />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {total}
              </span>
            </Link>

            <UserNav
              email={user.email as string}
              name={user.given_name as string}
              userImage={
                user.picture ?? `https://fypiqra.vercel.app/${user.given_name}` ?? `https://localhost:3000/${user.given_name}`
              }
            />
          </>
        ) : (
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}