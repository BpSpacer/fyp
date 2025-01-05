import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data,
      };
    }
    case "saraiki": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "saraiki",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Kpk",
        data: data,
      };
    }
    case "sindhi": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "sindhi",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Sindh",
        data: data,
      };
    }
    case "punjabi": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "punjabi",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Punjab",
        data: data,
      };
    }
    case "pashtun": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "pashtun",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Kpk",
        data: data,
      };
    }
    case "balochi": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "balochi",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Balochistan",
        data: data,
      };
    }
    case "kashmiri": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "kashmiri",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products from Kashmir",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}