import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CardVisualizer from "@/components/checkout/CardVisualizer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Your Card",
  description: "Customize and preview your premium Erthad NFC business card before ordering.",
};

export default function CheckoutPage() {
  return (
    // Enforcing strict dark mode background for the new glowing theme
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Header />
      
      {/* FIX: added 'pt-32' (padding-top) to ensure the content starts 
        below your fixed floating navbar.
      */}
      <main className="flex-1 flex flex-col items-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Visual Background Glow - Deep Blue/Slate */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Page Header */}
        <div className="w-full max-w-7xl text-center mb-12 relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 sm:text-5xl">
            Configure Your Card
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Preview your details in real-time. Precision-crafted NFC hardware, designed by you.
          </p>
        </div>

        {/* The 3D Configurator */}
        <div className="w-full max-w-7xl relative z-10">
          <CardVisualizer />
        </div>
        
      </main>

      <Footer />
    </div>
  );
}