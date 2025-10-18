"use client";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="wow fadeInUp dark:bg-gray-dark relative z-10 bg-white pt-16 md:pt-20 lg:pt-24"
      data-wow-delay=".1s"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-5/12">
            <div className="mb-12 max-w-[360px] lg:mb-16">
              <Link href="/" className="mb-6 inline-block">
                <Image
                  src="/images/logo/com-logo.svg"
                  alt="Glamour Logo"
                  width={0}
                  height={0}
                  className="h-10 w-auto mt-0.5 rounded-[23px]"
                />
              </Link>
              <p className="dark:text-body-color-dark mb-9 text-base leading-relaxed text-body-color">
                Discover our collection of handcrafted flower arrangements for every occasion.
              </p>
              <div className="flex items-center space-x-5">
                <a
                  href="https://facebook.com"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary text-xl transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary text-xl transition"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://www.instagram.com/monaaf_glamour.co/#"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary text-xl transition"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-color dark:text-body-color-dark hover:text-primary dark:hover:text-primary text-xl transition"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Useful Links
              </h2>
              <ul>
                <li>
                  <Link
                    href="/blogs"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-2/12 xl:w-2/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Terms
              </h2>
              <ul>
                <li>
                  <Link
                    href="/tos"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="mb-12 lg:mb-16">
              <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
                Support & Help
              </h2>
              <ul>
                <li>
                  <Link
                    href="/contact"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="dark:text-body-color-dark mb-4 inline-block text-base text-body-color duration-300 hover:text-primary dark:hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
        <div className="py-8">
          <p className="text-center text-base text-body-color dark:text-white">
            © 2025 Glamour. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

