import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout | Erthad",
  description: "Finalize your order and securely checkout for your premium Erthad NFC card.",
};

export default function CheckoutPage() {
  return (
    // Enforcing strict dark mode background using our CSS variables
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-white">
      <Header />
      
      <main className="flex-1 flex flex-col items-center pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Visual Background Glow - Deep EternoCloud Void Aesthetic */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_top,_rgba(157,78,221,0.15),transparent_70%)] pointer-events-none -z-10" />
        <div className="absolute top-32 -left-32 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Page Header */}
        <div className="w-full max-w-5xl text-center mb-8 relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-orange sm:text-5xl pb-2">
            Secure Checkout
          </h1>
          <p className="mt-4 text-lg text-gray-400 font-light max-w-2xl mx-auto">
            Enter your shipping coordinates and complete your secure payment to initiate production of your premium NFC card.
          </p>
        </div>

        {/* The Checkout Form */}
        <div className="w-full relative z-10">
          <CheckoutForm />
        </div>
        
      </main>

      <Footer />
    </div>
  );
}