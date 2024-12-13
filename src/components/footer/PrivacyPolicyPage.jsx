import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-br 
        from-blue-50 via-indigo-50 to-purple-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
    >
      <Navbar />
      <div className='container mx-auto px-4 py-16 md:py-24 max-w-4xl'>
        <h1
          className='text-3xl md:text-4xl font-bold mb-8 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-indigo-600 to-purple-600 
          dark:from-indigo-400 dark:to-purple-400'
        >
          Privacy Policy
        </h1>

        <div
          className='prose prose-sm sm:prose-base 
          dark:prose-invert 
          prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-li:text-gray-800 dark:prose-li:text-gray-300'
        >
          {[
            {
              title: "1. Information We Collect",
              content:
                "We collect information you provide directly to us, including:",
              items: [
                "Personal identification information (Name, email address, phone number)",
                "Financial information for donations and transactions",
                "Campaign and fundraising related details",
                "Communication and support interactions",
              ],
            },
            {
              title: "2. How We Use Your Information",
              content: "We use collected information to:",
              items: [
                "Process donations and financial transactions",
                "Communicate about campaigns and platform updates",
                "Provide customer support",
                "Improve our platform and services",
                "Comply with legal and regulatory requirements",
              ],
            },
            {
              title: "3. Data Protection",
              content:
                "We implement comprehensive security measures to protect your data:",
              items: [
                "Encryption of sensitive personal and financial information",
                "Secure server infrastructure",
                "Regular security audits and vulnerability assessments",
                "Restricted access to personal information",
              ],
            },
            {
              title: "4. Data Sharing",
              content:
                "We do not sell or rent your personal information. We may share data with:",
              items: [
                "Service providers necessary for platform operations",
                "Legal authorities when required by law",
                "With your explicit consent for specific purposes",
              ],
            },
            {
              title: "5. Your Rights",
              content: "You have the right to:",
              items: [
                "Access your personal information",
                "Request correction of inaccurate data",
                "Request deletion of your account and data",
                "Opt-out of marketing communications",
                "Lodge a complaint with data protection authorities",
              ],
            },
          ].map((section, index) => (
            <section key={index} className='mb-8'>
              <h2
                className='text-xl md:text-2xl font-semibold mb-4 
                text-gray-900 dark:text-gray-100'
              >
                {section.title}
              </h2>
              <p className='mb-4 text-gray-700 dark:text-gray-300'>
                {section.content}
              </p>
              <ul
                className='list-disc list-outside pl-5 
                marker:text-indigo-600 dark:marker:text-indigo-400'
              >
                {section.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className='mb-2 
                    text-gray-800 dark:text-gray-300'
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section
            className='mt-12 space-y-2 
            text-gray-600 dark:text-gray-400'
          >
            <p className='text-xs sm:text-sm'>Last Updated: December 2024</p>
            <p className='text-xs sm:text-sm'>
              Contact our Data Protection Officer at privacy@fundraisinghub.com
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default PrivacyPolicy;
