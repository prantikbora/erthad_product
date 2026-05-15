"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export default function CheckoutForm() {
  const [details, setDetails] = useState<ShippingDetails>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [checkoutState, setCheckoutState] = useState<"idle" | "processing" | "success">("idle");

  // Dynamically load the Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    // Basic validation
    if (!details.fullName || !details.email || !details.phone || !details.address || !details.city || !details.zipCode) {
      alert("Please fill in all required shipping details.");
      return;
    }

    setCheckoutState("processing");

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Payment gateway failed to load. Please check your connection.");
      setCheckoutState("idle");
      return;
    }

    /* ===================================================================
      TODO: BACKEND INTEGRATION
      Make a POST request to your Next.js API (e.g., /api/orders) 
      to create a Razorpay order via the Server SDK.
      ===================================================================
    */

    // Razorpay Checkout Options
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "YOUR_TEST_KEY", // Replace with your key
      amount: "149900", // Amount in subunits (e.g., 149900 paise = ₹1499)
      currency: "INR",
      name: "Erthad",
      description: `Premium NFC Smart Card`,
      image: "/logo.png", // Add your logo path here
      handler: function (response: any) {
        // Here you would verify the payment signature on your backend
        setCheckoutState("success");
      },
      prefill: {
        name: details.fullName,
        email: details.email,
        contact: details.phone,
      },
      theme: {
        color: "#9d4edd", // EternoCloud Neon Purple
      },
      modal: {
        ondismiss: function () {
          setCheckoutState("idle");
        },
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function () {
      alert("Payment failed. Please try again.");
      setCheckoutState("idle");
    });
  };

  // --------------------------------------------------------
  // SUCCESS STATE (Order Placed)
  // --------------------------------------------------------
  if (checkoutState === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center w-full min-h-[60vh] text-center px-4"
      >
        <div className="w-24 h-24 bg-neon-cyan/10 text-neon-cyan rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(76,201,240,0.3)]">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Order Successfully Placed</h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light mb-10 leading-relaxed">
          Your Erthad NFC card is now in production. We will ship it to <span className="text-white font-medium">{details.city}</span> shortly. Receipt sent to <span className="text-white font-medium">{details.email}</span>.
        </p>
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl w-full max-w-lg text-left backdrop-blur-md">
          <h4 className="text-xs uppercase tracking-widest text-neon-cyan font-bold mb-4">Shipping To:</h4>
          <p className="text-base text-gray-300 leading-loose">
            {details.fullName}<br/>
            {details.address}<br/>
            {details.city}, {details.state} {details.zipCode}
          </p>
        </div>
      </motion.div>
    );
  }

  // --------------------------------------------------------
  // CHECKOUT FORM STATE (Edge-to-Edge)
  // --------------------------------------------------------
  return (
    <div className="w-full max-w-[1600px] mx-auto py-8 lg:py-16 px-0 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-32 justify-between"
      >
        {/* Left Side: Form Section */}
        <div className="flex-1 w-full space-y-12 lg:max-w-3xl">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase">Shipping Details</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-neon-purple to-neon-cyan mt-4 rounded-full" />
          </div>

          <div className="space-y-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-neon-cyan opacity-80">Contact Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <input type="text" name="fullName" value={details.fullName} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="Full Name *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-purple focus:border-neon-purple outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
                <div>
                  <input type="email" name="email" value={details.email} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="Email Address *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-purple focus:border-neon-purple outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
                <div>
                  <input type="tel" name="phone" value={details.phone} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="Phone Number *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-purple focus:border-neon-purple outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
              </div>
            </div>

            {/* Address Info */}
            <div className="space-y-6 pt-6 border-t border-white/5">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-neon-cyan opacity-80">Delivery Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <input type="text" name="address" value={details.address} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="Street Address *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
                <div>
                  <input type="text" name="city" value={details.city} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="City *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
                <div>
                  <input type="text" name="state" value={details.state} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="State/Province *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
                <div className="md:col-span-2">
                  <input type="text" name="zipCode" value={details.zipCode} onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })} placeholder="ZIP / Postal Code *" className="w-full px-5 py-4 bg-[#040308]/80 border border-white/10 rounded-2xl focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none text-white font-medium transition-all text-base backdrop-blur-md" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary (No borders, seamlessly integrated) */}
        <div className="w-full lg:w-[450px] xl:w-[500px] flex flex-col">
          <div className="flex-1 flex flex-col sticky top-32">
            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide">Order Summary</h3>
            
            <div className="space-y-6 flex-1 bg-transparent">
              <div className="flex justify-between items-center text-lg border-b border-white/5 pb-4">
                <span className="text-gray-400 font-light">Erthad Premium NFC Card</span>
                <span className="text-white font-medium">₹1,499</span>
              </div>
              <div className="flex justify-between items-center text-lg border-b border-white/5 pb-4">
                <span className="text-gray-400 font-light">Shipping</span>
                <span className="text-green-400 font-bold uppercase text-sm tracking-wider">Free Express</span>
              </div>
              
              <div className="pt-6 mt-4 flex justify-between items-center">
                <span className="text-gray-300 font-bold text-xl uppercase tracking-widest">Total</span>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">₹1,499</span>
              </div>
            </div>

            {/* Checkout Button */}
            <motion.button 
              onClick={handleCheckout}
              disabled={checkoutState === "processing"}
              whileHover={checkoutState === "idle" ? { scale: 1.03, boxShadow: "0 15px 40px -10px rgba(157,78,221,0.7)" } : {}}
              whileTap={checkoutState === "idle" ? { scale: 0.98 } : {}}
              className={`mt-12 w-full py-6 rounded-2xl font-black uppercase tracking-widest text-base flex items-center justify-center gap-3 transition-all ${
                checkoutState === "processing" ? "bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed" : "bg-neon-purple text-white shadow-[0_0_30px_rgba(157,78,221,0.5)] hover:bg-[#8536c4]"
              }`}
            >
              {checkoutState === "processing" ? (
                <span className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Connecting Securely...
                </span>
              ) : (
                <>
                  Pay Securely
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </>
              )}
            </motion.button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-widest font-bold">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              Verified by Razorpay • 256-bit Encryption
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}