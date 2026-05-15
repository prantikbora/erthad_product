import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 bg-[#020106]/80 backdrop-blur-2xl overflow-hidden mt-auto">
      {/* Background Glow to match EternoCloud Void Aesthetic */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[1600px] px-6 lg:px-12 xl:px-20 py-16 z-10">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 inline-flex">
              {/* Subtle EternoCloud-style logo mark matching the Header */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan shadow-[0_0_10px_rgba(157,78,221,0.5)]" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Erthad<span className="text-neon-cyan">.</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-gray-400">
              Precision-crafted NFC business cards for the modern professional.
              One tap. Infinite connections. Zero friction.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-cyan opacity-80">
              Product
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li>
                <Link
                  href="/checkout"
                  className="transition-colors hover:text-white"
                >
                  Order Now
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  className="transition-colors hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  className="transition-colors hover:text-white"
                >
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal Links */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-purple opacity-80">
              Support
            </h3>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li>
                <Link
                  href="mailto:support@erthad.com"
                  className="transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                {/* <Link
                  href="/privacy"
                  className="transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link> */}
                <span className="cursor-default">Privacy Policy</span>
              </li>
              <li>
                {/* <Link
                  href="/terms"
                  className="transition-colors hover:text-white"
                >
                  Terms of Service
                </Link> */}
                <span className="cursor-default">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-10 sm:flex-row">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            © {new Date().getFullYear()} Erthad India Pvt Ltd. All rights
            reserved.
          </p>

          <div className="mt-6 flex items-center gap-8 sm:mt-0">
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