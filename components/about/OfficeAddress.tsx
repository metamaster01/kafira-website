"use client";

export default function OfficeLocations() {
  const offices = [
    {
      label: "Office 1",
      city: "Panipat, Haryana",
      address: "Shanti Nagar, Model Town, Panipat, Haryana 132103",
    },
    {
      label: "Office 2",
      city: "Gurugram, Haryana",
      address: "Vatika City, Sector 49, Gurugram, Haryana 122018",
    },
  ];

  return (
    <section className="office-section">
      <div className="container">
        <div className="heading">
          <span className="sub-title">OUR LOCATIONS</span>
          <h2>Where We Call <span></span></h2>
          <p>
            From creative brainstorming to cinematic execution, our spaces are
            where ideas evolve into unforgettable visual experiences.
          </p>
        </div>

        <div className="office-grid">
          {offices.map((office, index) => (
            <div key={index} className="office-card">
              <div className="location-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2e8b7d"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <span className="office-label">{office.label}</span>
              <h3>{office.city}</h3>
              <p>{office.address}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .office-section {
          background: #ffffff;
          padding: 110px 20px;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
        }

        .heading {
          text-align: center;
          margin-bottom: 70px;
        }

        .sub-title {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          color: #2e8b7d;
          margin-bottom: 16px;
        }

        .heading h2 {
          font-size: clamp(2.4rem, 5vw, 4.2rem);
          font-weight: 800;
          color: #0f2720;
          line-height: 1.1;
          margin-bottom: 18px;
          letter-spacing: -0.04em;
        }

        .heading p {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.05rem;
          line-height: 1.8;
          color: #5c6764;
        }

        .office-grid {
          display: flex;
          justify-content: center;
          gap: 32px;
          flex-wrap: wrap;
        }

        .office-card {
          width: 100%;
          max-width: 430px;
          min-height: 240px;
          background: linear-gradient(
            180deg,
            #ffffff 0%,
            #f7fcfb 100%
          );
          border: 1px solid rgba(46, 139, 125, 0.15);
          border-radius: 28px;
          padding: 38px;
          text-align: left;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .office-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #2e8b7d;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .office-card:hover {
          transform: translateY(-8px);
          border-color: rgba(46, 139, 125, 0.35);
          box-shadow: 0 20px 45px rgba(46, 139, 125, 0.12);
        }

        .office-card:hover::before {
          transform: scaleX(1);
        }

        .location-icon {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(46, 139, 125, 0.08);
          border: 1px solid rgba(46, 139, 125, 0.15);
          border-radius: 18px;
          margin-bottom: 24px;
        }

        .office-card h3 {
          font-size: 1.45rem;
          font-weight: 700;
          color: #0f2720;
          margin-bottom: 14px;
          letter-spacing: -0.02em;
        }

        .office-label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #2e8b7d;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 12px;
        }

        .office-card p {
          color: #5c6764;
          font-size: 1rem;
          line-height: 1.9;
          margin: 0;
        }

        @media (max-width: 768px) {
          .office-section {
            padding: 80px 20px;
          }

          .heading {
            margin-bottom: 50px;
          }

          .office-card {
            max-width: 100%;
            min-height: auto;
            padding: 30px;
          }

          .location-icon {
            width: 60px;
            height: 60px;
          }

          .office-card h3 {
            font-size: 1.25rem;
          }

          .heading p {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </section>
  );
}