import React from "react";
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Linkedin as LinkedinIcon,
  Instagram as InstagramIcon,
} from "lucide-react";

const Footer = () => {
  // Social media links for easy management
  const socialLinks = [
    {
      Icon: TwitterIcon,
      href: "#",
      label: "Twitter",
    },
    {
      Icon: FacebookIcon,
      href: "#",
      label: "Facebook",
    },
    {
      Icon: LinkedinIcon,
      href: "#",
      label: "LinkedIn",
    },
    {
      Icon: InstagramIcon,
      href: "#",
      label: "Instagram",
    },
  ];

  // Footer link sections for DRY code
  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#" },
        { label: "Start a Campaign", href: "#" },
        { label: "Explore Causes", href: "#" },
        { label: "Help Center", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Live Chat", href: "#" },
        { label: "Support Ticket", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Data Protection", href: "#" },
      ],
    },
  ];

  return (
    <footer className='bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300'>
      <div className='container mx-auto px-4 grid md:grid-cols-4 gap-8'>
        {/* Company Description */}
        <div>
          <h3 className='text-2xl font-bold mb-4 text-indigo-400 dark:text-indigo-500'>
            FundRaiseHub
          </h3>
          <p className='text-gray-400 dark:text-gray-500 text-sm'>
            Empowering change through technology, connecting passionate creators
            with global supporters.
          </p>

          {/* Social Media Links */}
          <div className='flex space-x-4 mt-6'>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className='text-gray-400 dark:text-gray-600 hover:text-white dark:hover:text-indigo-400 transition-colors'
                aria-label={social.label}
              >
                <social.Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Dynamic Footer Sections */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h4 className='font-semibold mb-4 text-indigo-300 dark:text-indigo-400'>
              {section.title}
            </h4>
            <ul className='space-y-2'>
              {section.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className='text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-indigo-300 transition-colors'
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright Notice */}
      <div className='container mx-auto px-4 mt-8 pt-4 border-t border-gray-800 dark:border-gray-800/50 text-center text-gray-500 dark:text-gray-600'>
        © {new Date().getFullYear()} FundRaiseHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
