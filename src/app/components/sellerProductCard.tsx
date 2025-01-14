import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  images: string[];
  name: string;
  price: number;
  smallDescription: string;
  id: string;
}

export function ProductCard({
  images,
  id,
  price,
  smallDescription,
  name,
}: iAppProps) {
  return (
    <div className="rounded-lg border">
      <Carousel className="w-full mx-auto ">
        <CarouselContent>
          {images.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[330px] ">
                <Image
                  src={item}
                  alt="Product Image"
                  fill
                  className="object-cover object-center w-full h-full rounded-t-lg border-b bg-primary/10"
                />
                <div className="px-2 py-2">
                <h3
                  className="pt-2  inline-flex items-center rounded-md bg-white px-2 py-2 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 relative z-10">
                  Product from Seller's
                </h3>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex justify-between items-center mt-2 w-96 px-5">
        <h1 className="font-semibold text-xl line-clamp-1">{name}</h1>
        <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
          ${price}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2 w-96 px-5">
        {smallDescription}
      </p>
      <div className="px-5 w-96">
      <Button asChild className="mt-5 w-full mb-5">
        <Link href={`/storefront/product/${id}`}>Buy Now!</Link>
      </Button>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-[330px]" />
      <div className="flex flex-col mt-2 gap-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="w-full h-6" />
      </div>

      <Skeleton className="w-full h-10 mt-5" />
    </div>
  );
}
