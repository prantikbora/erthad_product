import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-black overflow-hidden">
      {/* Background Glow to match Hero/Header */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#00ffcc]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12 py-16">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white italic uppercase">
              Erthad.
            </Link>
            <p className="mt-6 max-w-sm text-sm font-medium leading-relaxed text-gray-400">
              Precision-crafted NFC business cards for the modern professional. 
              One tap. Infinite connections. Zero friction.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ffcc]">
              Product
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li>
                <Link href="/checkout" className="transition-colors hover:text-white">Design Your Card</Link>
              </li>
              <li>
                <Link href="#features" className="transition-colors hover:text-white">Features</Link>
              </li>
              <li>
                <Link href="#how-it-works" className="transition-colors hover:text-white">How it Works</Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00ffcc]">
              Support
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li>
                <Link href="mailto:support@erthad.com" className="transition-colors hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-10 sm:flex-row">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            © {new Date().getFullYear()} Erthad India Pvt Ltd. All rights reserved.
          </p>
          
          <div className="mt-6 flex items-center gap-8 sm:mt-0">
            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-600">Made in Assam</span>
            <Link 
              href="/admin/login" 
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 transition-colors hover:text-white"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}