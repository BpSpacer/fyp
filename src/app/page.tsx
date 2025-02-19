import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import { Hero } from './components/storefront/Hero';
import { CategoriesSelection } from './components/storefront/CategorySelection';
import { FeaturedProducts } from './components/storefront/FeaturedProducts';
import { Navbar } from './components/storefront/Navbar';
import { Footer } from './components/storefront/Footer';
import Geolocation from './components/geolocation';
import { ProductRow } from './components/sellerProductRow';
import arrow from "@/public/arrow.png";
import Image from "next/image";
import Link from 'next/link';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from "next/cache";


export default async function Main() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <div className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2'>
        <Navbar />
      </div>

      {user && (
        <div className="flex justify-end items-center space-x-4 sticky mb-2">
          <div className="relative w-48 h-10">
            <Image src={arrow} alt="Image" className="w-full h-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-center text-xs">
              <Link href="/billing">Sell on Hatti</Link>
            </span>
          </div>
        </div>
      )}

      <section className="pt-2 max-w-16xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <Hero />
      </section>

      <main className=" app transition-all ease-in ">
        <Home />
        <Canvas />
        <Customizer />
      </main>



      <section className="max-w-3xl mx-auto text-center pt-20">
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-semibold">Find the best Culture of</h1>
        <div className="inline-block">
          <Geolocation />
        </div>


        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">
          CulturalHatti stands out as the premier marketplace for all things related to Culture,
          offering an unparalleled platform for both sellers and buyers alike.
        </p>
      </section>

      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <CategoriesSelection />
      </section>

      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <FeaturedProducts />
      </section>

      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <ProductRow category="newest" />
        <ProductRow category="sindhi" />
        <ProductRow category="punjabi" />
        <ProductRow category="pashtun" />
        <ProductRow category="balochi" />
        <ProductRow category="kashmiri" />
        <ProductRow category="saraiki" />
      </section>

      <Footer />
    </>
  );
}
