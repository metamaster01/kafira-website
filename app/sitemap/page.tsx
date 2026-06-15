// app/sitemap/page.tsx

import Link from "next/link";

export default function SitemapPage() {
  const links = [
    { title: "Home", href: "/" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Payments", href: "/payments" },

    { title: "India Destinations", href: "/destinations/india" },
    { title: "International Destinations", href: "/destinations/international" },

    { title: "Group Tours", href: "/group-tour" },
    { title: "Weekend Getaways", href: "/weekend-getaways" },

    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Terms of Use", href: "/terms-of-use" },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8faf9",
        padding: "120px 20px 80px",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#0f2720",
            marginBottom: "12px",
          }}
        >
          Sitemap
        </h1>

        <p
          style={{
            color: "#5f6d68",
            fontSize: "1rem",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          Explore all major pages of our website from one place.
        </p>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "16px",
            }}
          >
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    color: "#0f2720",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    display: "block",
                    padding: "14px 18px",
                    borderRadius: "12px",
                    background: "#f4f8f6",
                    transition: "all 0.3s ease",
                  }}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}