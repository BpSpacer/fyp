import Canvas from './canvas';
import { CategoriesSelection } from './components/storefront/CategorySelection';
import { FeaturedProducts } from './components/storefront/FeaturedProducts';
import { Footer } from './components/storefront/Footer';
import { Hero } from './components/storefront/Hero';
import { Navbar } from './components/storefront/Navbar';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

export default function Main() {
  return (
    <>
    <div className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
    <Navbar />
  </div>
  <div className="flex justify-end items-center space-x-4 sticky mb-2">
    <div className="relative w-48 h-10">
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-center text-xs">
      </span>
    </div>
  </div>
    <main className="app transition-all ease-in">
    <Home/>
    <Canvas />
    <Customizer />
    </main>
    <section className="pt-20 max-w-15xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
      </section>
      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <CategoriesSelection />
      </section>

      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <FeaturedProducts />
      </section>

      <section className='max-w-15xl mx-auto px-4 sm:px-6 lg:px-8'>
        <Footer />
      </section>
    </>
  );
}
