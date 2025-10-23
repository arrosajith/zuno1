import { NavLink } from "react-router-dom";
import "../styles/footer.css";

function AppleIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.57,14.86a6.8,6.8,0,0,0-1.85-4.68,6.9,6.9,0,0,0-4.69-1.85,6.87,6.87,0,0,0-4.7,1.85,6.8,6.8,0,0,0-1.85,4.68,6.88,6.88,0,0,0,1.85,4.7,6.9,6.9,0,0,0,4.69,1.85,6.87,6.87,0,0,0,4.7-1.85,6.8,6.8,0,0,0,1.85-4.7ZM12,21.7A9.7,9.7,0,0,1,2.3,12,9.7,9.7,0,0,1,12,2.3,9.7,9.7,0,0,1,21.7,12,9.7,9.7,0,0,1,12,21.7Z" />
      <path d="M15.3,9.41a2.25,2.25,0,0,0-2.31,2.24,2.36,2.36,0,0,0,.08.62,1.4,1.4,0,0,1-1.1,1.38,1.34,1.34,0,0,1-1.46-1.1.72.72,0,0,0-.71-.56,1,1,0,0,0-.77.29,2.84,2.84,0,0,0-1,2.2,5.2,5.2,0,0,0,3.17,4.88,2.1,2.1,0,0,0,2.51-2.06,2.2,2.2,0,0,0-1.25-2,1.2,1.2,0,0,1,1-1.35,1.29,1.29,0,0,1,1.35,1.1,1.13,1.13,0,0,0,1.12.9,1,1,0,0,0,1.08-1.12A3.21,3.21,0,0,0,15.3,9.41Z" />
    </svg>
  );
}
function GooglePlayIcon() {
  return (
    <svg className="ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.5,12a.5.5,0,0,0-.5-.5H3a.5.5,0,0,0,0,1H21A.5.5,0,0,0,21.5,12Z" />
      <path d="M21.92,11.6l-3.3-3.3a.5.5,0,0,0-.71,0l-3.3,3.3a.5.5,0,0,0,.35.85H17.5v6.15a.5.5,0,0,0,.5.5h1a.5.5,0,0,0,.5-.5V12.45h2.58a.5.5,0,0,0,.35-.85Z" />
      <path d="M2.08,12.4,5.38,15.7a.5.5,0,0,0,.71,0L9.39,12.4a.5.5,0,0,0-.35-.85H6.5V5.4a.5.5,0,0,0-.5-.5H5a.5.5,0,0,0-.5.5v6.15H2.42a.5.5,0,0,0-.34.85Z" />
    </svg>
  );
}
function InstagramIcon(){return(<svg className="soc" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>)}
function FacebookIcon(){return(<svg className="soc" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>)}
function XIcon(){return(<svg className="soc" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.617l-5.21-6.817-6.022 6.817H1.97l7.732-8.806L1.358 2.807h6.78l4.773 6.231 5.74-6.231z"/></svg>)}
function TikTokIcon(){return(<svg className="soc" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.38 1.92-3.54 2.96-5.85 2.86-2.3-.1-4.44-1.14-5.82-3.02-1.38-1.88-1.95-4.25-1.72-6.61.23-2.36 1.32-4.5 3.02-5.82 1.7-1.32 3.84-1.99 6.02-1.72.02 1.58.02 3.16.01 4.74-.01 1.02-.38 2.03-.95 2.84-.57.81-1.34 1.44-2.26 1.77-1.38.48-2.93.2-4.1-.62-.26-.18-.48-.4-.68-.63-.01-1.02.01-2.04.01-3.06.01-2.2-.08-4.4-.02-6.6.09-1.6.81-3.15 2.01-4.15 1.2-1 2.78-1.49 4.31-1.49z"/></svg>)}
function PinterestIcon(){return(<svg className="soc" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.086 3.163 9.424 7.604 11.128-.105-.946-.2-2.398.041-3.43.217-.934 1.399-5.957 1.399-5.957s-.357-.714-.357-1.77c0-1.659.962-2.9 2.159-2.9 1.02 0 1.512.765 1.512 1.681 0 1.023-.651 2.552-.988 3.971-.28 1.181.592 2.142 1.754 2.142 2.105 0 3.721-2.222 3.721-5.426 0-2.833-2.036-4.812-4.944-4.812-3.368 0-5.353 2.521-5.353 5.127 0 1.016.391 2.106.88 2.699a.354.354 0 01.082.341c-.09.377-.292 1.2-.334 1.367-.05.2-.163.243-.377.147-1.406-.653-2.288-2.7-2.288-4.347 0-3.538 2.572-6.792 7.416-6.792 3.894 0 6.92 2.774 6.92 6.482 0 3.868-2.439 6.984-5.827 6.984-1.138 0-2.208-.591-2.572-1.289l-.698 2.66c-.252.968-.934 2.18-1.392 2.919.999.309 2.055.476 3.156.476 6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>)}

export default function Footer() {
  const paymentMethods = ["VISA", "MasterCard", "American Express", "Discover", "PayPal", "Apple Pay", "Google Pay"];

  return (
    <footer className="ft">
      <div className="ft__wrap">
        {/* 5 columns */}
        <div className="ft__cols">
          <div className="ft__col">
            <h3>Company Info</h3>
            <ul>
              <li><NavLink to="/about">About ZUNO</NavLink></li>
              <li><a href="#">Affiliate &amp; Influencer</a></li>
              <li><NavLink to="/contact">Contact us</NavLink></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="ft__col">
            <h3>Customer Service</h3>
            <ul>
              <li><a href="#">Return &amp; refund policy</a></li>
              <li><a href="#">Intellectual property policy</a></li>
              <li><a href="#">Shipping info</a></li>
              <li><a href="#">Report suspicious activity</a></li>
            </ul>
          </div>

          <div className="ft__col">
            <h3>Help</h3>
            <ul>
              <li><a href="#">Support center &amp; FAQ</a></li>
              <li><a href="#">Safety center</a></li>
              <li><a href="#">ZUNO purchase protection</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>

          {/* App + Social (2 columns wide on large) */}
          <div className="ft__col ft__col--wide">
            <div className="ft__split">
              <div>
                <h3>Download the ZUNO App</h3>
                <div className="ft__storebtns">
                  <a href="#" className="store">
                    <AppleIcon />
                    <div>
                      <div className="s-sub">Download on the</div>
                      <div className="s-main">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="store">
                    <GooglePlayIcon />
                    <div>
                      <div className="s-sub">GET IT ON</div>
                      <div className="s-main">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3>Connect with ZUNO</h3>
                <div className="ft__social">
                  <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                  <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                  <a href="#" aria-label="X"><XIcon /></a>
                  <a href="#" aria-label="TikTok"><TikTokIcon /></a>
                  <a href="#" aria-label="Pinterest"><PinterestIcon /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & security */}
        <div className="ft__accept">
          <h4>We accept</h4>
          <div className="ft__chips">
            {paymentMethods.map((m) => (
              <span key={m} className="chip">{m}</span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ft__bottom">
          <p>© {new Date().getFullYear()} ZUNO. All rights reserved.</p>
          <div className="ft__links">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Ad Choices</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
