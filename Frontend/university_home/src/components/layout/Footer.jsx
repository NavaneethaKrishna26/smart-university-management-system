import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Smart University. All rights reserved.</div>
      <div className="footer-links">
        <a href="mailto:info@smartuniv.edu">info@smartuniv.edu</a>
        <span>•</span>
        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <span>•</span>
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          X
        </a>
      </div>
    </footer>
  );
}

export default Footer;
