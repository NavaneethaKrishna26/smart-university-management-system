import React from "react";

function AboutPage() {
  return (
    <div className="page">
      <div className="hero hero-compact">
        <div>
          <h1>About Smart University</h1>
          <p className="hero-subtitle">
            Transforming education through technology-driven workflows and
            intelligent automation.
          </p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Real-time Attendance</h3>
          <p>
            Faculty mark attendance with one click. Students see their records
            instantly with detailed analytics.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>AI Assignment Grading</h3>
          <p>
            Instant feedback on content quality, grammar, and originality.
            Comprehensive scores and improvement suggestions.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile First Design</h3>
          <p>
            Perfectly responsive on phones, tablets, and desktops. Progressive
            Web App ready for offline use.
          </p>
        </div>
      </div>

      <section className="section">
        <h2>About Us</h2>
        <p className="mission-text">
          Vel Tech was established in 1997 by the Founder President & Chancellor
          Col.Prof.Vel.Dr.R.Rangarajan and Foundress President Dr.Sagunthala
          Rangarajan with the vision of creating model citizens who would
          contribute professionally and socially to the Nation. Vel Tech
          provides good opportunities to the students of all strata of the
          society with high quality education. Well-equipped infrastructure,
          competent faculty and a range of co-curricular & extracurricular
          activities at Vel Tech ensure a holistic development of students. Our
          University offers 21 Under Graduate(UG) & 17 Post Graduate(PG) degree
          programs and Ph.D. in Engineering & Technology, Management Studies,
          Arts & Science and Law with around 14,000 students, 753 Ph.D. scholars
          and 805 dedicated faculty. Every student is given the opportunity to
          study courses offered by Industry experts and renowned professors from
          international universities. Every year 15% of our graduands are
          getting admissions in foreign Universities to pursue their higher
          studies and all other eligible students are provided with placements
          opportunities in the reputed core and IT industries. Many of our
          graduands completed their internship in the reputed industries and
          research organizations in India and abroad. The institution has been
          accredited by NAAC with ‘A++’ grade in the Second Cycle and a CGPA of
          3.53 out of 4.00 for a period of 5 years from February 2023. Vel Tech
          has been recognized as Category-1 Deemed to be University by the
          University Grants Commission (UGC) and also received the status of 12B
          from UGC which provides the opportunity to receive more research
          grants. Six undergraduate engineering programs and one PG programme
          have been accredited by the National Board of Accreditation (NBA)
          under the Tier-I category. In the NIRF (National Institutional Ranking
          Frame work) India Rankings 2024, Vel Tech secured 86th rank in the
          Engineering Category and 96th in the University Category. Vel Tech is
          also ranked in the band 11-50 under the Innovation category and in the
          top 100 in a row of 8 years since 2017 under engineering category. In
          addition, the institution is also ranked in the Times Higher Education
          (THE) world university rankings and QS Asia university rankings.
          Global Alliances of Vel Tech has International relations with more
          than 600 Institutions across 42 countries and has entered in the
          Memorandum of Understanding (MoU) with more than 196 Institutions. Vel
          Tech Technology Business Incubator was established in the year 2010 to
          promote innovation and entrepreneurship. Vel Tech TBI has supported
          340 startups so far and has provided seed funds of Rs.18.81 Cr to 171
          entrepreneurs. Vel Tech TBI was recognised as one of the five Centres
          of Excellence under NIDHI Centre of Excellence scheme by the
          Department of Science and Technology. NIDHI PRAYAS scheme supported 67
          innovators with a grant of up to Rs.10 Lakh each to develop their
          innovative ideas into products. It has been recently recognised by
          startup India Seed Fund worth Rs. 9.8 Crore to support early-stage
          startups. Vel Tech has got a proactive research ambience and was
          granted 100 R&D projects worth Rs. 70 Crore from DST, DBT, DAE and
          DRDO and collaborative funding like Indo-Korea, Indo-France,
          Indo-Canada and Indo-Taiwan. Vel Tech University was awarded “ISTE
          National Award for Best Technical University for 2023” in the 53rd
          ISTE national annual convention held at Bhubaneswar, in recognition of
          encouraging Technical Universities to enhance the performance and to
          serve the community and stakeholders by improving the quality and
          maintaining standards of the programs offered. Vel Tech places a
          strong emphasis on extra-curricular and co-curricular activities with
          more than 30 Technical clubs, Dance club, Music club , Arts & Drama
          Clubs and two units of the NSS, NCC Air Wing, NCC Naval Wing, and NCC
          Army Wing (Girls).
        </p>
        <div className="cta-section">
          <h3>Ready to experience the future of education?</h3>
          <div className="cta-buttons">
            <a href="/login?role=STUDENT" className="btn btn-primary">
              Student Portal
            </a>
            <a href="/login?role=FACULTY" className="btn btn-outline">
              Faculty Portal
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
