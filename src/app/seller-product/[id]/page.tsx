import { BuyProduct } from "@/app/selleractions";
import { ProductDescription } from "@/app/components/sellerProductDescription";
import prisma from "@/app/lib/sellerdb";
import { unstable_noStore as noStore } from "next/cache";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { JSONContent } from "@tiptap/react";
import Image from "next/image";
import { ShoppingBagButton } from "@/app/components/sellerSubmitButtons";
import { Navbar } from "@/app/components/storefront/Navbar";
import { Footer } from "@/app/components/storefront/Footer";

async function getData(id: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      category: true,
      description: true,
      smallDescription: true,
      name: true,
      images: true,
      price: true,
      createdAt: true,
      id: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
          lastName: true
        },
      },
    },
  });
  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const data = await getData(params.id);

  return (
    <><Navbar /><section className="mx-auto px-4 lg:mt-10 max-w-7xl lg:px-8 lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
      <Carousel className="lg:row-end-1 lg:col-span-4">
        <CarouselContent>
          {data?.images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <Image
                  src={item as string}
                  alt="Seller Product"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="max-w-2xl mx-auto mt-5 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          {data?.name}
        </h1>
        <p className="mt-2 text-muted-foreground">{data?.smallDescription}</p>
        <form action={BuyProduct}>
          <input type="hidden" name="id" value={data?.id} />
          {/* <BuyButton price={data?.price as number} /> */}
          <ShoppingBagButton />
        </form>

        <div className="border-t border-gray-200 mt-10 pt-10">
          <div className="grid grid-cols-2 w-full gap-y-3">
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Released:
            </h3>
            <h3 className="text-sm font-medium col-span-1">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
              }).format(data?.createdAt)}
            </h3>

            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Category:
            </h3>
            <h3 className="text-sm font-medium col-span-1">{data?.category}</h3>
            <h3 className="text-sm font-medium text-muted-foreground col-span-1">
              Seller:
            </h3>
            <h3 className="text-sm font-medium col-span-1">{data?.User?.firstName}{data?.User?.lastName}</h3>
          </div>
        </div>


        <div className="border-t border-gray-200 mt-10">
          <div className="col-span-1 flex items-center gap-3 mt-5">
            <Image
              src={data?.User?.profileImage || "/default-avatar.png"}
              alt={`${data?.User?.firstName}'s Profile`}
              width={40}
              height={40}
              className="rounded-full" />
            <span className="text-sm font-medium">
              {data?.User?.firstName}{data?.User?.lastName}
            </span>
          </div>
          <h3 className="text-sm font-medium text-muted-foreground col-span-2 mt-4 ">
            ✅ This store is Verified! Shop with confidence knowing you're partnering with a trusted seller 🤝, dedicated to delivering exceptional products 📦 and outstanding customer service 🌟.
          </h3>
        </div>

      </div>

      <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl pt-2">Description</h1>
        <div className="mb-4">
          <ProductDescription content={data?.description as JSONContent} />
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}
