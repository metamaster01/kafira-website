

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  useEffect(() => {
  if (!mounted) return;

  const initAnimations = async () => {
    try {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // Scope everything to this footer (prevents cross-page selection issues)
      const ctx = gsap.context(() => {
        gsap.from(".footer-logo", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        });

        gsap.from(".footer-section", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        });

        // ✅ Animate icons per container (mobile + desktop independently)
        const containers = gsap.utils.toArray<HTMLElement>(".social-icons-container");

        containers.forEach((container) => {
          const icons = container.querySelectorAll(".social-icon");

          gsap.from(icons, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)",
            immediateRender: false, // ✅ prevents “stuck hidden” behavior
            scrollTrigger: {
              trigger: container, // ✅ correct trigger for that set of icons
              start: "top 92%",
            },
          });
        });

      }, footerRef);

      // ensure triggers measure correct positions after layout
      ScrollTrigger.refresh();

      return () => ctx.revert();
    } catch (e) {
      console.log("GSAP not available");
    }
  };

  const cleanupPromise = initAnimations();

  return () => {
    // if initAnimations returned cleanup, run it
    if (cleanupPromise && typeof (cleanupPromise as any) === "function") {
      (cleanupPromise as any)();
    }
  };
}, [mounted]);


  if (!mounted) return null;

  return (
    <footer
      ref={footerRef}
      className="relative bg-gradient-to-br from-[#8B2E2E] via-[#7D1F1F] to-[#6B1414] text-white overflow-hidden"
    >
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8 mb-12">
          {/* Logo & Social Media - Centered */}
          <div className="footer-logo flex flex-col items-center text-center">
            <div className="mb-6">
              <Image
                src="/logo-2.png"
                alt="The Bliss Events"
                width={230}
                height={140}
                className="object-contain"
              />
            </div>

            <p className="text-sm text-white/80 mb-4">Social Media</p>
            <div className="social-icons-container flex gap-3 justify-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/blisseventsofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@theblissevents7433"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                {/* <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.350-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg> */}

                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M21.543 7.2c-.2-1.4-1.4-2.5-2.8-2.7C16.9 4 12 4 12 4s-4.9 0-6.7.5c-1.4.2-2.6 1.3-2.8 2.7C2.5 9 2.5 12 2.5 12s0 3 .5 4.8c.2 1.4 1.4 2.5 2.8 2.7 1.8.5 6.7.5 6.7.5s4.9 0 6.7-.5c1.4-.2 2.6-1.3 2.8-2.7.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>  
              </a>
            </div>
          </div>

          {/* Company & Explore - 2 Columns */}
          <div className="grid grid-cols-2 gap-8">
            <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    About us
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Gallery
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#blog"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Blog
                  </a>
                </li> */}
                <li>
                  <a
                    href="/contact"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/services/destination-wedding"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Destination Wedding
                  </a>
                </li>
                <li>
                  <a
                    href="/services/resorts-hotel-booking"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Resorts & Hotel Booking
                  </a>
                </li>
                <li>
                  <a
                    href="/services/event-decoration"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Event Decoration
                  </a>
                </li>
                <li>
                  <a
                    href="/services/photography"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Photography
                  </a>
                </li>
                <li>
                  <a
                    href="/services/sangeet-entertainment"
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-sm"
                  >
                    Sangeet & Entertainment
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info - Centered */}
          <div className="footer-section flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-4">Contact info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 group justify-center">
                <svg
                  className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:Theblissevents1985@gmail.com"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm break-all"
                >
                  Theblissevents1985@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 group justify-center">
                <svg
                  className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+917021927602"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                >
                  +917021927602
                </a>
              </li>
              <li className="flex items-center gap-2 group justify-center">
                <svg
                  className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white/80 text-sm">Nagpur, MH</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-4 gap-12 mb-12">
          {/* Logo & Social Media */}
          <div className="footer-logo">
            <div className="mb-6">
              <Image
                src="/logo-image-2.png"
                alt="The Bliss Events"
                width={200}
                height={120}
                className="object-contain"
              />
            </div>

            <p className="text-sm text-white/80 mb-4">Social Media</p>
            <div className="social-icons-container flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/blisseventsofficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  
                </svg>
              </a>

              <a
                href="https://www.youtube.com/@theblissevents7433"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon w-10 h-10 bg-white/10 hover:bg-white hover:text-[#8B2E2E] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                {/* <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.350-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg> */}

                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M21.543 7.2c-.2-1.4-1.4-2.5-2.8-2.7C16.9 4 12 4 12 4s-4.9 0-6.7.5c-1.4.2-2.6 1.3-2.8 2.7C2.5 9 2.5 12 2.5 12s0 3 .5 4.8c.2 1.4 1.4 2.5 2.8 2.7 1.8.5 6.7.5 6.7.5s4.9 0 6.7-.5c1.4-.2 2.6-1.3 2.8-2.7.5-1.8.5-4.8.5-4.8s0-3-.5-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>  
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Gallery
                </a>
              </li>
              {/* <li>
                <a
                  href="#blog"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Blog
                </a>
              </li> */}
              <li>
                <a
                  href="/contact"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/services/destination-wedding"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Destination Wedding
                </a>
              </li>
              <li>
                <a
                  href="/services/resorts-hotel-booking"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Resorts & Hotel Booking
                </a>
              </li>
              <li>
                <a
                  href="/services/event-decoration"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Event decoration
                </a>
              </li>
              <li>
                <a
                  href="/services/photography"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Photography
                </a>
              </li>
              <li>
                <a
                  href="/services/sangeet-entertainment"
                  className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                >
                  Sangeet & Entertainment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Contact info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 group">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:Theblissevents1985@gmail.com"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm break-all"
                >
                  Theblissevents1985@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 group">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:+917021927602"
                  className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
                >
                  +917021927602
                </a>
              </li>

              <li className="flex items-start gap-2 group">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white/80 text-sm">Nagpur, MH</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-xs text-center md:text-left">
              <a href="https://metamaster.in">Metamaster</a> © 2025. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-xs">
              <a
                href="/terms"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Terms & Condition
              </a>
              <a
                href="/privacy"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              {/* <a
                href="#cookies"
                className="text-white/70 hover:text-white transition-colors duration-300"
              >
                Cookies
              </a> */}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative line (optional, matches your style) */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
      </div>
    </footer>
  );
};

export default FooterSection;
