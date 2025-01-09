import { notFound } from "next/navigation";
import prisma from "../lib/sellerdb";
import { LoadingProductCard, ProductCard } from "./sellerProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface iAppProps {
  category: "sindhi" | "punjabi" | "pashtun" | "balochi" | "kashmiri" | "saraiki" | "newest";
}

async function getData({ category }: iAppProps) {
  switch (category) {
    case "sindhi": {
      const data = await prisma.product.findMany({
        where: {
          category: "sindhi",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Sindhi Products",
        link: "/products/sindhi",
      };
    }
    case "punjabi": {
      const data = await prisma.product.findMany({
        where: {
          category: "punjabi",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        data: data,
        title: "Punjabi Products",
        link: "/products/punjabi",
      };
    }
    case "pashtun": {
      const data = await prisma.product.findMany({
        where: {
          category: "pashtun",
        },
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Pashtun Products",
        data: data,
        link: "/products/pashtun",
      };
    }
    case "balochi": {
      const data = await prisma.product.findMany({
        where: {
          category: "balochi",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Balochi Products",
        data: data,
        link: "/products/balochi",
      };
    }
    case "kashmiri": {
      const data = await prisma.product.findMany({
        where: {
          category: "kashmiri",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Kashmiri Products",
        data: data,
        link: "/products/kashmiri",
      };
    }
    case "saraiki": {
      const data = await prisma.product.findMany({
        where: {
          category: "saraiki",
        },
        select: {
          id: true,
          name: true,
          price: true,
          smallDescription: true,
          images: true,
        },
        take: 3,
      });

      return {
        title: "Saraiki Products",
        data: data,
        link: "/products/saraiki",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: {
          price: true,
          name: true,
          smallDescription: true,
          id: true,
          images: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: iAppProps) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingState />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: iAppProps) {
  const data = await getData({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold tracking-tighter ">
          {data.title}
        </h2>
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          All Products <span>&rarr;</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </>
  );
}

function LoadingState() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
