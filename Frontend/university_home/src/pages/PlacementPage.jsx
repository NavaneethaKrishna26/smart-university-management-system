import React from "react";
import placementBanner from "../assets/chancellor.jpg"; // ✅ import your image

function PlacementPage() {
  const placementData = [
    { name: "Aditi Sharma", company: "Google", year: 2026 },
    { name: "Rahul Verma", company: "Amazon", year: 2026 },
    { name: "Sneha Reddy", company: "Microsoft", year: 2026 },
    { name: "Arjun Kumar", company: "Facebook", year: 2026 },
    { name: "Priya Singh", company: "Apple", year: 2026 },
  ];

  const companyDomains = [
    "google.com",
    "amazon.com",
    "microsoft.com",
    "facebook.com",
    "apple.com",
    "ibm.com",
    "oracle.com",
    "intel.com",
    "uber.com",
    "airbnb.com",
    "adobe.com",
    "salesforce.com",
    "netflix.com",
    "spotify.com",
    "linkedin.com",
    "paypal.com",
    "tesla.com",
    "nvidia.com",
    "dell.com",
    "hp.com",
  ];

  const logoUrls = companyDomains.map((domain) => ({
    name: domain.split(".")[0],
    url: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
  }));

  return (
    <div className="placement-page">
      {/* Top Hero Banner */}
      <div className="placement-hero">
        <img
          src={placementBanner}
          alt="Placement Banner"
          className="placement-hero-img"
        />
        <div className="placement-hero-text">
          <h1>Placement Highlights</h1>
          <p>Celebrating student success with top companies</p>
        </div>
      </div>

      <div className="placement-content">
        {/* Placement Table */}
        <div className="placement-table-section">
          <h2>Students Placed This Year</h2>
          <div className="table-container">
            <table className="placement-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Company</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {placementData.map((stud, idx) => (
                  <tr key={idx}>
                    <td>{stud.name}</td>
                    <td>
                      <span className="company-name">{stud.company}</span>
                    </td>
                    <td>{stud.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scrolling Logos */}
        <div className="company-logos-section">
          <h2>Our Recruiters</h2>
          <div className="marquee">
            <div className="marquee-track">
              {logoUrls.map((logo, idx) => (
                <div className="marquee-item" key={idx}>
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="marquee-logo"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/80x40/3b82f6/ffffff?text=${logo.name.toUpperCase()}`;
                    }}
                  />
                </div>
              ))}
              {logoUrls.map((logo, idx) => (
                <div className="marquee-item" key={`dup${idx}`}>
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="marquee-logo"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/80x40/3b82f6/ffffff?text=${logo.name.toUpperCase()}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacementPage;
