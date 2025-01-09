import { ProductCard } from "@/app/components/sellerProductCard";
import prisma from "@/app/lib/sellerdb";
import { type CategoryTypes } from "../../../../prisma/generated/supabase-client";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(category: string) {
  let input;

  switch (category) {
    case "saraiki": {
      input = "saraiki";
      break;
    }
    case "sindhi": {
      input = "sindhi";
      break;
    }
    case "punjabi": {
      input = "punjabi";
      break;
    }
    case "pashtun": {
      input = "pashtun";
      break;
    }
    case "balochi": {
      input = "balochi";
      break;
    }
    case "kashmiri": {
      input = "kashmiri";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryTypes,
    },
    select: {
      id: true,
      images: true,
      smallDescription: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  noStore();
  const data = await getData(params.category);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            price={product.price}
            name={product.name}
            id={product.id}
            smallDescription={product.smallDescription}
          />
        ))}
      </div>
    </section>
  );
}
