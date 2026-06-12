// import BlogsPage from "./blogpage";

// import CallToAction from "@/components/calltoaction";

// export const metadata = {
//   title: "Digital Marketing Blog for Startups in India | Meta Master",
//   description: "Read expert blogs on digital marketing, Meta ads, SEO, and startup growth strategies by Meta Master.",
//   keywords: ["Meta Master Blog", "Digital Marketing Insights", "Startup Growth", "Branding Strategies", "Online Presence", "Marketing Tips", "India Startups","Instargam Growth and Stratergies","SEO tips for startups","Meta Ads best practices"],
// };

// export default function Home() {
//   return (
//     <>

//        <Navbar/>
//       <BlogsPage/>
//          <CallToAction/>
//        <Footer/>
//       </>
//   );
// }

// app/blogs/page.tsx
// Replaces your static blogs page — now fully dynamic from Supabase

import type { Metadata } from "next";
import { getPublishedBlogs } from "@/lib/blogs";
import BlogsClient from "./BlogsClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Blogs | Kafira Travels — Insights on Travel, Culture, and Adventure",
  description:
    "Explore our latest blogs on travel tips, cultural insights, and adventure stories from Kafira Travels.",
};

// Revalidate every 60 seconds (ISR) — new blogs appear without full redeploy
export const revalidate = 60;

export default async function BlogsPage() {
  const { featured, blogs } = await getPublishedBlogs();

  return (
    <div>
      <Navbar />
      <BlogsClient featured={featured} blogs={blogs} />
      <CTABanner />
      <Footer />
    </div>
  );
}
