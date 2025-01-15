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
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg border flex flex-col items-center">
    <Carousel className="w-full">
      <CarouselContent>
        {item.images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[330px]">
              <Image
                src={image}
                alt="Product Image"
                fill
                className="object-cover object-center w-full h-full rounded-t-lg border-b bg-primary/10"
              />
              <div className="px-2 py-2">
                <h3 className="pt-2 inline-flex items-center rounded-md bg-white px-2 py-2 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10 relative z-10">
                  Product from Hatti
                </h3>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  
    <div className="flex justify-between items-center w-full px-5 mt-4">
      <h1 className="font-semibold text-xl line-clamp-1">{item.name}</h1>
      <h3 className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
        ${item.price}
      </h3>
    </div>
    
    <p className="text-gray-600 text-sm mt-3 line-clamp-2 text-center px-5">
      {item.description}
    </p>
  
    <Button asChild className="mt-5 w-11/12 mb-4">
      <Link href={`/storefront/product/${item.id}`}>Buy Now!</Link>
    </Button>
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