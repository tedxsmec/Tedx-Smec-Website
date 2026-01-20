// frontend/src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Events", path: "/events" },
    { label: "Speakers", path: "/speakers" },
  ];

  const moreLinks = [
    { label: "Gallery", path: "/gallery" },
    { label: "Team", path: "/team" },
    { label: "Contact", path: "/contact" },
  ];

  const socials = [
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61584843001664" },
    { Icon: Instagram, href: "https://www.instagram.com/tedx.smec" },
    { Icon: Twitter, href: "https://x.com/TSmec82752" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/tedxsmec" },
  ];

  return (
    <footer className="bg-black border-t border-red-600/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* BRAND */}
          <div>
            <Link to="/" className="flex flex-col group select-none mb-4">
              <div className="flex items-baseline leading-none">
                <div>
                  <span className="text-[#E62B1E] font-black text-3xl md:text-3xl tracking-tighter">TED </span>
                </div>
                <span className="text-[#E62B1E] font-bold text-2xl md:text-2xl relative -top-2 mx-[1px]">x</span>
                <span className="text-white font-black text-3xl md:text-3xl tracking-tight ml-1">SMEC</span>
              </div>
              <div className="text-white/60 text-[9px] font-medium tracking-wide mt-1">
                <span className="text-[#E62B1E] font-bold">x</span> = independently organized TED event
              </div>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              A platform for ideas worth spreading. Join us in exploring
              innovation and creativity.
            </p>

            <div className="flex gap-3">
              {socials.map((s, idx) => {
                const Icon = s.Icon;
                return (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-900 hover:bg-red-600 border border-red-600/20 rounded-lg p-2 transition-all duration-300 hover:scale-110"
                  >
                    <Icon size={18} className="text-gray-400 hover:text-white" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* MORE */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">More</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400">
                <MapPin size={18} className="text-red-600 mt-1" />
                <span className="text-sm">
                  St. Martin's Engineering College
                  <br />
                  Dhulapally, Secunderabad
                  <br />
                  Telangana 500100
                </span>
              </li>

              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={18} className="text-red-600" />
                <a
                  href="tel:+911234567890"
                  className="text-sm hover:text-red-600"
                >
                  +91 87907 64265
                </a>
              </li>

              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={18} className="text-red-600" />
                <a
                  href="mailto:tedxsmec@gmail.com"
                  className="text-sm hover:text-red-600"
                >
                  tedxsmec@gmail.com

                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-red-600/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} TEDxSMEC. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-600" /> in INDIA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
