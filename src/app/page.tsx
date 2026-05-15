import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Footer from "@/components/layout/Footer";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    // 'w-full' ensures the background colors/gradients stretch 100%
    <div className="min-h-screen flex flex-col bg-black text-white w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <HowItWorks/>
      </main>
      <Footer />
    </div>
  );
}