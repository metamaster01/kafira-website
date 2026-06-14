"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── REQUIRED IMAGES ─────────────────────────────────────────────────────────
// /public/images/team/sarah-mitchell.jpg   400×400px, soft neutral background
// /public/images/team/daniel-carter.jpg
// /public/images/team/emma-rodriguez.jpg
// /public/images/team/olivia-thompson.jpg
// /public/images/team/james-wilson.jpg
// /public/images/team/michael-anderson.jpg
// ─────────────────────────────────────────────────────────────────────────────

// ── Inline SVG icons ──────────────────────────────────────────────────────────
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: { linkedin: string; instagram: string };
}

// ── Data ──────────────────────────────────────────────────────────────────────
const team: TeamMember[] = [
  {
    name: "Neeranjan (Vicky Gupta)",
    role: "Founder & CEO",
    bio: "Neeranjan founded Kafira with a vision to create meaningful travel experiences that go beyond traditional tourism. His passion for exploration and commitment to customer satisfaction continue to shape the company's journey.",
    image: "/images/team/sarah-mitchell.jpg",
    social: { linkedin: "https://linkedin.com/in/sarah-mitchell", instagram: "https://instagram.com/sarah.mitchell" },
  },
  // {
  //   name: "Daniel Carter",
  //   role: "Head of Travel Operations",
  //   bio: "Daniel ensures every trip runs smoothly from start to finish. With years of experience in travel management, he specializes in creating seamless and memorable travel experiences.",
  //   image: "/images/team/daniel-carter.jpg",
  //   social: { linkedin: "https://linkedin.com/in/daniel-carter", instagram: "https://instagram.com/daniel.carter" },
  // },
  // {
  //   name: "Emma Rodriguez",
  //   role: "Lead Experience Designer",
  //   bio: "Emma curates unique itineraries that blend adventure, culture, and comfort. Her creative approach helps travelers discover destinations in authentic and exciting ways.",
  //   image: "/images/team/emma-rodriguez.jpg",
  //   social: { linkedin: "https://linkedin.com/in/emma-rodriguez", instagram: "https://instagram.com/emma.rodriguez" },
  // },
  // {
  //   name: "Olivia Thompson",
  //   role: "Partnership & Destination Specialist",
  //   bio: "Olivia works closely with local partners and hospitality providers to bring travelers the best experiences while supporting local communities and businesses.",
  //   image: "/images/team/olivia-thompson.jpg",
  //   social: { linkedin: "https://linkedin.com/in/olivia-thompson", instagram: "https://instagram.com/olivia.thompson" },
  // },
  {
    name: "Akanksha",
    role: "Social Media Manager",
    bio: "Akanksha helps build and nurture the Kafira travel community, connecting like-minded travelers through stories, experiences, and shared adventures.",
    image: "/images/team/akanksha.jpg",
    social: { linkedin: "https://linkedin.com/in/akanksha", instagram: "https://instagram.com/akanksha" },
  },
  {
    name: "Shruti",
    role: "Sales Manager",
    bio: "Shruti is dedicated to providing exceptional support before, during, and after every trip. She believes great service is the key to unforgettable travel experiences.",
    image: "/images/team/michael-anderson.jpg",
    social: { linkedin: "https://linkedin.com/in/michael-anderson", instagram: "https://instagram.com/michael.anderson" },
  },
];

// ── Social button ─────────────────────────────────────────────────────────────
function SocialLink({
  href, label, hoverColor, children,
}: {
  href: string; label: string; hoverColor: string; children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/80 border border-gray-200 text-gray-400 shadow-sm transition-colors duration-200 ${hoverColor}`}
    >
      {children}
    </motion.a>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────
function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      // Fixed width card — flex parent will centre them
      style={{ width: "280px" }}
      className="flex flex-col items-center text-center"
    >
      {/* Avatar */}
      <div className="relative mb-5 group">
        <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-[#3a7d6e] transition-all duration-300">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12)] pointer-events-none" />
      </div>

      {/* Name */}
      <h3 className="text-[17px] font-bold text-gray-900 mb-0.5">{member.name}</h3>

      {/* Role */}
      <p className="text-sm  text-gray-500 mb-3">{member.role}</p>

      {/* Social icons */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <SocialLink href={member.social.linkedin} label={`${member.name} on LinkedIn`} hoverColor="hover:text-[#0A66C2] hover:border-[#0A66C2]/40">
          <LinkedInIcon className="w-[15px] h-[15px]" />
        </SocialLink>
        <SocialLink href={member.social.instagram} label={`${member.name} on Instagram`} hoverColor="hover:text-[#E1306C] hover:border-[#E1306C]/40">
          <InstagramIcon className="w-[15px] h-[15px]" />
        </SocialLink>
      </div>

      {/* Bio */}
      <p className="text-[13px] text-gray-600 leading-relaxed">{member.bio}</p>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function MeetTeam() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-60px" });

  // Split into two rows of 3
  const rowOne = team.slice(0, 3);
  const rowTwo = team.slice(3, 6);

  return (
    <section
      style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" , padding: "clamp(48px,7vw,88px) clamp(20px,5vw,48px)" }}
      className="bg-[#f5f0e8]  "
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug"
        >
          Meet Our Team.{" "}
          <span className="font-normal">The ideal set of extraordinary people</span>
        </motion.h2>
      </div>

      {/* ── Row 1 — 3 members ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "3rem 2.5rem",
          marginBottom: "3.5rem",
        }}
      >
        {rowOne.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i} />
        ))}
      </div>

      {/* ── Row 2 — 3 members ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "3rem 2.5rem",
        }}
      >
        {rowTwo.map((member, i) => (
          <TeamCard key={member.name} member={member} index={i + 3} />
        ))}
      </div>
    </section>
  );
}